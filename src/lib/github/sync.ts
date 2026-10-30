/**
 * GitHub API synchronization client
 * Real, authenticated reads and writes to GitHub profile repositories via REST API.
 * Never fakes pushes or simulates commits.
 */

export interface RemoteReadmeResult {
  exists: boolean;
  content: string;
  sha: string | null;
  repoExists: boolean;
  error?: string;
}

export interface PushReadmeParams {
  owner: string;
  repo: string;
  token: string;
  content: string;
  existingSha?: string | null;
  message?: string;
  workflows?: Record<string, string>;
  timeoutMs?: number;
}

export interface PushReadmeResult {
  success: boolean;
  commitUrl?: string;
  repoUrl: string;
  error?: string;
  createdWorkflows?: string[];
}

const GITHUB_NAME_REGEX = /^[a-zA-Z0-9_.-]+$/;

/**
 * Validates GitHub owner or repository name against safe characters
 */
export function isValidRepoIdentifier(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= 100 && GITHUB_NAME_REGEX.test(trimmed);
}

/**
 * Strips sensitive tokens and auth credentials from error strings
 */
export function sanitizeErrorMessage(error: string, token?: string): string {
  if (!error || typeof error !== 'string') return 'An unexpected error occurred';
  let sanitized = error;

  if (token && token.trim().length > 4) {
    sanitized = sanitized.replaceAll(token.trim(), '[REDACTED_TOKEN]');
  }

  return sanitized
    .replace(/ghp_[a-zA-Z0-9]{15,}/g, '[REDACTED_TOKEN]')
    .replace(/github_pat_[a-zA-Z0-9_]{15,}/g, '[REDACTED_TOKEN]')
    .replace(/gho_[a-zA-Z0-9]{15,}/g, '[REDACTED_TOKEN]')
    .replace(/Bearer\s+[a-zA-Z0-9_\-.]+/gi, 'Bearer [REDACTED_TOKEN]');
}

/**
 * Encodes string to UTF-8 safe Base64
 */
export function toBase64Utf8(str: string): string {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  return Buffer.from(str, 'utf-8').toString('base64');
}

/**
 * Decodes Base64 to UTF-8 string
 */
export function fromBase64Utf8(base64: string): string {
  const clean = base64.replace(/\n/g, '');
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return decodeURIComponent(escape(window.atob(clean)));
  }
  return Buffer.from(clean, 'base64').toString('utf-8');
}

/**
 * Creates an AbortSignal with timeout if supported
 */
function createTimeoutSignal(timeoutMs = 15000): AbortSignal | undefined {
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(timeoutMs);
  }
  return undefined;
}

/**
 * Fetches the real remote README and SHA from GitHub
 */
