import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'
import { frequencyMapping, frequencyMappingC } from '../../../../../enum/frequency'

import { SubscriptionContext } from '../../../../../context/index'
import { Frequency } from '../Frequency'

import { getIsSubscriptionLoaded } from '../../../../../context/selectors/subscription'
import {
  getDeliveryFrequency
} from '../../../../../context/selectors/deliveries'
import {
  getOpenOrders
} from '../../../../../context/selectors/orders'
import { useUpdateSubscription } from '../../../../../hooks/useUpdateSubscription'
import * as trackingSubscription from '../../../../../tracking'
import * as subscriptionToast from '../../../../../hooks/useSubscriptionToast'

jest.mock('../../../../../tracking')
jest.mock('../../../../../context/selectors/subscription')
jest.mock('../../../../../context/selectors/deliveries')
jest.mock('../../../../../context/selectors/orders')
jest.mock('../../../../../hooks/useUpdateSubscription')

const mockDispatch = jest.fn()

jest.mock('react', () => ({
  ...jest.requireActual('react'),
}))

let wrapper

const getOptionByProp = (propName, value) => wrapper.findWhere(
  el => el.prop(propName) === value
)

const mountWithProps = (props, state = {}) => {
  wrapper = mount(
    <Frequency accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state, dispatch: mockDispatch } }
    }
  )

  wrapper.update()
}

const clickEdit = () => {
  act(() => {
    wrapper
      .find('[data-testing="box-frequency-cta"]')
      .simulate('click')
  })

  wrapper.update()
}

describe('Frequency', () => {
  const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')
  const trackWeeklyFrequencyVariantSpy = jest.spyOn(trackingSubscription, 'trackWeeklyFrequencyVariant')
  const useSubscriptionToastSpy = jest.spyOn(subscriptionToast, 'useSubscriptionToast')

  beforeEach(() => {
    jest.resetAllMocks()
    trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
    useUpdateSubscription.mockReturnValue([undefined, undefined, undefined])
    getOpenOrders.mockReturnValue([])
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getIsSubscriptionLoaded.mockReturnValue(false)
      getDeliveryFrequency.mockReturnValue('1')
      useUpdateSubscription.mockReturnValue([])

      mountWithProps()
    })

    describe('And I click "edit"', () => {
      beforeEach(() => {
        clickEdit()
      })

      test('Then the RadioGroup is not rendered', () => {
        expect(wrapper.find('RadioGroup').exists()).toBeFalsy()
      })
    })
  })

  describe('Given data is loaded with a user not in the frequency variation range', () => {
    beforeEach(() => {
      getIsSubscriptionLoaded.mockReturnValue(true)
      getDeliveryFrequency.mockReturnValue('1')

      mountWithProps({}, { currentUser: { id: '12345' } })
    })

    test('Then I should see the frequency', () => {
      expect(
        wrapper
          .find('[data-testing="current-frequency"]')
          .text()
      ).toEqual('Weekly')
    })

    test('And trackWeeklyFrequencyVariantSpy should not be called', () => {
      expect(trackWeeklyFrequencyVariantSpy).not.toHaveBeenCalled()
    })

    describe('And I click "edit"', () => {
      beforeEach(() => {
        act(() => {
          clickEdit()
        })
      })

      test('Then the RadioGroup is rendered as expected', () => {
        expect(wrapper.find('RadioGroup').exists()).toBeTruthy()
      })

      test('Then the trackSubscriptionSettingsChange is called', () => {
        expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
          action: 'edit', settingName: 'box_frequency'
        })
      })

      test('Then the CTA should be disabled by default', () => {
        expect(
          wrapper
            .find('[data-testing="box-frequency-save-cta"]')
            .prop('disabled')
        ).toBeTruthy()
      })

      test('Then the expected options are rendered', () => {
        expect.assertions(Object.keys(frequencyMapping).length)

        const renderedOptions = wrapper.find('InputRadio[name="box_frequency"]')

        renderedOptions.forEach((option) => {
          const expectedText = frequencyMapping[option.prop('value')]

          expect(option.text()).toEqual(expectedText)
        })
      })

      test('Then I can see the current selected option', () => {
        expect(
          getOptionByProp('isChecked', true).text()
        ).toEqual('Weekly')
      })

      describe('And I select an option', () => {
        beforeEach(() => {
          act(() => {
            const selectedElement = getOptionByProp('isChecked', false).at(0)
            selectedElement.simulate('change', {
              target: {
                value: selectedElement.prop('value')
              }
            })
          })

          wrapper.update()
        })

        describe('And I click "Save frequency"', () => {
          describe('And the update is successful', () => {
            beforeEach(() => {
              useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])

              act(() => {
                wrapper
                  .find('[data-testing="box-frequency-save-cta"]')
                  .simulate('click')
              })

              wrapper.update()
            })

            test('Then useUpdateSubscription should be invoked', () => {
              const mockCalls = useUpdateSubscription.mock.calls
              const [lastMockArgs] = mockCalls[mockCalls.length - 1]

              expect(lastMockArgs.data).toEqual({
                interval: '2'
              })

              expect(lastMockArgs.trigger.shouldRequest).toBeTruthy()
            })

            test('Then the trackSubscriptionSettingsChange is called with box_frequency_update', () => {
              expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
                action: 'update', settingName: 'box_frequency'
              })
            })

            describe('And the update is a success', () => {
              test('Then useSubscriptionToast is invoked', () => {
                expect(useSubscriptionToastSpy).toHaveBeenCalledWith({ data: '123' }, false)
              })
            })
          })

          describe('And the update is returning error', () => {
            beforeEach(() => {
              useUpdateSubscription.mockReturnValue([false, false, true])

              act(() => {
                wrapper
                  .find('[data-testing="box-frequency-save-cta"]')
                  .simulate('click')
              })

              wrapper.update()
            })

            test('Then useSubscriptionToast is invoked', () => {
              expect(useSubscriptionToastSpy).toHaveBeenCalledWith(false, true)
            })
          })
        })
      })
    })
  })

  describe('Given data is loaded with a user in the frequency variation range', () => {
    beforeEach(() => {
      getIsSubscriptionLoaded.mockReturnValue(true)
      getDeliveryFrequency.mockReturnValue('1')

      mountWithProps({}, { currentUser: { id: '99999999998' } })
    })

    test('Then trackWeeklyFrequencyVariantSpy should be called', () => {
      expect(trackWeeklyFrequencyVariantSpy).toHaveBeenCalledWith({
        variation: 'C',
      })
    })

    test('And the expected options are rendered', () => {
      expect.assertions(Object.keys(frequencyMappingC).length)

      const renderedOptions = wrapper.find('InputRadio[name="box_frequency"]')

      renderedOptions.forEach((option) => {
        const expectedText = frequencyMappingC[option.prop('value')]

        expect(option.text()).toEqual(expectedText)
      })
    })
  })
})
