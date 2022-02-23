import React from 'react'
import { mount } from 'enzyme'
import { get, set } from 'utils/cookieHelper2'
import { canUseWindow } from 'utils/browserEnvironment'
import { redirect } from 'utils/window'
import { AppModal } from '../AppModal'

const mockProps = {
  name: 'iOS',
  ratings: '60000',
  isMobileViewport: true,
  boxSummaryDismissed: true,
  isBoxSummaryVisible: false,
  isAppAwarenessEnabled: true,
  isAuthenticated: true,
  trackAppModalView: jest.fn(),
  trackClickAppModalInstall: jest.fn(),
}

jest.mock('utils/cookieHelper2')
jest.mock('utils/GoustoCookies', () => 'mock-gousto-cookies')
jest.mock('utils/window')
jest.mock('utils/browserEnvironment')
jest.useFakeTimers()

let wrapper

const mountWithMockTimers = (props = {}) => {
  wrapper = mount(<AppModal {...mockProps} {...props} />)
  jest.runOnlyPendingTimers()
  wrapper.update()
}

describe('AppModal', () => {
  beforeEach(() => {
    canUseWindow.mockReturnValue(true)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('view logic', () => {
    test('should not render immediately', () => {
      expect.assertions(1)

      wrapper = mount(<AppModal {...mockProps} />)

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })

    test('should not render if window is not available', () => {
      canUseWindow.mockReturnValue(false)

      mountWithMockTimers()

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })

    test('should render after a delay', async () => {
      expect.assertions(1)

      mountWithMockTimers()

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(true)
    })

    test('should render with new props after a delay', () => {
      expect.assertions(1)

      mountWithMockTimers({ isBoxSummaryVisible: true })

      wrapper.setProps({ isBoxSummaryVisible: false })
      jest.runOnlyPendingTimers()
      wrapper.update()
      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(true)
    })

    test('should not render if app awareness feature flag is disabled', () => {
      expect.assertions(1)

      mountWithMockTimers({ isAppAwarenessEnabled: false })

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })

    test('should not render given Box Summary modal should display', () => {
      expect.assertions(1)

      mountWithMockTimers({ isBoxSummaryVisible: true, boxSummaryDismissed: false })

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })

    test('should not render given Box Summary modal has not yet been dismissed', () => {
      expect.assertions(1)

      mountWithMockTimers({ boxSummaryDismissed: false, isBoxSummaryVisible: true })

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })

    test('should not render given viewport is not mobile', () => {
      expect.assertions(1)

      mountWithMockTimers({ isMobileViewport: false })

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })

    test('should not render given modal has been dismissed within the last 21 days', () => {
      expect.assertions(1)

      get.mockImplementationOnce(() => 123456)

      mountWithMockTimers()

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })

    test('should not render given the user is not authenticated', () => {
      expect.assertions(1)

      mountWithMockTimers({ isAuthenticated: false })

      expect(wrapper.exists('[data-testing="app-promo-modal"]')).toEqual(false)
    })
  })

  describe('event handling', () => {
    test('should invoke tracking function when modal is rendered', () => {
      expect.assertions(1)

      mountWithMockTimers()

      expect(mockProps.trackAppModalView).toHaveBeenCalled()
    })

    test('should set cookie as expected on clicking X', () => {
      expect.assertions(1)

      mountWithMockTimers()

      wrapper.find('[data-testing="modal-close-button"]').simulate('click')

      expect(set).toHaveBeenCalledWith(
        'mock-gousto-cookies',
        'cookie_app_promotion',
        'dismissed',
        true,
        21
      )
    })

    test('should redirect to app store as expected on CTA click', () => {
      expect.assertions(1)

      mountWithMockTimers()

      wrapper.find('[data-testing="download-link"]').simulate('click')

      expect(redirect).toHaveBeenCalled()
    })

    test('should invoke tracking function on CTA click', () => {
      expect(mockProps.trackClickAppModalInstall).toHaveBeenCalled()
    })
  })

  describe('cleanup', () => {
    test('should clear timeouts on unmount', () => {
      expect.assertions(1)

      const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout')

      mountWithMockTimers()

      wrapper.unmount()

      expect(clearTimeoutSpy).toHaveBeenCalledTimes(2)
    })
  })
})
