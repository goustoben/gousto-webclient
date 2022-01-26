const scriptOptions = [
  {queryKey: 'noFacebookTracking', scriptKey: 'facebookTracking'},
  {queryKey: 'noGTM', scriptKey: 'gtm'},
  {queryKey: 'noOptimizely', scriptKey: 'optimizely'},
]

export const DISABLED_SCRIPTS = { facebookTracking: false, gtm: false, optimizely: false, other: false }

export const extractScriptOptions = (request) => {
  const { query = {} } = request

  const result = DISABLED_SCRIPTS
  const thirdPartyEnabled = !JSON.parse(query.noThirdParty || 'false')
  result.other = thirdPartyEnabled

  scriptOptions.forEach(({queryKey, scriptKey}) => {
    const enabled = !JSON.parse(query[queryKey] || 'false')
    result[scriptKey] = enabled && thirdPartyEnabled
  })

  return result
}
