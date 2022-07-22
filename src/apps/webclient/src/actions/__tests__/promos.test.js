import { promoApplyCheckoutCode } from 'actions/promos'
import { trackPromocodeChange } from 'routes/Checkout/checkoutActions'

const dispatchSpy = jest.fn()

jest.mock('routes/Checkout/checkoutActions', () => ({
  trackPromocodeChange: jest.fn(),
}))

describe('promo actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('promoApplyCheckoutCode', () => {
    beforeEach(() => {
      promoApplyCheckoutCode()(dispatchSpy)
    })

    test('should call basketPromoCodeChange', () => {
      expect(dispatchSpy.mock.calls[0][0]).toEqual({
        type: 'BASKET_PROMO_CODE_CHANGE',
        promoCode: 'DTI-CHECKOUT30',
      })
    })

    test('should track promoCode change', () => {
      expect(trackPromocodeChange).toHaveBeenCalledWith('DTI-CHECKOUT30', true)
    })
  })
})
