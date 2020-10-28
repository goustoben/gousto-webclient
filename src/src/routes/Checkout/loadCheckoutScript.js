export const CDN_CHECKOUT_COM = 'https://cdn.checkout.com/js/framesv2.min.js'

export const loadCheckoutScript = (callback, document = window.document) => {
  if (document && callback) {
    const existingScript = document.getElementById('checkout-com-frames')

    if (existingScript) {
      existingScript.parentElement.removeChild(existingScript)
    }

    const script = document.createElement('script')
    script.src = CDN_CHECKOUT_COM
    script.id = 'checkout-com-frames'
    document.body.appendChild(script)

    script.onload = () => {
      callback()
    }
  }
}
