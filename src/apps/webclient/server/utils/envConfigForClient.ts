import { getEnvConfig, ParsedProcessEnv } from '../../src/utils/processEnv'

export type WindowEnvConfig = Pick<
  ParsedProcessEnv,
  'RECAPTCHA_PUBK' | 'RECAPTCHA_RAF_PUBK' | 'CHECKOUT_COM_PUBK' | 'ENVIRONMENT'
>

/**
 * Creates stringified config object for use in template.js
 * Enables passing of env config (only a PUBLIC subset) from server to client
 */
export const createWindowEnvConfig = () => {
  const { RECAPTCHA_PUBK, RECAPTCHA_RAF_PUBK, CHECKOUT_COM_PUBK, ENVIRONMENT } = getEnvConfig()

  const windowEnvConfig: WindowEnvConfig = {
    RECAPTCHA_PUBK,
    RECAPTCHA_RAF_PUBK,
    CHECKOUT_COM_PUBK,
    ENVIRONMENT,
  }

  return JSON.stringify(windowEnvConfig)
}
