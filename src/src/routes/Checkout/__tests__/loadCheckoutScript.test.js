import { JSDOM } from 'jsdom'
import { CDN_CHECKOUT_COM, loadCheckoutScript } from '../loadCheckoutScript'

describe('loadCheckoutScript', () => {
  let callback = null
  let document = null

  beforeEach(() => {
    callback = jest.fn()
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
    document = jsdom.window.document
  })

  describe('when document is undefined', () => {
    test('should not call callback', () => {
      loadCheckoutScript(callback, undefined)

      expect(callback).not.toHaveBeenCalled()
    })
  })

  describe('when document is defined', () => {
    describe('when script does not exist', () => {
      test('should create a new script element and append it to body', () => {
        loadCheckoutScript(callback, document)

        expect(document.getElementById('checkout-com-frames').getAttribute('src')).toEqual(
          CDN_CHECKOUT_COM
        )
      })

      test('should invoke callback once script has loaded', () => {
        loadCheckoutScript(callback, document)
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
        loadCheckoutScript(callback, document)

        expect(document.querySelectorAll('#checkout-com-frames')).toHaveLength(1)
      })

      test('and should invoke callback once script has loaded', () => {
        loadCheckoutScript(callback, document)
        document.getElementById('checkout-com-frames').onload()

        expect(callback).toHaveBeenCalled()
      })
    })
  })
})
