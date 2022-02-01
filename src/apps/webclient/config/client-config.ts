// Config that cannot be inferred from window.location
// __CHECKOUT_PK__: JSON.stringify(checkout_pk), -> Cannot be inferred from window
// __DATADOG_ENABLED__: JSON.stringify(datadogEnabled), -> Maybe can be inferred from window
// __DATADOG_BROWSER_LOGS_TOKEN__: JSON.stringify(datadogBrowserLogsToken), -> Cannot be inferred from window
// __DATADOG_RUM_SDK_TOKEN__: JSON.stringify(datadogRumSDKToken), -> Cannot be inferred from window
// __DATADOG_RUM_SDK_APP_ID__: JSON.stringify(datadogRumSDKAppID), -> Cannot be inferred from window
// __RECAPTCHA_RAF_PUBK__: JSON.stringify(recaptchaReferralPublicKey), -> Cannot be inferred from window - only used in ReferAFriend.presentation

// Config to be removed/interpolated
// __TEST__: false, -> Should be removed in favour of NODE_ENV === 'test' potentially -> https://jestjs.io/docs/environment-variables

// Config that can be inferred from window.location
// __CLOUDFRONT_URL__: JSON.stringify(cloudfrontUrl), -> used in media.js - potentially can be inferred from window
// __ENDPOINTS__: JSON.stringify(endpoints), -> Lewis' work
// __API_ENV__: JSON.stringify(apiName), -> Can be inferred from window - only used for endpoint.js
// __RUNNING_ENV__: -> Only used with endpoint.js -> Can be inferred from window, maybe with overrides

// Config that should be build time
// 'process.env.NODE_ENV' - currently only used in the client for build purposes
// __CIRCLE_BUILD_NUM__: JSON.stringify(process.env.CIRCLE_BUILD_NUM), -> should be a build time var

// Dev-related variables
// __HMR__: hmrEnabled, -> potentially just pass this as an arg to dev script

// Satisfies:
// __CLIENT__
// __SERVER__
export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const canUseDOMOrThrow = () => {
  if (!canUseDOM) {
    throw new Error('Window does not exist')
  }

  return canUseDOM
}

// __CLIENT_PROTOCOL__
export const getClientProtocol = () => {
  canUseDOMOrThrow()

  return window.location.protocol.replace(':', '') as 'http' | 'https'
}

export const getSubdomain = () => {
  canUseDOMOrThrow()

  // Maybe type window.location.x with a getter fn
  // For better typing moving forward
  const [subDomain] = window.location.host.split('.')

  return subDomain
}

export const getTopLevelDomain = () => {
  canUseDOMOrThrow()

  const splitHost = window.location.host.split('gousto')

  return splitHost[splitHost.length - 1]
}

// __DOMAIN__
export const getDomain = () => {
  canUseDOMOrThrow()

  return `gousto${getTopLevelDomain()}`
}

// __ENV__
export const getClientEnvironment = () => {
  canUseDOMOrThrow()

  // Production -> https://www.gousto.co.uk OR https://gousto.co.uk OR https://production-webclient.gousto.co.uk OR https://production-frontend.gousto.co.uk
  // This logic can be condensed considerably
  switch (true) {
    case getClientProtocol() === 'https' &&
      (getSubdomain() === 'www' || !getSubdomain() || getSubdomain().includes('production')):
      return 'production'

    // Staging -> https://staging-www.gousto.info OR https://staging-webclient.gousto.info OR https://staging-frontend.gousto.info
    case getClientProtocol() === 'https' && getSubdomain().includes('staging'):
      return 'staging'

    // Lower environment -> https://fef-www.gousto.info OR https://fef-webclient.gousto.info OR https://fef-frontend.gousto.info
    case getClientProtocol() === 'https' &&
      getTopLevelDomain().includes('.co.uk') &&
      ['-www', '-webclient', '-frontend'].some((str) => getSubdomain().includes(str)):
      return 'lower'

    default:
      // Local -> http://frontend.gousto.local:8080 OR http://localhost:8080
      return 'local'
  }
}

// __PROD__
export const isProd = () => getClientEnvironment() === 'production'

// __DEV__
export const isDev = () => getClientEnvironment() === 'local'
