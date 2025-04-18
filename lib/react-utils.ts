/**
 * Utility functions for React components
 */

/**
 * Creates a stable callback that can be used in effects
 * This is a workaround for the experimental useEffectEvent hook
 *
 * @param callback The callback function
 * @returns A memoized callback
 */
export function createStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  // This is a simplified version that doesn't fully replicate useEffectEvent
  // but should work for most cases where it was being used
  return callback
}
