import {
  getServerEnvironment,
  getServerDomain,
  getServerProtocol,
  getServerCheckoutComPublicKey,
  getServerRecaptchaPublicKey,
  getServerRecaptchaRAFPublicKey,
} from '../../server/utils/serverEnvironment'
import { canUseWindow, getClientProtocol } from './browserEnvironment'
import {
  getClientEnvironment,
  getClientDomain,
  getClientCheckoutComPublicKey,
  getClientRecaptchaPublicKey,
  getClientRecaptchaRAFPublicKey,
} from './configFromWindow'

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

// TODO - narrow type for both fns here
export const getDomain = createIsomorphicConfig({
  browserConfigFn: getClientDomain,
  serverConfigFn: getServerDomain,
})

export const getProtocol = createIsomorphicConfig({
  browserConfigFn: getClientProtocol,
  serverConfigFn: getServerProtocol,
})

export const isProd = () => getEnvironment() === 'production'
export const isDev = () => getEnvironment() === 'local'

export const getRecaptchaPublicKey = createIsomorphicConfig({
  browserConfigFn: getClientRecaptchaPublicKey,
  serverConfigFn: getServerRecaptchaPublicKey,
})

export const getRecaptchaRAFPublicKey = createIsomorphicConfig({
  browserConfigFn: getClientRecaptchaRAFPublicKey,
  serverConfigFn: getServerRecaptchaRAFPublicKey,
})

export const getCheckoutComPublicKey = createIsomorphicConfig({
  browserConfigFn: getClientCheckoutComPublicKey,
  serverConfigFn: getServerCheckoutComPublicKey,
})
