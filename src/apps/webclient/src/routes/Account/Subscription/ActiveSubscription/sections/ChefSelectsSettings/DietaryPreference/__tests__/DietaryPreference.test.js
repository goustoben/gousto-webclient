import React from 'react'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import { SubscriptionContext } from '../../../../../context/index'
import { DietaryPreference } from '../DietaryPreference'

import { getDietaryPreference, getIsBoxLoaded } from '../../../../../context/selectors/box'
import { useUpdateSubscription } from '../../../../../hooks/useUpdateSubscription'
import * as trackingSubscription from '../../../../../tracking'
import * as subscriptionToast from '../../../../../hooks/useSubscriptionToast'

jest.mock('../../../../../tracking')
jest.mock('../../../../../context/selectors/box')
jest.mock('../../../../../hooks/useUpdateSubscription')

const useSubscriptionToastSpy = jest.spyOn(subscriptionToast, 'useSubscriptionToast')
const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')

let wrapper

const mountWithProps = (props) => {
  wrapper = mount(
    <DietaryPreference accessToken="foo" isMobile={false} {...props} />,
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
      .find('[data-testing="dietary-preference-cta"]')
      .simulate('click')
  })

  wrapper.update()
}

const mockDietaryPrefernce = 'gourmet'

const EXPECTED_RADIOS = ['No dietary preference', 'Vegetarian']

describe('DietaryPreference', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getIsBoxLoaded.mockReturnValue(false)
      useUpdateSubscription.mockReturnValue([])
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
      getIsBoxLoaded.mockReturnValue(true)
      useUpdateSubscription.mockReturnValue([false, true, false])
      getDietaryPreference.mockReturnValue(mockDietaryPrefernce)

      mountWithProps()
    })

    test('Then I should see the dietary preference', () => {
      expect.assertions(1)

      expect(
        wrapper
          .find('[data-testing="current-dietary-preference"]')
          .text()
      ).toEqual('No dietary preference')
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
            .find('[data-testing="dietary-preference-save-cta"]')
            .prop('disabled')
        ).toBeTruthy()
      })

      test('Then I can see the current selected radio', () => {
        const selectedRadioText = wrapper.find('.inputRadioLabelChecked').text()

        expect(selectedRadioText).toEqual('No dietary preference')
      })

      test('Then the expected Radios are rendered', () => {
        expect.assertions(EXPECTED_RADIOS.length)

        const renderedRadios = wrapper.find('[data-testing="dietary-preference-radios"] label')

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
                  value: 'vegetarian'
                }
              })
          })

          wrapper.update()
        })

        describe('And I click "Save dietary preference"', () => {
          describe('And the update is successful', () => {
            beforeEach(() => {
              useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])
              act(() => {
                wrapper
                  .find('[data-testing="dietary-preference-save-cta"]')
                  .simulate('click')
              })

              wrapper.update()
            })

            test('Then useUpdateSubscription should be invoked', () => {
              const mockCalls = useUpdateSubscription.mock.calls
              const [lastMockArgs] = mockCalls[mockCalls.length - 1]

              expect(lastMockArgs.data).toEqual({
                box_type: 'vegetarian'
              })

              expect(lastMockArgs.trigger.shouldRequest).toBeTruthy()
            })

            test('Then the trackSubscriptionSettingsChange is invoked as expected', () => {
              expect(trackSubscriptionSettingsChangeSpy).toHaveBeenCalledWith({
                action: 'update', settingName: 'dietary_preference'
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
                  .find('[data-testing="dietary-preference-save-cta"]')
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
