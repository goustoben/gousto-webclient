import React from 'react'
import { mount } from 'enzyme'

import { SubscriptionTitle } from '../SubscriptionTitle'
import { SubscriptionContext } from '../../../context'
import {
  getFirstName,
  getIsCurrentUserLoaded
} from '../../../context/selectors/currentUser'
import {
  getIsSubscriptionLoaded,
  getIsSubscriptionActive
} from '../../../context/selectors/subscription'
import {
  getAreDeliveriesLoaded,
  getCurrentDeliverySlot
} from '../../../context/selectors/deliveries'

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(
    <SubscriptionTitle {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state: {}, dispatch: 'MOCK_DISPATCH' } }
    }
  )

  wrapper.update()
}

jest.mock('../../../context/selectors/currentUser.js')
jest.mock('../../../context/selectors/subscription.js')
jest.mock('../../../context/selectors/deliveries.js')

describe('SubscriptionTitle', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getIsCurrentUserLoaded.mockReturnValue(false)
      getIsSubscriptionLoaded.mockReturnValue(false)
      getAreDeliveriesLoaded.mockReturnValue(false)

      getFirstName.mockReturnValue(undefined)
      getCurrentDeliverySlot.mockReturnValue({})

      mountWithProps()
    })

    test('Then I should not see the subtitle', () => {
      expect(
        wrapper.find('[data-testing="subtitle"]').exists()
      ).toEqual(false)
    })
  })

  describe('Given data is loaded', () => {
    beforeEach(() => {
      getIsCurrentUserLoaded.mockReturnValue(true)
      getIsSubscriptionLoaded.mockReturnValue(true)
      getAreDeliveriesLoaded.mockReturnValue(true)

      getFirstName.mockReturnValue('Barry')
      getCurrentDeliverySlot.mockReturnValue({ cutoffDay: 1, cutoffTime: '11:59:59' })

      mountWithProps()
    })

    describe('And the subscription is active', () => {
      beforeEach(() => {
        getIsSubscriptionActive.mockReturnValue(true)

        mountWithProps()
      })

      test('Then I should see the active subscription text', () => {
        expect(
          wrapper
            .find('[data-testing="subscription-status"]')
            .text()
        ).toEqual('active')
      })

      test('Then I should see the expected cutoff time and day', () => {
        expect(
          wrapper
            .find('[data-testing="cutoff"]')
            .text()
        ).toEqual('. You have until noon on Monday to make your recipe choices or skip a delivery.')
      })
    })

    describe('And the subscription is inactive', () => {
      beforeEach(() => {
        getIsSubscriptionActive.mockReturnValue(false)

        mountWithProps()
      })

      test('Then I should see the active subscription text', () => {
        expect(
          wrapper
            .find('[data-testing="subscription-status"]')
            .text()
        ).toEqual('inactive')
      })
    })

    test('Then I should see the expected first name', () => {
      expect(
        wrapper
          .find('[data-testing="first-name"]')
          .text()
      ).toEqual('Barry')
    })

    test('Then I should not see the cutoff time and day', () => {
      expect(
        wrapper
          .find('[data-testing="cutoff"]')
          .exists()
      ).toBeFalsy()
    })
  })
})
