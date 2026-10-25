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
}

export interface PushReadmeResult {
  success: boolean;
  commitUrl?: string;
  repoUrl: string;
  error?: string;
  createdWorkflows?: string[];
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
 * Fetches the real remote README and SHA from GitHub
 */
export async function fetchRemoteReadme(
  owner: string,
  repo: string,
  token?: string
): Promise<RemoteReadmeResult> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token && token.trim()) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
      method: 'GET',
      headers,
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

    if (res.status === 404) {
      // Check if the repo exists
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        method: 'GET',
        headers,
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
        error: `Repository ${owner}/${repo} does not exist on GitHub. Please create it first.`,
      };
    }

    if (res.status === 401) {
      return {
        exists: false,
        content: '',
        sha: null,
        repoExists: false,
        error: 'Authentication failed. Please verify your GitHub Personal Access Token.',
      };
    }

    const errData = await res.json().catch(() => ({}));
    return {
      exists: false,
      content: '',
      sha: null,
      repoExists: false,
      error: errData.message || `GitHub API error (status ${res.status})`,
    };
  } catch (err: unknown) {
    return {
      exists: false,
      content: '',
      sha: null,
      repoExists: false,
      error: err instanceof Error ? err.message : 'Network error while contacting GitHub',
    };
  }
}

/**
 * Commits the README (and optional workflows) directly to the target GitHub repository
 */
export async function pushReadmeToGitHub(params: PushReadmeParams): Promise<PushReadmeResult> {
  const { owner, repo, token, content, existingSha, message, workflows } = params;

  if (!token || !token.trim()) {
    return {
      success: false,
      repoUrl: `https://github.com/${owner}/${repo}`,
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
      message: message || 'docs(profile): update profile README via ReadmeForge',
      content: base64Content,
    };
    if (existingSha) {
      body.sha = existingSha;
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/README.md`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      if (res.status === 409) {
        return {
          success: false,
          repoUrl: `https://github.com/${owner}/${repo}`,
          error: 'Conflict: The remote README has changed since you loaded the diff. Please refresh and review before committing.',
        };
      }
      if (res.status === 403) {
        return {
          success: false,
          repoUrl: `https://github.com/${owner}/${repo}`,
          error: 'Permission denied: Ensure your token has "repo" (and "workflow" if pushing actions) permissions.',
        };
      }
      return {
        success: false,
        repoUrl: `https://github.com/${owner}/${repo}`,
        error: errData.message || `Failed to push README (status ${res.status})`,
      };
    }

    const resData = await res.json();
    const commitUrl = resData?.commit?.html_url || `https://github.com/${owner}/${repo}`;
    const createdWorkflows: string[] = [];

    // 2. Commit companion workflows if provided
    if (workflows && Object.keys(workflows).length > 0) {
      for (const [filePath, workflowContent] of Object.entries(workflows)) {
        try {
          // Check if workflow exists to get its SHA
          const checkRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
            { method: 'GET', headers }
          );
          let wfSha: string | undefined;
          if (checkRes.ok) {
            const checkData = await checkRes.json();
            wfSha = checkData.sha;
          }

          const wfBody: Record<string, unknown> = {
            message: `ci(workflow): update ${filePath} via ReadmeForge`,
            content: toBase64Utf8(workflowContent),
          };
          if (wfSha) {
            wfBody.sha = wfSha;
          }

          const wfRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
            {
              method: 'PUT',
              headers,
              body: JSON.stringify(wfBody),
            }
          );

          if (wfRes.ok) {
            createdWorkflows.push(filePath);
          }
        } catch {
          // Continue processing remaining files
        }
      }
    }

    return {
      success: true,
      commitUrl,
      repoUrl: `https://github.com/${owner}/${repo}`,
      createdWorkflows,
    };
  } catch (err: unknown) {
    return {
      success: false,
      repoUrl: `https://github.com/${owner}/${repo}`,
      error: err instanceof Error ? err.message : 'Network error while committing to GitHub',
    };
  }
}
