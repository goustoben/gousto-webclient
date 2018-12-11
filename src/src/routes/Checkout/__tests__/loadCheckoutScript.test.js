import { JSDOM } from 'jsdom'

import { loadCheckoutScript } from 'routes/Checkout/loadCheckoutScript'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom
global.window = window

describe('loadCheckoutScript', () => {
  const callback = jest.fn()
  afterEach(() => {
    callback.mockClear()
  })

  describe('when document is undefined', () => {
    test('should not call callback', () => {
      loadCheckoutScript(callback)

      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('when document is defined', () => {
    beforeEach(() => {
      global.document = window.document
    })

    describe(`when script doesn't exist`, () => {
      test('should create a new script element and append it to body', () => {
        loadCheckoutScript(callback)

        expect(document.getElementById('checkout-com-frames').getAttribute('src')).toEqual(
          'https://cdn.checkout.com/js/frames.js'
        )
      })

      test('should invoke callback once script has loaded', () => {
        loadCheckoutScript(callback)
        document.getElementById('checkout-com-frames').onload()

        expect(callback).toHaveBeenCalled()
      })
    })

    describe('when script exists', () => {
      beforeEach(() => {
        const script = document.createElement('script')
        script.id = 'checkout-com-frames'
        script.className = 'initial-script'
        document.body.appendChild(script)
      })

      test('should create a new script element and append it to body', () => {
        loadCheckoutScript(callback)

        expect(document.querySelectorAll('[id="checkout-com-frames"][src="https://cdn.checkout.com/js/frames.js"]')).toHaveLength(1)
      })

      test('and should invoke callback once script has loaded', () => {
        loadCheckoutScript(callback)
        document.getElementById('checkout-com-frames').onload()

        expect(callback).toHaveBeenCalled()
      })
    })
  })
})
