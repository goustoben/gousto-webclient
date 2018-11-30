export const loadCheckoutScript = (callback) => {
  if (document && callback) {
    const existingScript = document.getElementById('checkout-com-frames')

    if (existingScript) {
      existingScript.parentNode.removeChild(existingScript)
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.checkout.com/js/frames.js'
    script.id = 'checkout-com-frames'
    document.body.appendChild(script)

    script.onload = () => {
      callback()
    }
  }
}
