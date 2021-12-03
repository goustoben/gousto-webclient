import React from 'react'
import { shallow } from 'enzyme'
import Overlay from 'components/Overlay'
import ModalPanel from 'Modal/ModalPanel'
import { Checkout3DSModal } from '../Checkout3DSModal'

import css from '../Checkout3DSModal.module.css'

describe('Checkout3DSModal', () => {
  let wrapper
  let instance
  const challengeURL = 'https://bank.uk/3dschallenge'
  const successURL = 'https://gousto.co.uk/payment_success'
  const failureURL = 'https://gousto.co.uk/payment_failure'
  const onChallengeDone = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Checkout3DSModal isOpen challengeURL={challengeURL} onChallengeDone={onChallengeDone} />
    )
    instance = wrapper.instance()
  })

  afterEach(() => {
    onChallengeDone.mockClear()
  })

  describe('when rendered but not open', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Checkout3DSModal
          isOpen={false}
          challengeURL={challengeURL}
          onChallengeDone={onChallengeDone}
        />
      )
    })

    test('should render hidden Overlay', () => {
      const overlay = wrapper.find(Overlay)

      expect(overlay.prop('open')).toBe(false)
    })

    test('should not render iframe', () => {
      expect(wrapper.find('iframe').exists()).toBe(false)
    })
  })

  describe('when rendered and open', () => {
    test('should render Overlay', () => {
      const overlay = wrapper.find(Overlay)

      expect(overlay.prop('open')).toBe(true)
      expect(overlay.prop('from')).toBe('top')
    })

    test('should render ModalPanel', () => {
      const panel = wrapper.find(ModalPanel)

      expect(panel.prop('className')).toBe(css.modal)
      expect(panel.prop('containerClassName')).toBe(css.modalContainer)
      expect(panel.prop('disableOverlay')).toBe(true)
      expect(panel.prop('disableClickOutside')).toBe(true)
      expect(panel.prop('showCloseButton')).toBe(false)
    })

    test('should render iframe', () => {
      const header = wrapper.find('h4')

      expect(header.text()).toBe('Card verification')
      expect(header.hasClass(css.heading)).toBe(true)
    })

    test('should render iframe', () => {
      const iframe = wrapper.find('iframe')

      expect(iframe.prop('src')).toBe(challengeURL)
      expect(iframe.prop('onLoad')).toBe(wrapper.instance().onIframeLoad)
      expect(iframe.hasClass(css.frame)).toBe(true)
    })
  })

  describe('when iframe content loaded and it is on gousto.co.uk domain', () => {
    const loadEvent = {
      target: {
        contentWindow: {
          location: {
            href: successURL,
          },
        },
      },
    }

    beforeEach(() => {
      instance.onFrameUrlChange = jest.fn()
    })

    test('should get current frame url and trigger url change event', () => {
      instance.onIframeLoad(loadEvent)

      expect(instance.onFrameUrlChange).toHaveBeenCalledWith(successURL)
    })
  })

  describe('when iframe content loaded and it is not on gousto.co.uk domain', () => {
    const loadEvent = {
      target: {
        contentWindow: {
          location: {
            href: '',
          },
        },
      },
    }

    beforeEach(() => {
      instance.onFrameUrlChange = jest.fn()

      Object.defineProperty(loadEvent.target.contentWindow.location, 'href', {
        get: () => {
          throw Error(
            'Blocked a frame with origin "https://frontend.gousto.local" from accessing a cross-origin frame.'
          )
        },
      })
    })

    test('should not trigger url change event', () => {
      instance.onIframeLoad(loadEvent)

      expect(instance.onFrameUrlChange).not.toHaveBeenCalled()
    })
  })

  describe('when success page is loaded within iframe', () => {
    describe('and contains session id', () => {
      test('should trigger onChallengeDone() callback', () => {
        const sessionId = 'sid_ubfj2q76miwundwlk72vxt2i7q'
        const url = `${successURL}?cko-session-id=${sessionId}`

        instance.onFrameUrlChange(url)

        expect(onChallengeDone).toHaveBeenCalledWith(sessionId)
      })
    })

    describe('but does not contain session id', () => {
      test('should not trigger onChallengeDone() callback', () => {
        instance.onFrameUrlChange(successURL)

        expect(onChallengeDone).not.toHaveBeenCalled()
      })
    })
  })

  describe('when failure page is loaded within iframe', () => {
    describe('and contains session id', () => {
      test('should trigger onChallengeDone() callback', () => {
        const sessionId = 'sid_ubfj2q76miwundwlk72vxt2i7q'
        const url = `${failureURL}?cko-session-id=${sessionId}`

        instance.onFrameUrlChange(url)

        expect(onChallengeDone).toHaveBeenCalledWith(sessionId)
      })
    })

    describe('but does not contain session id', () => {
      test('should not trigger onChallengeDone() callback', () => {
        instance.onFrameUrlChange(failureURL)

        expect(onChallengeDone).not.toHaveBeenCalled()
      })
    })
  })
})
