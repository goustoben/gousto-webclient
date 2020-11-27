import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { SubscriptionContext } from '../../../../../context/index'
import { DeliveryDayAndTime } from '../DeliveryDayAndTime'

import { getIsSubscriptionLoaded } from '../../../../../context/selectors/subscription'
import {
  getAreDeliveriesLoaded,
  getCurrentDeliverySlot,
  getDeliverySlots
} from '../../../../../context/selectors/deliveries'
import { useUpdateSubscription } from '../../../../../hooks/useUpdateSubscription.js'

const mockCurrentDeliverySlot = {
  coreSlotId: '1',
  day: 'Monday',
  timeRange: '9am - 7pm'
}

const mockSlots = [
  mockCurrentDeliverySlot,
  {
    coreSlotId: '2',
    day: 'Tuesday',
    timeRange: '10am - 12pm'
  }
]

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(
    <DeliveryDayAndTime accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state: {}, dispatch: 'MOCK_DISPATCH' } }
    }
  )

  wrapper.update()
}

jest.mock('../../../../../context/selectors/subscription')
jest.mock('../../../../../context/selectors/deliveries')
jest.mock('../../../../../hooks/useUpdateSubscription.js')

const clickEdit = () => {
  act(() => {
    wrapper
      .find('[data-testing="delivery-day-and-time-cta"]')
      .simulate('click')
  })

  wrapper.update()
}

const getOptionByProp = (propName, value) => wrapper.findWhere(
  el => el.prop(propName) === value
)

describe('DeliveryDayAndTime', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getAreDeliveriesLoaded.mockReturnValue(false)
      getIsSubscriptionLoaded.mockReturnValue(false)
      getCurrentDeliverySlot.mockReturnValue({})
      getDeliverySlots.mockReturnValue([])

      mountWithProps()
    })

    describe('And I click "edit"', () => {
      beforeEach(() => {
        clickEdit()
      })

      test('Then I should see the expanded text', () => {
        expect(
          wrapper
            .find('[data-testing="expanded-text"]')
            .exists()
        ).toBeTruthy()
      })

      test('Then the dropdown is not rendered', () => {
        expect(wrapper.find('Dropdown').exists()).toBeFalsy()
      })
    })
  })

  describe('Given data is loaded', () => {
    beforeEach(() => {
      getAreDeliveriesLoaded.mockReturnValue(true)
      getIsSubscriptionLoaded.mockReturnValue(true)
      getCurrentDeliverySlot.mockReturnValue(mockCurrentDeliverySlot)
      getDeliverySlots.mockReturnValue(mockSlots)

      mountWithProps()
    })

    test('Then I should see the subscription day and time', () => {
      expect.assertions(2)

      expect(
        wrapper
          .find('[data-testing="current-delivery-day"]')
          .text()
      ).toEqual(mockCurrentDeliverySlot.day)

      expect(
        wrapper
          .find('[data-testing="current-delivery-time"]')
          .text()
      ).toEqual(mockCurrentDeliverySlot.timeRange)
    })

    describe('And I click "edit"', () => {
      beforeEach(() => {
        act(() => {
          clickEdit()
        })
      })

      test('Then the dropdown is rendered as expected', () => {
        expect(
          wrapper
            .find('[data-testing="delivery-day-and-time-toggle"]')
            .text()
        ).toEqual(`${mockCurrentDeliverySlot.day} ${mockCurrentDeliverySlot.timeRange}`)
      })

      describe('When I expand the dropdown', () => {
        beforeEach(() => {
          act(() => {
            wrapper
              .find('[data-testing="delivery-day-and-time-toggle"]')
              .simulate('click')
          })

          wrapper.update()
        })

        test('Then the CTA should be disabled by default', () => {
          expect(
            wrapper
              .find('[data-testing="delivery-day-and-time-save-cta"]')
              .prop('disabled')
          ).toBeTruthy()
        })

        test('Then the expected options are rendered', () => {
          expect.assertions(mockSlots.length)

          const renderedOptions = wrapper.find('[data-testing="delivery-day-and-time-options"] li')

          renderedOptions.forEach((option, idx) => {
            const expectedText = `${mockSlots[idx].day} ${mockSlots[idx].timeRange}`

            expect(option.text()).toEqual(expectedText)
          })
        })

        test('Then I can see the current selected option', () => {
          expect(
            getOptionByProp('aria-selected', true).text()
          ).toEqual(`${mockCurrentDeliverySlot.day} ${mockCurrentDeliverySlot.timeRange}`)
        })

        describe('And I select an option', () => {
          beforeEach(() => {
            act(() => {
              getOptionByProp('aria-selected', false).simulate('click')
            })

            wrapper.update()
          })

          describe('And I click "Save day and Time"', () => {
            beforeEach(() => {
              act(() => {
                wrapper
                  .find('[data-testing="delivery-day-and-time-save-cta"]')
                  .simulate('click')
              })

              wrapper.update()
            })

            test('Then useUpdateSubscription should be invoked', () => {
              const mockCalls = useUpdateSubscription.mock.calls
              const [lastMockArgs] = mockCalls[mockCalls.length - 1]

              expect(lastMockArgs.data).toEqual({
                delivery_slot_id: '2'
              })

              expect(lastMockArgs.trigger.shouldRequest).toBeTruthy()
            })
          })
        })
      })
    })
  })
})
