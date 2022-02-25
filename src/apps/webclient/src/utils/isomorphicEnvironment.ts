import { canUseWindow, getClientEnvironment } from './browserEnvironment'
import { getServerEnvironment } from '../../server/utils/serverEnvironment'

type CreateIsomorphicConfig<T> = {
  testFn?: () => boolean
  browserConfigFn: () => T
  serverConfigFn: () => T
}

/**
 * Utility to create an isomorphic environment
 * config getter
 *
 * Can override environment test fn if needed,
 * defaults to `canUseWindow`
 *
 * @example
 * ```
 * const getDomain = createIsomorphicConfig({
 *  browserConfigFn: getClientDomain,
 *  serverConfigFn: getServerDomain,
 * })
 *
 * // In use:
 * const domain = getDomain()
 * ```
 */
export const createIsomorphicConfig = <T>({
  testFn,
  browserConfigFn,
  serverConfigFn,
}: CreateIsomorphicConfig<T>) => {
  const shouldUseBrowserFn = testFn || canUseWindow

  return () => (shouldUseBrowserFn() ? browserConfigFn() : serverConfigFn())
}

export const getEnvironment = createIsomorphicConfig({
  browserConfigFn: getClientEnvironment,
  serverConfigFn: getServerEnvironment,
})

export const isProd = () => getEnvironment() === 'production'
