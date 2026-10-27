import { config } from '#/config';

const { imageBaseUrl, streakBaseUrl, trophyBaseUrl, activityGraphBaseUrl } =
  config.general.urls.sections.stats;

function urls(value: string) {
  const normalized = value ? value.trim() : '';
  const safeValue =
    !normalized ||
    normalized.toLowerCase() === 'username' ||
    normalized.toLowerCase() === 'zusername'
      ? 'octocat'
      : normalized;

  return {
    stats: `${imageBaseUrl}?username=${safeValue}`,
    languages: `${imageBaseUrl}/top-langs?username=${safeValue}`,
    streak: `${streakBaseUrl}?user=${safeValue}`,
    trophy: `${trophyBaseUrl}?username=${safeValue}`,
    'activity-graph': `${activityGraphBaseUrl}?username=${safeValue}`,
  };
}

export function getStats(type: keyof typeof urls, github: string) {
  return `${urls(github)[type]}`;
}
