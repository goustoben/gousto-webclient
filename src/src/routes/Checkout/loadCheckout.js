export const loadCheckout = (callback) => {
  if (document) {
    const existingScript = document.getElementById('checkout-com-frames')

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://cdn.checkout.com/js/frames.js'
      script.id = 'checkout-com-frames'
      document.body.appendChild(script)

      script.onload = () => {
        if (callback) callback()
      }
    }

    if (existingScript && callback) callback()
  }
}
