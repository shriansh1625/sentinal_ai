/**
 * AI platform registry — ADR-035 / PART_10 (AI hosts only).
 */

export interface AiPlatform {
  readonly id: string;
  readonly displayName: string;
  readonly urlPatterns: readonly string[];
}

export const AI_PLATFORMS: readonly AiPlatform[] = [
  {
    id: 'openai-chat',
    displayName: 'ChatGPT',
    urlPatterns: ['*://chat.openai.com/*', '*://chatgpt.com/*'],
  },
  {
    id: 'gemini',
    displayName: 'Gemini',
    urlPatterns: ['*://gemini.google.com/*'],
  },
  {
    id: 'claude',
    displayName: 'Claude',
    urlPatterns: ['*://claude.ai/*'],
  },
  {
    id: 'deepseek',
    displayName: 'DeepSeek',
    urlPatterns: ['*://chat.deepseek.com/*'],
  },
  {
    id: 'perplexity',
    displayName: 'Perplexity',
    urlPatterns: ['*://perplexity.ai/*'],
  },
  {
    id: 'grok',
    displayName: 'Grok',
    urlPatterns: ['*://grok.com/*', '*://x.com/i/grok*'],
  },
  {
    id: 'copilot',
    displayName: 'Microsoft Copilot',
    urlPatterns: ['*://copilot.microsoft.com/*'],
  },
  {
    id: 'github-copilot',
    displayName: 'GitHub Copilot',
    urlPatterns: ['*://github.com/copilot*'],
  },
  {
    id: 'cursor',
    displayName: 'Cursor',
    urlPatterns: ['*://cursor.sh/*'],
  },
] as const;

export function getPlatform(platformId: string): AiPlatform | undefined {
  return AI_PLATFORMS.find((p) => p.id === platformId);
}
