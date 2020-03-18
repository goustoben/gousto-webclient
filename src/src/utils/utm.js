function getUTMQueryParams() {
  const { search } = window.location
  const output = {}
  if (search !== '') {
    const params = search.split('&')
    params.forEach((param) => {
      if (param.includes('utm_')) {
        const [ key, value ] = param.split('=')
        output[key] = value
      }
    })
  }

  return Object.keys(output).length ? output : null
}

/*
 * Urchin Tracking Module (UTM)
 * */
export function getUTM() {
  return {
    referral: document.referrer,
    ...getUTMQueryParams()
  }
}
