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
import { useUpdateSubscription } from '../../../../../hooks/useUpdateSubscription'
import * as trackingSubscription from '../../../../../tracking'
import * as subscriptionToast from '../../../../../hooks/useSubscriptionToast'
import { ToastProvider } from '../../../../../components/Toast'

jest.mock('../../../../../tracking')
jest.mock('../../../../../context/selectors/subscription')
jest.mock('../../../../../context/selectors/deliveries')
jest.mock('../../../../../hooks/useUpdateSubscription')

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

// eslint-disable-next-line
const ContextProviders = ({ children }) => (
  <SubscriptionContext.Provider value={{ state: {}, dispatch: 'MOCK_DISPATCH' }}>
    <ToastProvider>
      {children}
    </ToastProvider>
  </SubscriptionContext.Provider>
)

const mountWithProps = (props) => {
  wrapper = mount(
    <DeliveryDayAndTime accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: ContextProviders,
    }
  )

  wrapper.update()
}

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
  const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')
  const useSubscriptionToastSpy = jest.spyOn(subscriptionToast, 'useSubscriptionToast')

  beforeEach(() => {
    jest.resetAllMocks()
    trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getAreDeliveriesLoaded.mockReturnValue(false)
      getIsSubscriptionLoaded.mockReturnValue(false)
      getCurrentDeliverySlot.mockReturnValue({})
      getDeliverySlots.mockReturnValue([])
      useUpdateSubscription.mockReturnValue([])

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
      useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])

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

      test('Then the trackSubscriptionSettingsChange is called', () => {
        expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
          action: 'update_success', settingName: 'delivery_date'
        })
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
            describe('And the update is successful', () => {
              beforeEach(() => {
                useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])
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

              test('Then the trackSubscriptionSettingsChange is called with delivery_date_update', () => {
                expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
                  action: 'update', settingName: 'delivery_date'
                })
              })

              describe('And the update is a success', () => {
                beforeEach(() => {
                  useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])
                })

                test('Then the trackSubscriptionSettingsChange is called with delivery_date_update_success', () => {
                  expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
                    action: 'update_success', settingName: 'delivery_date'
                  })
                })

                test('Then useSubscriptionToast is invoked', () => {
                  expect(useSubscriptionToastSpy).toHaveBeenCalledWith({ data: '123' }, false)
                })
              })
            })

            describe('And the update is returning error', () => {
              beforeEach(() => {
                useUpdateSubscription.mockReturnValue([false, undefined, true])
                act(() => {
                  wrapper
                    .find('[data-testing="delivery-day-and-time-save-cta"]')
                    .simulate('click')
                })

                wrapper.update()
              })

              test('Then the trackSubscriptionSettingsChange is called with delivery_date_update_error', () => {
                expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
                  action: 'update_error', settingName: 'delivery_date'
                })
              })
            })
          })
        })
      })
    })
  })
})
