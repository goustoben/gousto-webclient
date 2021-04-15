import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { SubscriptionContext } from '../../../../context'
import { Resubscribe } from '../Resubscribe'
import { useFetch } from '../../../../../../../hooks/useFetch'
import { trackSubscriptionSettingsChange } from '../../../../tracking'

import { flushPromises } from '../../../../../../../_testing/utils'

let wrapper

const mockDispatch = jest.fn()

const mountWithPropsAndState = (props, state = {}) => {
  wrapper = mount(
    <Resubscribe accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state, dispatch: mockDispatch } }
    }
  )

  wrapper.update()
}

jest.mock('../../../../../../../hooks/useFetch')
jest.mock('../../../../tracking')
jest.mock('config/endpoint', () => () => 'localhost')

const mockSuccessfulResponse = { status: 'ok', result: { data: 'SUCCESS' } }
const mockErrorResponse = { status: 'ok', result: { data: 'ERROR' } }

describe('Resubscribe', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    trackSubscriptionSettingsChange.mockReturnValue(() => {})
    useFetch.mockReturnValue([])
    mountWithPropsAndState()
  })

  describe('When I click the Resubscribe CTA', () => {
    beforeEach(async () => {
      useFetch.mockReturnValue([false, mockSuccessfulResponse, false])

      mountWithPropsAndState()

      await act(async () => {
        wrapper
          .find('[data-testing="resubscribe-cta"]')
          .simulate('click')

        // Have to wait for setTimeout on dispatch to complete
        // Required to avoid setting state on unmounted component
        await flushPromises()
      })

      wrapper.update()
    })

    describe('And the isNewSubscriptionApiEnabled flag is set to true', () => {
      beforeEach(async () => {
        mountWithPropsAndState({}, { currentUser: { id: '12345' }, isNewSubscriptionApiEnabled: true })
      })
      test('Then useFetch is invoked as expected', () => {
        expect(useFetch).toHaveBeenCalledWith(
          expect.objectContaining({
            url: 'localhost/subscriptions/12345/activate',
            needsAuthorization: true,
            accessToken: 'foo',
            options: {
              method: 'POST',
            },
          })
        )
      })
    })

    describe('And the isNewSubscriptionApiEnabled flag is set to false', () => {
      beforeEach(async () => {
        mountWithPropsAndState({}, { isNewSubscriptionApiEnabled: false })
      })
      test('Then useFetch is invoked as expected', () => {
        expect(useFetch).toHaveBeenCalledWith(
          expect.objectContaining({
            url: 'localhost/user/current/subscription/activate',
            needsAuthorization: true,
            accessToken: 'foo',
            options: {
              method: 'PUT',
            },
          })
        )
      })
    })

    describe('And the request is successful', () => {
      test('Then the expected action is dispatched', () => {
        expect(mockDispatch).toHaveBeenCalledWith({
          data: 'SUCCESS',
          type: 'SUBSCRIPTION_STATUS_UPDATE_RECEIVED'
        })
      })
    })

    describe('And the request is unsuccessful', () => {
      beforeEach(async () => {
        useFetch.mockReturnValue([false, mockErrorResponse, false])

        mountWithPropsAndState()

        await act(async () => {
          wrapper
            .find('[data-testing="resubscribe-cta"]')
            .simulate('click')

          await flushPromises()
        })

        wrapper.update()
      })

      test('Then the expected action is dispatched', () => {
        expect(mockDispatch).toHaveBeenCalledWith({
          data: 'ERROR',
          type: 'SUBSCRIPTION_STATUS_UPDATE_RECEIVED'
        })
      })
    })
  })

  describe('When subscriber pricing is enabled', () => {
    beforeEach(async () => {
      useFetch.mockReturnValue([false, mockSuccessfulResponse, false])

      mountWithPropsAndState(null, { isSubscriberPricingEnabled: true })
    })

    test('Then sectionSubTitle has the correct values', () => {
      const content = wrapper.find('.sectionSubTitle').text()

      expect(content).toEqual('Restart your subscription today!')
    })

    test('Then bottomContent is rendered and has the correct values', () => {
      const content = wrapper.find('.bottomContent').text()

      expect(content).toEqual('And you can edit your settings any time after you\'ve restarted.')
    })

    test('Then the CTA has the correct values', () => {
      const content = wrapper.find('[data-testing="resubscribe-cta"]').text()

      expect(content).toEqual('Restart my subscription')
    })

    describe('When the user resubscribes', () => {
      beforeEach(async () => {
        await act(async () => {
          wrapper
            .find('[data-testing="resubscribe-cta"]')
            .simulate('click')

          // Have to wait for setTimeout on dispatch to complete
          // Required to avoid setting state on unmounted component
          await flushPromises()
        })

        wrapper.update()
      })

      test('Then trackSubscriptionSettingsChange is invoked as expected', () => {
        expect(trackSubscriptionSettingsChange).toHaveBeenCalledWith({
          action: 'reactivate_subscription',
          settingName: 'click'
        })
      })
    })
  })

  describe('When subscriber pricing is not enabled', () => {
    beforeEach(async () => {
      useFetch.mockReturnValue([false, mockSuccessfulResponse, false])

      mountWithPropsAndState(null, { isSubscriberPricingEnabled: false })
    })

    test('Then sectionSubTitle has the correct values', () => {
      const content = wrapper.find('.sectionSubTitle').text()

      expect(content).toEqual('Want to easily recieve Weekly, Fortnightly or Monthly boxes, bursting full of flavourful recipes? Reactivate below.')
    })

    test('Then the CTA has the correct values', () => {
      const content = wrapper.find('[data-testing="resubscribe-cta"]').text()

      expect(content).toEqual('Reactivate subscription')
    })
  })
})
