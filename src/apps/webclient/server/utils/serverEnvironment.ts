import {
  ENVIRONMENT_NAMES,
  PROTOCOL_PREFIX,
} from 'config/service-environment/service-environment.types'
import { canUseWindow } from 'utils/browserEnvironment'
import { getEnvConfig } from 'utils/processEnv'

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

export const getServerProtocol = () =>
  getServerEnvironment() === ENVIRONMENT_NAMES.local ? PROTOCOL_PREFIX.HTTP : PROTOCOL_PREFIX.HTTPS

export const getServerRecaptchaPublicKey = () => getEnvConfig().RECAPTCHA_PUBK
export const getServerRecaptchaRAFPublicKey = () => getEnvConfig().RECAPTCHA_RAF_PUBK
export const getServerCheckoutComPublicKey = () => getEnvConfig().CHECKOUT_COM_PUBK

export const isServer = () => !canUseWindow()
