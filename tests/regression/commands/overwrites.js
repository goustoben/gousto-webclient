// // ***********************************************
// // For examples of custom
// // commands please read more here:
// // https://on.cypress.io/custom-commands
// // ***********************************************

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    // Please be aware that Cypress only currently supports intercepting XMLHttpRequests.
    // Requests using the Fetch API and other types of network requests like page loads
    // and <script> tags will not be intercepted or visible in the Command Log.
    // See #95 for more details and temporary workarounds.
    // https://docs.cypress.io/api/commands/route.html#Syntax
    // https://github.com/cypress-io/cypress/issues/95
  const removeFetch = {
    onBeforeLoad (win) {
      delete win.fetch
    },
  }

  return originalFn(url, {options, ...removeFetch})
})

Cypress.Commands.overwrite('server', (originalFn, options) => {
  const goustoDefaultOptions = {
    force404: true,
    whitelist: (xhr) => {
      const defaultCypressWhitelist = xhr.method === 'GET' && /\.(jsx?|html|css)(\?.*)?$/.test(xhr.url)
      const content = xhr.url.match(/(content)|(s3)/)
      const tracking = xhr.url.match(/(snowplow)|(pinterest)|(optimizely)|(hotjar)|(pingdom)|(s.yimg)/)

      return defaultCypressWhitelist || content || tracking
    }
  }

  return originalFn({options, ...goustoDefaultOptions})
})


