import { trackUTMAndPromoCode } from 'actions/tracking'
import { redirect } from 'actions/redirect'
import loginActions from 'actions/login'
import { menuLoadBoxPrices } from 'actions/menu'
import {
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
  signupApplyVoucherGoToDeliveries,
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
})
