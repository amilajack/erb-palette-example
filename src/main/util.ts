/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { URL } from 'url';
import path from 'path';
import { label } from '@palette.dev/electron/main';

export let resolveHtmlPath: (htmlFileName: string) => string;

if (process.env.NODE_ENV === 'development') {
  const port = process.env.PORT || 1212;
  resolveHtmlPath = (htmlFileName: string) => {
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  };
} else {
  resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  };
}

/**
 * Profile the cpu from start to end of a given function
 *
 * This util is useful for profiling infrequent events.
 * Some examples of these events are:
 * - App startup
 * - Routing changes
 * - Loading third-party scripts
 * - Animations
 */
export const labelFn = async (
  fn: () => void | Promise<void>,
  start: () => void,
  stop: () => void,
  opts?: { name?: string }
) => {
  const { name } = { name: fn.name ?? 'anonymous', ...opts };
  label.start(name);
  start();
  await fn();
  stop();
  label.end(name);
};