export async function fetchRemoteReadme(
  owner: string,
  repo: string,
  token?: string,
  timeoutMs = 15000
): Promise<RemoteReadmeResult> {
  const cleanOwner = owner?.trim();
  const cleanRepo = repo?.trim();

  if (!isValidRepoIdentifier(cleanOwner) || !isValidRepoIdentifier(cleanRepo)) {
    return {
      exists: false,
      content: '',
      sha: null,
      repoExists: false,
      error: 'Invalid repository name or owner format. Please check the spelling.',
    };
  }

  const cleanToken = token?.trim();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (cleanToken) {
    headers.Authorization = `Bearer ${cleanToken}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/README.md`, {
      method: 'GET',
      headers,
      signal: createTimeoutSignal(timeoutMs),
    });

    if (res.status === 200) {
      const data = await res.json();
      const content = fromBase64Utf8(data.content || '');
      return {
        exists: true,
        content,
        sha: data.sha || null,
        repoExists: true,
      };
    }

    // Rate Limit detection (403 or 429)
    const rateLimitRemaining = res.headers?.get?.('x-ratelimit-remaining');
    if (res.status === 429 || (res.status === 403 && rateLimitRemaining === '0')) {
      return {
        exists: false,
        content: '',
        sha: null,
        repoExists: false,
        error: 'GitHub API rate limit exceeded. Please wait a few moments or provide a Personal Access Token.',
      };
    }

    if (res.status === 401) {
      return {
        exists: false,
        content: '',
        sha: null,
        repoExists: false,
        error: 'Authentication failed. Please verify your GitHub Personal Access Token is valid and not expired.',
      };
    }

    if (res.status === 403) {
      return {
        exists: false,
        content: '',
        sha: null,
        repoExists: false,
        error: 'Access denied: The token does not have permission to view this repository.',
      };
    }

    if (res.status === 404) {
      // Check if the repo exists
      const repoRes = await fetch(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}`, {
        method: 'GET',
        headers,
        signal: createTimeoutSignal(timeoutMs),
      });

      if (repoRes.status === 200) {
        return {
          exists: false,
          content: '',
          sha: null,
          repoExists: true,
        };
      }

      return {
        exists: false,
        content: '',
        sha: null,
        repoExists: false,
        error: `Repository ${cleanOwner}/${cleanRepo} does not exist on GitHub. Please create it first.`,
      };
    }

    const errData = await res.json().catch(() => ({}));
    const rawError = errData.message || `GitHub API error (status ${res.status})`;
    return {
      exists: false,
      content: '',
      sha: null,
      repoExists: false,
      error: sanitizeErrorMessage(rawError, cleanToken),
    };
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
    const msg = isTimeout
      ? 'Request timed out while contacting GitHub. Please check your network connection.'
      : (err instanceof Error ? err.message : 'Network error while contacting GitHub');

    return {
      exists: false,
      content: '',
      sha: null,
      repoExists: false,
      error: sanitizeErrorMessage(msg, cleanToken),
    };
  }
}

/**
 * Commits the README (and optional workflows) directly to the target GitHub repository
 */
export async function pushReadmeToGitHub(params: PushReadmeParams): Promise<PushReadmeResult> {
  const { owner, repo, token, content, existingSha, message, workflows, timeoutMs = 15000 } = params;

  const cleanOwner = owner?.trim();
  const cleanRepo = repo?.trim();
  const repoUrl = `https://github.com/${cleanOwner}/${cleanRepo}`;

  if (!isValidRepoIdentifier(cleanOwner) || !isValidRepoIdentifier(cleanRepo)) {
    return {
      success: false,
      repoUrl,
      error: 'Invalid repository name or owner format.',
    };
  }

  if (!token || !token.trim()) {
    return {
      success: false,
      repoUrl,
      error: 'GitHub Personal Access Token is required to push changes.',
    };
  }

  const cleanToken = token.trim();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `Bearer ${cleanToken}`,
    'Content-Type': 'application/json',
  };

  try {
    // 1. Commit README.md
    const base64Content = toBase64Utf8(content);
    const body: Record<string, unknown> = {
      message: message || 'docs(profile): update profile README via MonoForge',
      content: base64Content,
    };
    if (existingSha) {
      body.sha = existingSha;
    }

    const res = await fetch(`https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/README.md`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
      signal: createTimeoutSignal(timeoutMs),
    });

    if (!res.ok) {
      const rateLimitRemaining = res.headers?.get?.('x-ratelimit-remaining');
      if (res.status === 429 || (res.status === 403 && rateLimitRemaining === '0')) {
        return {
          success: false,
          repoUrl,
          error: 'GitHub API rate limit exceeded. Please wait a few moments before retrying.',
        };
      }

      if (res.status === 401) {
        return {
          success: false,
          repoUrl,
          error: 'Authentication failed: Your GitHub Personal Access Token is invalid or expired.',
        };
      }

      if (res.status === 403) {
        return {
          success: false,
          repoUrl,
          error: 'Permission denied: Ensure your token has "repo" (and "workflow" if pushing actions) permissions.',
        };
      }

      if (res.status === 404) {
        return {
          success: false,
          repoUrl,
          error: `Repository ${cleanOwner}/${cleanRepo} not found on GitHub. Please verify permissions and spelling.`,
        };
      }

      if (res.status === 409) {
        return {
          success: false,
          repoUrl,
          error: 'Conflict: The remote README has changed since you loaded the diff. Please refresh and review before committing.',
        };
      }

      const errData = await res.json().catch(() => ({}));
      const rawMsg = errData.message || `Failed to push README (status ${res.status})`;
      return {
        success: false,
        repoUrl,
        error: sanitizeErrorMessage(rawMsg, cleanToken),
      };
    }

    const resData = await res.json();
    const commitUrl = resData?.commit?.html_url || repoUrl;
    const createdWorkflows: string[] = [];

    // 2. Commit companion workflows if provided
    if (workflows && Object.keys(workflows).length > 0) {
      for (const [filePath, workflowContent] of Object.entries(workflows)) {
        try {
          const checkRes = await fetch(
            `https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/${filePath}`,
            { method: 'GET', headers, signal: createTimeoutSignal(timeoutMs) }
          );
          let wfSha: string | undefined;
          if (checkRes.ok) {
            const checkData = await checkRes.json();
            wfSha = checkData.sha;
          }

          const wfBody: Record<string, unknown> = {
            message: `ci(workflow): update ${filePath} via MonoForge`,
            content: toBase64Utf8(workflowContent),
          };
          if (wfSha) {
            wfBody.sha = wfSha;
          }

          const wfRes = await fetch(
            `https://api.github.com/repos/${cleanOwner}/${cleanRepo}/contents/${filePath}`,
            {
              method: 'PUT',
              headers,
              body: JSON.stringify(wfBody),
              signal: createTimeoutSignal(timeoutMs),
            }
          );

          if (wfRes.ok) {
            createdWorkflows.push(filePath);
          }
        } catch {
          // Continue processing remaining companion workflow files
        }
      }
    }

    return {
      success: true,
      commitUrl,
      repoUrl,
      createdWorkflows,
    };
  } catch (err: unknown) {
    const isTimeout = err instanceof Error && (err.name === 'TimeoutError' || err.name === 'AbortError');
    const msg = isTimeout
      ? 'Network request timed out while committing to GitHub. Please check connection and retry.'
      : (err instanceof Error ? err.message : 'Network error while committing to GitHub');

    return {
      success: false,
      repoUrl,
      error: sanitizeErrorMessage(msg, cleanToken),
    };
  }
}

