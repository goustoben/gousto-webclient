export const CDN_CHECKOUT_COM = 'https://cdn.checkout.com/js/framesv2.min.js'

export const loadCheckoutScript = (document = window.document) =>
  new Promise((resolve, reject) => {
    if (document) {
      const existingScript = document.getElementById('checkout-com-frames')

      if (existingScript) {
        existingScript.parentElement.removeChild(existingScript)
      }

      const script = document.createElement('script')
      script.src = CDN_CHECKOUT_COM
      script.id = 'checkout-com-frames'
      document.body.appendChild(script)

      script.onload = () => {
        resolve()
      }
      script.onerror = () => {
        reject(new Error('Failed to load Checkout.com Frames script'))
      }
    } else {
      reject(new Error('No document provided'))
    }
  })
