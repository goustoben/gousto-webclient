import { JSDOM } from 'jsdom'

import { loadCheckout } from 'routes/Checkout/loadCheckout'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

describe('loadCheckout', () => {
  const callback = jest.fn()
  afterEach(() => {
    callback.mockClear()
  })

  describe('when document is undefined', () => {
    beforeEach(() => {
      global.document = undefined
    })

    test('should not call callback', () => {
      loadCheckout(callback)

      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('when document is defined', () => {
    beforeEach(() => {
      global.window = window
      global.document = window.document
    })

    describe('when script exists', () => {
      beforeEach(() => {
        const script = document.createElement('script')
        script.id = 'checkout-com-frames'
        script.onload = jest.fn()
        document.body.appendChild(script)
      })

      test('should invoke callback', () => {
        loadCheckout(callback)

        expect(callback).toHaveBeenCalled()
      })
    })

    describe(`when script doesn't exist`, () => {
      test('should create a new script element and append it to body', () => {
        loadCheckout(callback)

        expect(document.getElementById('checkout-com-frames').getAttribute('src')).toEqual(
          'https://cdn.checkout.com/js/frames.js'
        )
      })

      test('should invoke callback once script has loaded', () => {
        loadCheckout(callback)

        expect(callback).toHaveBeenCalled()
      })
    })
  })
})
