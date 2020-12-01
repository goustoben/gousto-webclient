import Immutable from 'immutable'
import { boxPricesBoxSizeSelected } from 'actions/boxPrices'
import { basketNumPortionChange } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { signupNextStep } from 'actions/signup'
import { trackClickBuildMyBox } from 'actions/tracking'
import { applyPromoCodeAndRedirect } from 'actions/home'
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
  applyPromoCodeAndRedirect: jest.fn()
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
    hide: false,
    canApplyPromo: true
  })

  describe('given boxPricesBoxSizeSelected is dispatched', () => {
    describe('when postcode is not selected yet', () => {
      beforeEach(() => {
        getState.mockReturnValue(defaultState)
      })

      test('then it should redirect to wizard', async () => {
        await boxPricesBoxSizeSelected(2)(dispatch, getState)

        expect(trackClickBuildMyBox).toHaveBeenCalledWith('2 people', 'wizard')
        expect(basketNumPortionChange).toHaveBeenCalledWith(2)
        expect(signupNextStep).toHaveBeenCalledWith('postcode')
      })

      describe('and isDiscountBoxPricesEnabled is disabled', () => {
        beforeEach(() => {
          getState.mockReturnValue({
            ...defaultState,
            features: Immutable.fromJS({
              isDiscountBoxPricesEnabled: { value: false }
            })
          })
        })

        test('then should redirect to the wizard', async () => {
          await boxPricesBoxSizeSelected(2)(dispatch, getState)

          expect(signupNextStep).toHaveBeenCalledWith('postcode')
        })
      })

      describe('and isDiscountBoxPricesEnabled is enabled', () => {
        beforeEach(() => {
          getState.mockReturnValue({
            ...defaultState,
            features: Immutable.fromJS({
              isDiscountBoxPricesEnabled: { value: true }
            })
          })
        })

        describe('and applyPromoCodeAndRedirect returns an error', () => {
          beforeEach(() => {
            applyPromoCodeAndRedirect.mockReturnValue(false)
          })

          test('then should redirect to the next step', async () => {
            await boxPricesBoxSizeSelected(2)(dispatch, getState)

            expect(applyPromoCodeAndRedirect).toBeCalled()
            expect(signupNextStep).toHaveBeenCalledWith('postcode')
          })
        })
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
