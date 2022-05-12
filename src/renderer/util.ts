/* eslint import/prefer-default-export: off, import/no-mutable-exports: off */
import { label } from '@palette.dev/electron/renderer';

/**
 * A utility for profiling and label frequent events
 */
export const debounceLabel = (
  fn: () => void | Promise<void>,
  start: () => void,
  stop: () => void,
  _opts?: { name?: string; timeout?: number }
) => {
  const { name, timeout } = {
    name: fn.name ?? 'anonymous',
    timeout: 1_000,
    ..._opts,
  };

  let timeoutId: ReturnType<typeof global.setTimeout> | undefined;

  return async () => {
    if (timeoutId === undefined || timeoutId === null) {
      label.start(name); // Mark the start of the label
      start();
    } else {
      clearTimeout(timeoutId);
    }

    await fn(); // Invoke the function to be profiled

    // Debounce marking the end of the label
    timeoutId = setTimeout(() => {
      stop();
      label.end(name); // Mark the end of the label
      timeoutId = undefined;
    }, timeout);
  };
};
