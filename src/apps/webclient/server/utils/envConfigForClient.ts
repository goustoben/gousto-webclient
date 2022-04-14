import { getEnvConfig, ParsedProcessEnv } from '../../src/utils/processEnv'

export type WindowEnvConfig = Pick<
  ParsedProcessEnv,
  'RECAPTCHA_PUBK' | 'RECAPTCHA_RAF_PUBK' | 'CHECKOUT_COM_PUBK' | 'ENVIRONMENT' | 'DOMAIN'
>

/**
 * Creates stringified config object for use in template.js
 * Enables passing of env config (only a PUBLIC subset) from server to client
 */
export const createWindowEnvConfig = () => {
  const { RECAPTCHA_PUBK, RECAPTCHA_RAF_PUBK, CHECKOUT_COM_PUBK, ENVIRONMENT, DOMAIN } =
    getEnvConfig()

  const windowEnvConfig: WindowEnvConfig = {
    RECAPTCHA_PUBK,
    RECAPTCHA_RAF_PUBK,
    CHECKOUT_COM_PUBK,
    ENVIRONMENT,
    DOMAIN,
  }

  return JSON.stringify(windowEnvConfig)
}
