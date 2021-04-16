export const BRAINTREE_CDN = 'https://js.braintreegateway.com'
export const BRAINTREE_VERSION = '3.65.0'
export const BRAINTREE_CLIENT = 'client'
export const BRAINTREE_PAYPAL_CHECKOUT = 'paypal-checkout'
export const BRAINTREE_DATA_COLLECTOR = 'data-collector'

const loadScript = (name, document) =>
  new Promise((resolve, reject) => {
    if (document) {
      const scriptId = `braintree-${name}-script`
      const existingScript = document.getElementById(scriptId)

      if (existingScript) {
        existingScript.parentElement.removeChild(existingScript)
      }

      const script = document.createElement('script')
      script.src = `${BRAINTREE_CDN}/web/${BRAINTREE_VERSION}/js/${name}.min.js`
      script.id = scriptId
      script.onload = resolve
      script.onerror = reject
      document.body.appendChild(script)
    } else {
      reject()
    }
  })

export const loadPayPalScripts = (callback, document = window.document) => {
  Promise.all([
    loadScript(BRAINTREE_CLIENT, document),
    loadScript(BRAINTREE_PAYPAL_CHECKOUT, document),
    loadScript(BRAINTREE_DATA_COLLECTOR, document),
  ])
    .then(callback)
    .catch(() => {})
}
