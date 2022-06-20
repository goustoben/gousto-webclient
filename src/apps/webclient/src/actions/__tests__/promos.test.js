import { promoApplyCheckoutCode } from 'actions/promos'
import { trackPromocodeChange } from 'actions/checkout'

const dispatchSpy = jest.fn()

jest.mock('actions/checkout', () => ({
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
