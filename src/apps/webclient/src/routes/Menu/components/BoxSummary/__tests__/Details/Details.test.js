import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { LayoutContentWrapper } from 'goustouicomponents'
import { Details } from '../../Details/Details'
import { DetailsCheckoutButton } from '../../Details/DetailsCheckoutButton'
import {useBasketRequiredFeatureEnabled} from '../../../../hooks/useBasketRequiredFeatureEnabled'

jest.mock('../../../../hooks/useBasketRequiredFeatureEnabled')
jest.mock('../../BannerButton/Checkout', () => ({
  CheckoutContainer: 'CheckoutContainer'
}))

describe('Details', () => {
  describe('render', () => {
    let wrapper
    const okRecipeIds = Immutable.fromJS({
      123: 1,
      456: 1
    })

    const props = {
      orderId: '',
      basketRecipes: Immutable.Map({}),
      numPortions: 2,
      accessToken: 'access-token',
      deliveryDays: Immutable.fromJS({
        '2019-09-05': {
          id: 'dayId',
          date: '2019-09-05',
          coreDayId: '123',
          slots: [{
            id: '12e12'
          }],
          daySlots: []
        }
      }),
      menuBoxPrices: Immutable.fromJS({
        2: {
          2: {
            gourmet: {},
          },
          3: {
            gourmet: {}
          }
        }
      }),
      promoCode: '',
      recipesStore: Immutable.fromJS({
        123: {
          id: '123',
          title: 'First recipe',
          media: {}
        },
        456: {
          id: '456',
          title: 'Second recipe',
          media: {}
        }
      }),
      okRecipeIds,
      slotId: '12e12',
      menuFetchPending: false,
      orderSaveError: '',
      pricingPending: false,
      prices: Immutable.Map(),
      unavailableRecipeIds: Immutable.Map(),
      basketNumPortionChange: () => {},
      portionSizeSelectedTracking: () => {},
      basketRestorePreviousDate: () => {},
      boxSummaryVisibilityChange: () => {},
      clearSlot: () => {},
      onRemove: () => {},
      view: 'mobile',
      checkoutBasket: () => {},
      isBasketRequiredFeatureEnabled: false
    }

    const getCheckoutButtonWrapper = () => (
      wrapper.find(LayoutContentWrapper).at(2).dive().find(DetailsCheckoutButton)
        .dive()
    )

    beforeEach(() => {
      wrapper = shallow(<Details {...props} />)
      useBasketRequiredFeatureEnabled.mockReturnValue(false)
    })

    test('should render BoxProgressAlert', () => {
      expect(wrapper.find('BoxProgressAlert').exists()).toBe(true)
    })

    test('should render DateHeader', () => {
      expect(wrapper.find('DateHeader').exists()).toBe(true)
    })

    test('user credit component is rendered', () => {
      expect(wrapper.find('Connect(UserCreditMessage)').exists()).toBe(true)
    })

    describe('when displayOptions empty', () => {
      test('should render recipeItems', () => {
        expect(wrapper.find('RecipeList').exists()).toBe(true)
      })

      test('should render Portions', () => {
        expect(wrapper.find('Portions').exists()).toBe(true)
      })

      test('should render CTA', () => {
        const checkoutButton = getCheckoutButtonWrapper()
        expect(checkoutButton.find('.ctaButton').exists()).toBe(true)
      })

      describe('when access token not present', () => {
        test('should render promo text', () => {
          wrapper.setProps({ accessToken: null })
          expect(wrapper.find('.supportingText').exists()).toBe(true)
        })
      })
    })

    describe('when pricingPending false', () => {
      test('should render Receipt', () => {
        expect(wrapper.find('Receipt').exists()).toBe(true)
      })
    })

    describe('Details cta buttons', () => {
      describe('when shouldDisplayFullScreenBoxSummary is false', () => {
        beforeAll(() => {
          wrapper = shallow(
            <Details
              {...props}
            />)
        })
        test('should NOT render sticky button', () => {
          expect(wrapper.find('.stickyButton').exists()).toBe(false)
        })
      })
      describe('when shouldDisplayFullScreenBoxSummary is true', () => {
        beforeEach(() => {
          wrapper = shallow(
            <Details
              {...props}
              shouldDisplayFullScreenBoxSummary
            />)
        })
        test('should render sticky button', () => {
          const checkoutButton = getCheckoutButtonWrapper()
          expect(checkoutButton.find('.stickyButton').exists()).toBe(true)
        })

        describe('when less than 4 recipes but more then 1 in the basket', () => {
          beforeEach(() => {
            props.okRecipeIds = Immutable.Map({
              123: 1,
              456: 1
            })

            wrapper = shallow(
              <Details
                {...props}
                shouldDisplayFullScreenBoxSummary
              />)
          })

          test('should render secondary CTA', () => {
            expect(wrapper.find('[color="secondary"]').exists()).toBe(true)
          })

          test('should render Checkout Container', () => {
            const checkoutButton = getCheckoutButtonWrapper()
            expect(checkoutButton.find('CheckoutContainer').exists()).toBe(true)
          })
        })

        describe('when less then 2 recipes in the basket', () => {
          beforeEach(() => {
            props.okRecipeIds = Immutable.Map({
              123: 1,
            })

            wrapper = shallow(
              <Details
                {...props}
                shouldDisplayFullScreenBoxSummary
              />)
          })
          test('should NOT render secondary CTA', () => {
            expect(wrapper.find('[color="secondary"]').exists()).toBe(false)
          })

          test('should NOT render checkout button', () => {
            expect(wrapper.find('CheckoutContainer').exists()).toBe(false)
          })
        })

        describe('when more then 3 recipes', () => {
          beforeEach(() => {
            props.okRecipeIds = Immutable.Map({
              123: 2,
              456: 2,
            })

            wrapper = shallow(
              <Details
                {...props}
                shouldDisplayFullScreenBoxSummary
              />)
          })
          test('should NOT render secondary CTA', () => {
            expect(wrapper.find('[color="secondary"]').exists()).toBe(false)
          })

          test('should render checkout button', () => {
            const checkoutButton = getCheckoutButtonWrapper()
            expect(checkoutButton.find('CheckoutContainer').exists()).toBe(true)
          })
        })
      })
    })
  })
})
