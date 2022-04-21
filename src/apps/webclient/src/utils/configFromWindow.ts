import type { WindowEnvConfig } from '../../server/utils/envConfigForClient'

/**
 * Memoized fn, returns getter fn to retrieve value from window.__config__ object
 * @example
 * ```ts
 * const getConfigFromWindow = $getConfigFromWindow()
 *
 * const checkoutPublicKey = getConfigFromWindow('CHECKOUT_COM_PUBK')
 * ```
 */
export const $getConfigFromWindow = () => {
  const memo = new Map<string, string>()

  return <K extends keyof WindowEnvConfig>(key: K): WindowEnvConfig[K] => {
    try {
      const valueFromMemo = memo.get(key)

      if (valueFromMemo) return valueFromMemo

      const value = window.__config__[key]

      if (typeof value === 'undefined') {
        throw new Error(`config with key ${key} is not defined`)
      }

      memo.set(key, value)

      return value
    } catch (err) {
      throw new Error(`Error getting client config from window: ${err}`)
    }
  }
}

export const getConfigFromWindow = $getConfigFromWindow()

export const getClientRecaptchaPublicKey = () => getConfigFromWindow('RECAPTCHA_PUBK')
export const getClientRecaptchaRAFPublicKey = () => getConfigFromWindow('RECAPTCHA_RAF_PUBK')
export const getClientCheckoutComPublicKey = () => getConfigFromWindow('CHECKOUT_COM_PUBK')
export const getClientEnvironment = () => getConfigFromWindow('ENVIRONMENT')
export const getClientDomain = () => getConfigFromWindow('DOMAIN')

export const getClientDatadogRumSdkAppID = () => getConfigFromWindow('DATADOG_RUM_SDK_APP_ID')
export const getClientDatadogRumSdkClientToken = () =>
  getConfigFromWindow('DATADOG_RUM_SDK_CLIENT_TOKEN')
export const getClientDatadogBrowserLogsClientToken = () =>
  getConfigFromWindow('DATADOG_BROWSER_LOGS_CLIENT_TOKEN')
