import { useRef, useCallback } from 'react'

/**
 * Create a callback function from fn that behaves like a result of
 * lodash.debounce in "leading" mode.
 *
 * @param fn: function to debounce
 *
 * @param waitMs: interval after which the repeated calls of the returned
 * function are allowed to pass through to the final call of the original
 * function
 *
 * @param dependencies: like React.useCallback dependencies: the new function
 * value will be returned only if any of the dependencies change.
 *
 * @return a debounced callback
 */
export const useDebouncedCallback = (fn, waitMs, dependencies) => {
  const timeoutRef = useRef(null)

  return useCallback(() => {
    const later = () => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      fn()
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    } else {
      fn()
    }
    timeoutRef.current = setTimeout(later, waitMs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitMs, ...dependencies])
}
