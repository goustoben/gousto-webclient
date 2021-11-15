import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { SubscriptionContext } from '../../../../../context/index'
import { MealsPerBox } from '../MealsPerBox'

import { getMealsPerBox, getIsBoxAndPricesLoaded, getDietaryPreference, getBoxPricesNumPortion } from '../../../../../context/selectors/box'
import { useUpdateSubscription } from '../../../../../apis/hooks/useUpdateSubscription'
import * as trackingSubscription from '../../../../../tracking'
import * as subscriptionToast from '../../../../../apis/hooks/useSubscriptionToast'

jest.mock('../../../../../tracking')
jest.mock('../../../../../context/selectors/box')
jest.mock('../../../../../hooks/useUpdateSubscription')

const useSubscriptionToastSpy = jest.spyOn(subscriptionToast, 'useSubscriptionToast')
const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(
    <MealsPerBox accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state: {}, dispatch: 'MOCK_DISPATCH' } }
    }
  )

  wrapper.update()
}

const clickEdit = () => {
  act(() => {
    wrapper
      .find('[data-testing="meals-per-box-cta"]')
      .simulate('click')
  })

  wrapper.update()
}

const mockMealsPerBox = '2'
const mockDietaryPreference = 'vegetarian'
const mockBoxPricesNumPortion = {
  2: {
    vegetarian: {
      pricePerPortionDiscounted: '3.99'
    }
  },
  3: {
    vegetarian: {
      pricePerPortionDiscounted: '3.49'
    }
  },
  4: {
    vegetarian: {
      pricePerPortionDiscounted: '2.99'
    }
  }
}

const EXPECTED_RADIOS = ['2 meals (£3.99 per serving)', '3 meals (£3.49 per serving)', '4 meals (£2.99 per serving)']

describe('MealsPerBox', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getIsBoxAndPricesLoaded.mockReturnValue(false)
      useUpdateSubscription.mockReturnValue([])
      getMealsPerBox.mockReturnValue(undefined)
      getBoxPricesNumPortion.mockReturnValue(undefined)
      getDietaryPreference.mockReturnValue(undefined)

      mountWithProps()
    })

    describe('And I browse on a mobile device', () => {
      beforeEach(() => {
        mountWithProps({ isMobile: true })
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
      })
    })

    describe('And I don\'t browse on a mobile device', () => {
      describe('And I click "edit"', () => {
        beforeEach(() => {
          clickEdit()
        })

        test('Then I should not see the expanded text', () => {
          expect(
            wrapper
              .find('[data-testing="expanded-text"]')
              .exists()
          ).toBeFalsy()
        })

        test('Then the Radios are not rendered', () => {
          expect(wrapper.find('RadioGroup').exists()).toBeFalsy()
        })
      })
    })
  })

  describe('Given data is loaded', () => {
    beforeEach(() => {
      getIsBoxAndPricesLoaded.mockReturnValue(true)
      useUpdateSubscription.mockReturnValue([false, true, false])
      getMealsPerBox.mockReturnValue(mockMealsPerBox)
      getBoxPricesNumPortion.mockReturnValue(mockBoxPricesNumPortion)
      getDietaryPreference.mockReturnValue(mockDietaryPreference)

      mountWithProps()
    })

    test('Then I should see the meals per box', () => {
      expect.assertions(1)

      expect(
        wrapper
          .find('[data-testing="current-meals-per-box"]')
          .text()
      ).toEqual('2 meals (£3.99 per serving)')
    })

    describe('And I click "edit"', () => {
      beforeEach(() => {
        act(() => {
          clickEdit()
        })
      })

      test('Then the CTA should be disabled by default', () => {
        expect(
          wrapper
            .find('[data-testing="meals-per-box-save-cta"]')
            .prop('disabled')
        ).toBeTruthy()
      })

      test('Then I can see the current selected radio', () => {
        const selectedRadioText = wrapper.find('.inputRadioLabelChecked').text()

        expect(selectedRadioText).toEqual('2 meals (£3.99 per serving)')
      })

      test('Then the expected Radios are rendered', () => {
        expect.assertions(EXPECTED_RADIOS.length)

        const renderedRadios = wrapper.find('[data-testing="meals-per-box-radios"] label')

        renderedRadios.forEach((radio, idx) => {
          const expectedText = EXPECTED_RADIOS[idx]

          expect(radio.text()).toEqual(expectedText)
        })
      })

      describe('And I select a Radio', () => {
        beforeEach(() => {
          act(() => {
            wrapper
              .find('RadioGroup')
              .simulate('change', {
                target: {
                  value: '4'
                }
              })
          })

          wrapper.update()
        })

        describe('And I click "Save meals per box"', () => {
          describe('And the update is successful', () => {
            beforeEach(() => {
              useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])
              act(() => {
                wrapper
                  .find('[data-testing="meals-per-box-save-cta"]')
                  .simulate('click')
              })

              wrapper.update()
            })

            test('Then useUpdateSubscription should be invoked', () => {
              const mockCalls = useUpdateSubscription.mock.calls
              const [lastMockArgs] = mockCalls[mockCalls.length - 1]

              expect(lastMockArgs.data).toEqual({
                num_recipes: '4'
              })

              expect(lastMockArgs.trigger.shouldRequest).toBeTruthy()
            })

            test('Then the trackSubscriptionSettingsChange is invoked as expected', () => {
              expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
                action: 'update', settingName: 'meals_per_box'
              })
            })

            describe('And the update is a successful', () => {
              beforeEach(() => {
                useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])
              })

              test('Then useSubscriptionToast is invoked', () => {
                expect(useSubscriptionToastSpy).toHaveBeenCalledWith({ data: '123' }, false)
              })
            })
          })

          describe('And the update errors', () => {
            beforeEach(() => {
              useUpdateSubscription.mockReturnValue([false, false, true])
              act(() => {
                wrapper
                  .find('[data-testing="meals-per-box-save-cta"]')
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
})
