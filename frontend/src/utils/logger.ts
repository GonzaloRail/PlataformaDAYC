/**
 * Dev-only logger. Strips `console.log`/`console.warn`/`console.error`
 * output in production builds so the console stays quiet for end users.
 */
const isDev = import.meta.env.DEV;

function log(level: 'log' | 'warn' | 'error', scope: string, ...args: unknown[]): void {
  if (!isDev) return;
  // eslint-disable-next-line no-console
  console[level](`[${scope}]`, ...args);
}

export const devLog = {
  info: (scope: string, ...args: unknown[]) => log('log', scope, ...args),
  warn: (scope: string, ...args: unknown[]) => log('warn', scope, ...args),
  error: (scope: string, ...args: unknown[]) => log('error', scope, ...args),
};
