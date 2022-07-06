import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { SubscriptionContext } from '../../../../../context/index'
import { MealsPerBox } from '../MealsPerBox'

import {
  getMealsPerBox,
  getIsBoxAndPricesLoaded,
  getDietaryPreference,
  getBoxPricesNumPortion,
  getTotalBoxPriceDiscounted,
  getNumPortions,
} from '../../../../../context/selectors/box'
import { useFiveRecipeSubscriptionOption } from '../../../../../hooks/useFiveRecipeSubscriptionOption'
import { useUpdateSubscription } from '../../../../../hooks/useUpdateSubscription'
import * as trackingSubscription from '../../../../../tracking'
import * as subscriptionToast from '../../../../../hooks/useSubscriptionToast'

jest.mock('../../../../../tracking')
jest.mock('../../../../../context/selectors/box')
jest.mock('../../../../../hooks/useUpdateSubscription')
jest.mock('../../../../../hooks/useFiveRecipeSubscriptionOption')

const useSubscriptionToastSpy = jest.spyOn(subscriptionToast, 'useSubscriptionToast')
const trackSubscriptionSettingsChangeSpy = jest.spyOn(trackingSubscription, 'trackSubscriptionSettingsChange')

const mountWithProps = (props) => {
  render(
    <MealsPerBox accessToken="foo" isMobile={false} {...props} />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state: {}, dispatch: 'MOCK_DISPATCH' } }
    }
  )
}

const getCTA = () => (
  screen.getByRole('button', { name: 'Save meals per box' })
)

const clickEdit = () => {
  fireEvent.click(
    screen.getByText('Edit')
  )
}

const clickCTA = () => {
  fireEvent.click(
    getCTA()
  )
}

const mockMealsPerBox = '2'
const mockDietaryPreference = 'vegetarian'
const mockBoxPricesNumPortion = {
  2: {
    vegetarian: {
      pricePerPortionDiscounted: '3.99',
    }
  },
  3: {
    vegetarian: {
      pricePerPortionDiscounted: '3.49',
    }
  },
  4: {
    vegetarian: {
      pricePerPortionDiscounted: '2.99',
    }
  }
}

const EXPECTED_RADIOS = ['2 meals (£3.99 per serving)', '3 meals (£3.49 per serving)', '4 meals (£2.99 per serving)']

describe('MealsPerBox', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    useFiveRecipeSubscriptionOption.mockReturnValue(null)
    trackSubscriptionSettingsChangeSpy.mockReturnValue(() => { })
  })

  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getIsBoxAndPricesLoaded.mockReturnValue(false)
      useUpdateSubscription.mockReturnValue([])
      getMealsPerBox.mockReturnValue(undefined)
      getBoxPricesNumPortion.mockReturnValue(undefined)
      getDietaryPreference.mockReturnValue(undefined)
    })

    describe('And I browse on a mobile device', () => {
      beforeEach(() => {
        mountWithProps({ isMobile: true })
      })

      describe('And I click "edit"', () => {
        test('Then I should see the expanded text', () => {
          clickEdit()

          expect(
            screen.queryByText('Please select your meals per box.')
          ).toBeInTheDocument()
        })
      })
    })

    describe('And I don\'t browse on a mobile device', () => {
      beforeEach(() => {
        mountWithProps({ isMobile: false })
      })

      describe('And I click "edit"', () => {
        beforeEach(() => {
          clickEdit()
        })

        test('Then I should not see the expanded text', () => {
          expect(
            screen.queryByText('Please select your meals per box.')
          ).not.toBeInTheDocument()
        })

        test('Then the Radios are not rendered', () => {
          const renderedRadios = screen.queryAllByLabelText((content) => (
            EXPECTED_RADIOS.includes(content)
          ))

          expect(renderedRadios).toHaveLength(0)
        })
      })
    })
  })

  describe('Given data is loaded', () => {
    beforeEach(() => {
      getIsBoxAndPricesLoaded.mockReturnValue(true)
      useUpdateSubscription.mockReturnValue([false, true, false])
      getTotalBoxPriceDiscounted.mockReturnValue('30.15')
      getMealsPerBox.mockReturnValue(mockMealsPerBox)
      getBoxPricesNumPortion.mockReturnValue(mockBoxPricesNumPortion)
      getDietaryPreference.mockReturnValue(mockDietaryPreference)

      mountWithProps()
    })

    test('Then I should see the total box price', () => {
      expect(
        screen.queryByText('Recipe box price £30.15')
      ).toBeInTheDocument()
    })

    describe('And I click "edit"', () => {
      beforeEach(() => {
        clickEdit()
      })

      test('Then the CTA should be disabled by default', () => {
        const button = getCTA()

        expect(button).toHaveAttribute('disabled')
      })

      test('Then I can see the current selected radio', () => {
        const input = screen.getByLabelText('2 meals (£3.99 per serving)', { selector: 'input' })

        expect(input).toHaveAttribute('checked')
      })

      test('Then the expected Radios are rendered', () => {
        const renderedRadios = screen.getAllByLabelText((content) => (
          EXPECTED_RADIOS.includes(content)
        ))

        expect(renderedRadios).toHaveLength(EXPECTED_RADIOS.length)
      })

      describe('And I select a Radio', () => {
        beforeEach(() => {
          fireEvent.click(
            screen.getByLabelText('4 meals (£2.99 per serving)', { selector: 'input' })
          )
        })

        describe('And I click "Save meals per box"', () => {
          describe('And the update is successful', () => {
            beforeEach(() => {
              useUpdateSubscription.mockReturnValue([false, { data: '123' }, false])

              clickCTA()
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
              clickCTA()
            })

            test('Then useSubscriptionToast is invoked', () => {
              expect(useSubscriptionToastSpy).toHaveBeenCalledWith(false, true)
            })
          })
        })
      })
    })

    describe('When rockets_enable_five_recipes_subs flag is set', () => {
      test('Then 5th recipe is rendered', () => {
        getNumPortions.mockReturnValue(mockMealsPerBox)
        getBoxPricesNumPortion.mockReturnValue({
          ...mockBoxPricesNumPortion,
          5: {
            vegetarian: {
              pricePerPortionDiscounted: '5.99',
            },
          },
        })
        useFiveRecipeSubscriptionOption.mockReturnValue(true)

        mountWithProps()
        expect(screen.getByLabelText('5 meals (£5.99 per serving)')).toBeInTheDocument()
      })
    })
  })
})
