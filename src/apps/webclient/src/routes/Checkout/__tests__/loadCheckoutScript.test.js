import { JSDOM } from 'jsdom'

import { CDN_CHECKOUT_COM, loadCheckoutScript } from '../loadCheckoutScript'

describe('loadCheckoutScript', () => {
  let document = null

  beforeEach(() => {
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
    document = jsdom.window.document
  })

  describe('when document is not defined', () => {
    test('should reject', (done) => {
      loadCheckoutScript(null).catch(() => {
        done()
      })
    })
  })

  describe('when document is defined', () => {
    describe('when script does not exist', () => {
      test('should create a new script element and append it to body', () => {
        loadCheckoutScript(document)

        expect(document.getElementById('checkout-com-frames').getAttribute('src')).toEqual(
          CDN_CHECKOUT_COM,
        )
      })

      test('should resolve once script has loaded', (done) => {
        loadCheckoutScript(document).then(done)
        document.getElementById('checkout-com-frames').onload()
      })

      describe('when script failed to load', () => {
        test('should log successful event', (done) => {
          loadCheckoutScript(document).catch(() => {
            done()
          })
          document.getElementById('checkout-com-frames').onerror(new Error('Failed to load script'))
        })
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
        loadCheckoutScript(document)

        expect(document.querySelectorAll('#checkout-com-frames')).toHaveLength(1)
      })

      test('and should resolve once script has loaded', (done) => {
        loadCheckoutScript(document).then(done)

        document.getElementById('checkout-com-frames').onload()
      })
    })
  })
})
