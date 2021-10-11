import Immutable from 'immutable'
import { boxPricesBoxSizeSelected } from 'actions/boxPrices'
import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { trackClickBuildMyBox } from 'actions/tracking'
import { applyPromoCodeAndShowModal } from 'actions/home'
import { getPromoBannerState } from 'utils/home'

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
})
