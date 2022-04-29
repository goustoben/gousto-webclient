import { trackUTMAndPromoCode } from 'actions/tracking'
import { redirect } from 'actions/redirect'
import loginActions from 'actions/login'
import { menuLoadBoxPrices } from 'actions/menu'
import {
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
  signupApplyVoucherGoToDeliveries,
  trackCuisineDeselected,
  trackCuisineSelected,
  trackSignupPersonalisationComplete,
} from '../signupActions'

jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('actions/login', () => ({
  loginVisibilityChange: jest.fn(),
}))

jest.mock('actions/menu', () => ({
  menuLoadBoxPrices: jest.fn(),
}))

describe('signupActions', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('given signupCheckAccountGoToBoxPrices is dispatched', () => {
    beforeEach(() => {
      signupCheckAccountGoToBoxPrices()(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_god_new_customer')
      expect(redirect).toHaveBeenCalledWith('/signup/box-size')
      expect(menuLoadBoxPrices).toHaveBeenCalled()
    })
  })

  describe('given signupCheckAccountLogin is dispatched', () => {
    beforeEach(() => {
      signupCheckAccountLogin()(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_god_existing_customer')
      expect(loginActions.loginVisibilityChange).toHaveBeenCalledWith(true)
    })
  })

  describe('given signupApplyVoucherGoToDeliveries is dispatched', () => {
    beforeEach(() => {
      signupApplyVoucherGoToDeliveries()(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith('click_apply_voucher_existing_account')
      expect(redirect).toHaveBeenCalledWith('/my-deliveries')
    })
  })

  describe('given trackCuisineSelected is called with a cuisine', () => {
    beforeEach(() => {
      trackCuisineSelected('American')(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'cuisine_selected',
          cuisineName: 'American',
        },
      })
    })
  })

  describe('given trackCuisineDeselected is called with a cuisine', () => {
    beforeEach(() => {
      trackCuisineDeselected('British')(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'cuisine_deselected',
          cuisineName: 'British',
        },
      })
    })
  })

  describe('given trackSignupPersonalisationComplete is called with cuisines', () => {
    beforeEach(() => {
      trackSignupPersonalisationComplete(['French', 'Asian'])(dispatch)
    })

    test('then it should dispatch correct actions', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'TRACKING',
        trackingData: {
          actionType: 'signup_personalisation_complete',
          selectedCuisines: ['French', 'Asian'],
        },
      })
    })
  })
})
