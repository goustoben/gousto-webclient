export const loadCheckout = (callback) => {
  if (document && callback) {
    const existingScript = document.getElementById('checkout-com-frames')

    if (existingScript) {
      callback()
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdn.checkout.com/js/frames.js'
      script.id = 'checkout-com-frames'
      document.body.appendChild(script)

      script.onload = () => {
        callback()
      }
    }
  }
}
