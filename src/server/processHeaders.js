const requestActions = require('actions/request')
const browserTypeChange = requestActions.browserTypeChange

const formatHeaderNames = headers => {
  const matchedHeaders = Object.keys(headers).filter(header => headers[header] === 'true' && header.includes('cloudfront-is'))
  const matchedHeaderNames = matchedHeaders.map(header => {
    let viewer = ''
    const matches = header.match(/cloudfront-is-(\w+?)-viewer/i)
    if (matches.length >= 2) {
      viewer = matches[1]
    }

    return viewer
  }).join(', ')

  return matchedHeaderNames
}

const processHeaders = (headers, store) => {
  if (headers['cloudfront-is-mobile-viewer'] === 'true') {
    store.dispatch(browserTypeChange('mobile'))
  }

  if (headers['cloudfront-is-tablet-viewer'] === 'true') {
    store.dispatch(browserTypeChange('tablet'))
  }

  if (headers['cloudFront-is-desktop-viewer'] === 'true') {
    store.dispatch(browserTypeChange('desktop'))
  }

  const userAgentHeader = headers['user-agent']
  if (userAgentHeader) {
    store.dispatch(requestActions.setUserAgent(userAgentHeader))
  }
}

module.exports = {
  processHeaders,
  formatHeaderNames,
}
