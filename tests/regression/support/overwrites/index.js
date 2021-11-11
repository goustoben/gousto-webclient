// // ***********************************************
// // For examples of custom
// // commands please read more here:
// // https://on.cypress.io/custom-commands
// // ***********************************************

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {options, ...{
    headers: {
      "x-pre-render": false,
    }
  }})
})

Cypress.Commands.overwrite('server', (originalFn, options={}) => {
  const goustoDefaultOptions = {
    force404: true,
    ignore: (xhr) => {
      const defaultCypressWhitelist = xhr.method === 'GET' && /\.(jsx?|html|css)(\?.*)?$/.test(xhr.url)
      const checkoutCom = xhr.url.match(/(checkout.com)/)
      const content = xhr.url.match(/(content)|(s3)/)
      const tracking = xhr.url.match(/(snowplow)|(pinterest)|(optimizely)|(hotjar)|(pingdom)|(s.yimg)/)
      const recaptcha = xhr.url.match(/(recaptcha\/api2\/userverify)/)

      return defaultCypressWhitelist || content || tracking || checkoutCom || recaptcha || (options.ignore && options.ignore(xhr))
    }
  }

  return originalFn({...options, ...goustoDefaultOptions})
})

Cypress.on('uncaught:exception', (err, runnable, promise) => {
  // when the exception originated from an unhandled promise
  // rejection, the promise is provided as a third argument
  // you can turn off failing the test in this case
  if (promise) {
    // returning false here prevents Cypress from
    // failing the test
    return false
  }
})
