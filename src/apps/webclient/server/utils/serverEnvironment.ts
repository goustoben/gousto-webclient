import { getEnvConfig } from 'utils/processEnv'
import {
  ENVIRONMENT_NAMES,
  PROTOCOL_PREFIX,
} from 'config/service-environment/service-environment.types'

/**
 * Environment config getter for SERVER side environment
 *
 * Intended for use in `createIsomorphicEnvironment`
 *
 * @example
 * ```
 * const getEnvironment = createIsomorphicConfig({
 *   browserConfigFn: getClientEnvironment,
 *   serverConfigFn: getServerEnvironment,
 * })
 * ```
 */
export const getServerEnvironment = () => {
  const { ENVIRONMENT } = getEnvConfig()

  return ENVIRONMENT
}

export const getServerDomain = () => {
  const { DOMAIN } = getEnvConfig()

  return DOMAIN
}

const isLocalEnvironment = () => getServerEnvironment() === ENVIRONMENT_NAMES.local

export const getServerProtocol = () =>
  isLocalEnvironment() ? PROTOCOL_PREFIX.HTTP : PROTOCOL_PREFIX.HTTPS

export const getServerRecaptchaPublicKey = () => getEnvConfig().RECAPTCHA_PUBK
export const getServerRecaptchaRAFPublicKey = () => getEnvConfig().RECAPTCHA_RAF_PUBK
export const getServerCheckoutComPublicKey = () => getEnvConfig().CHECKOUT_COM_PUBK
