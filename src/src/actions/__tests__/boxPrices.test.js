import Immutable from 'immutable'
import { actionTypes } from 'actions/actionTypes'
import { getPromoBannerState } from 'utils/home'
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import { boxPricesBoxSizeSelected } from "actions/boxPrices/boxPricesBoxSizeSelected"
import { updatePricePerServing } from "actions/boxPrices/updatePricePerServing"
import { applyPromoCodeAndShowModal } from "actions/home/applyPromoCodeAndShowModal"
import { redirect } from "actions/redirect/redirect"
import { signupNextStep } from "actions/signup/signupNextStep"
import { trackClickBuildMyBox } from "actions/tracking/trackClickBuildMyBox"
import { fetchBoxPrices } from "apis/boxPrices/fetchBoxPrices"

jest.mock('actions/basket', () => ({
  basketNumPortionChange: jest.fn()
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn()
}))

jest.mock('actions/signup', () => ({
  signupNextStep: jest.fn()
}))

jest.mock('actions/tracking', () => ({
  trackClickBuildMyBox: jest.fn()
}))

jest.mock('utils/home', () => ({
  getPromoBannerState: jest.fn()
}))

jest.mock('actions/home', () => ({
  applyPromoCodeAndShowModal: jest.fn()
}))

jest.mock('apis/boxPrices', () => ({
  fetchBoxPrices: jest.fn()
}))

describe('boxPrices actions', () => {
  const getState = jest.fn()
  const dispatch = jest.fn()
  const defaultState = {
    basket: Immutable.fromJS({
      postcode: ''
    }),
    auth: Immutable.fromJS({
      isAuthenticated: false
    })
  }
  getPromoBannerState.mockReturnValue({
    canApplyPromo: true
  })

  describe('given boxPricesBoxSizeSelected is dispatched', () => {
    describe('when postcode is not selected yet', () => {
      beforeEach(() => {
        getState.mockReturnValue(defaultState)
      })

      test('then it should apply promo code and redirect to wizard', async () => {
        await boxPricesBoxSizeSelected(2)(dispatch, getState)

        expect(applyPromoCodeAndShowModal).toHaveBeenCalled()
        expect(trackClickBuildMyBox).toHaveBeenCalledWith('2 people', 'wizard')
        expect(basketNumPortionChange).toHaveBeenCalledWith(2)
        expect(signupNextStep).toHaveBeenCalledWith('postcode')
      })
    })

    describe('when postcode is selected', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          basket: Immutable.fromJS({
            postcode: 'W140EE'
          }),
          auth: Immutable.fromJS({
            isAuthenticated: false
          })
        })
      })

      test('then it should redirect to the menu', async () => {
        await boxPricesBoxSizeSelected(4)(dispatch, getState)

        expect(trackClickBuildMyBox).toHaveBeenCalledWith('4 people', 'menu')
        expect(basketNumPortionChange).toHaveBeenCalledWith(4)
        expect(redirect).toHaveBeenCalledWith('/menu')
      })
    })
  })

  describe('given updatePricePerServing() action', () => {
    const state = {
      basket: Immutable.Map({
        orderId: null,
        promoCode: 'DTI-CHECKOUT30',
        tariffId: '123',
      }),
      auth: Immutable.Map({
        isAuthenticated: false,
        accessToken: 'fake_token',
      }),
    }

    describe('when successfully executed', () => {
      beforeEach(() => {
        fetchBoxPrices.mockResolvedValue({
          data: {
            4: {
              4: {
                gourmet: {
                  pricePerPortion: '2.33',
                  pricePerPortionDiscounted: '4.04'
                }
              }
            },
            2: {
              4: {
                gourmet: {
                  pricePerPortion: '2.04',
                  pricePerPortionDiscounted: '2.04'
                }
              }
            }
          }
        })
        getState.mockReturnValue(state)
      })

      test('should fetch box prices', async () => {
        const expectedRequest = {
          promocode: 'DTI-CHECKOUT30',
          tariff_id: '123',
        }

        await updatePricePerServing()(dispatch, getState)

        expect(fetchBoxPrices).toHaveBeenCalledWith('fake_token', expectedRequest)
      })

      test('should dispatch BOXPRICE_SET_PRICE_PER_SERVING action', async () => {
        const expected = {
          type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
          price: '2.33',
          lowestPricePerPortion: {
            forTwo: {
              price: '2.04',
              priceDiscounted: '2.04'
            },
            forFour: {
              price: '2.33',
              priceDiscounted: '4.04'
            }
          }
        }

        await updatePricePerServing()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(expected)
      })
    })

    describe('when fetch request failed', () => {
      beforeEach(() => {
        fetchBoxPrices.mockRejectedValue(new Error('Failed'))
        getState.mockReturnValue({
          ...state,
          basket: state.basket.set('orderId', '234')
        })
      })

      test('should dispatch BOXPRICE_SET_PRICE_PER_SERVING action with hardcoded value', async () => {
        const expected = {
          type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
          price: '2.87',
        }

        await updatePricePerServing()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(expected)
      })
    })
  })
})
