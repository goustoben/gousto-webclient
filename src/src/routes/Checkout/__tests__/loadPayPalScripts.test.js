import { JSDOM } from 'jsdom'

import {
  BRAINTREE_CDN,
  BRAINTREE_VERSION,
  BRAINTREE_CLIENT,
  BRAINTREE_PAYPAL_CHECKOUT,
  BRAINTREE_DATA_COLLECTOR,
  loadPayPalScripts,
} from '../loadPayPalScripts'

describe('loadPayPalScripts', () => {
  let document = null
  const scriptNames = [[BRAINTREE_CLIENT], [BRAINTREE_PAYPAL_CHECKOUT], [BRAINTREE_DATA_COLLECTOR]]

  const triggerLoadEvent = (element) => {
    const event = document.createEvent('Event')
    event.initEvent('load', true, true)
    element.dispatchEvent(event)
  }

  const triggerErrorEvent = (element) => {
    const event = document.createEvent('Event')
    event.initEvent('error', true, true)
    element.dispatchEvent(event)
  }

  beforeEach(() => {
    const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
    document = jsdom.window.document
  })

  describe('when document is not defined', () => {
    test('should not load scripts', () => {
      loadPayPalScripts(null).catch(() => {})
      const scripts = document.querySelectorAll('script')

      expect(scripts).toHaveLength(0)
    })

    test('should reject promise', (done) => {
      loadPayPalScripts(null).catch(() => {
        done()
      })

      document.querySelectorAll('script').forEach(triggerLoadEvent)
    })
  })

  describe('should use window.document by default', () => {
    afterEach(() => {
      window.document.querySelectorAll('script').forEach((e) => {
        e.parentElement.removeChild(e)
      })
    })

    test('should load scripts', () => {
      loadPayPalScripts()
      const scripts = window.document.querySelectorAll('script')

      expect(scripts).toHaveLength(3)
    })
  })

  describe('when document is defined', () => {
    test('should resolve once scripts have loaded', (done) => {
      loadPayPalScripts(document).then(() => {
        done()
      })

      document.querySelectorAll('script').forEach(triggerLoadEvent)
    })

    describe.each(scriptNames)('"%s" script', (scriptName) => {
      describe('when script does not exist', () => {
        test('should create a new script element and append it to body', () => {
          const expected = `${BRAINTREE_CDN}/web/${BRAINTREE_VERSION}/js/${scriptName}.min.js`

          loadPayPalScripts(document)
          const script = document.getElementById(`braintree-${scriptName}-script`)

          expect(script).not.toBeNull()
          expect(script.getAttribute('src')).toEqual(expected)
        })

        test('should reject once script has failed to load', (done) => {
          loadPayPalScripts(document).catch(() => {
            done()
          })

          document.querySelectorAll('script').forEach(triggerErrorEvent)
        })
      })

      describe('when script exists', () => {
        const scriptId = `braintree-${scriptName}-script`
        const initialClassName = `initial-script-${scriptName}`

        beforeEach(() => {
          const script = document.createElement('script')
          script.id = scriptId
          script.className = initialClassName
          document.body.appendChild(script)
        })

        test('should remove old script', () => {
          loadPayPalScripts(document)
          const scripts = document.querySelectorAll(`.${initialClassName}`)

          expect(scripts).toHaveLength(0)
        })

        test('should create a new script element and append it to body', () => {
          loadPayPalScripts(document)
          const script = document.getElementById(scriptId)

          expect(script).not.toBeNull()
        })

        test('and should resolve once scripts have loaded', (done) => {
          loadPayPalScripts(document).then(() => {
            done()
          })

          document.querySelectorAll('script').forEach(triggerLoadEvent)
        })
      })
    })
  })
})
