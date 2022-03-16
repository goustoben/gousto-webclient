import Immutable from 'immutable'
import { trackPromocodeChange } from 'actions/checkout'
import { fetchPromo } from 'apis/promos'
import { promoGet, promoApplyCheckoutCode } from '../promos'

const dispatchSpy = jest.fn()

jest.mock('actions/checkout', () => ({
  trackPromocodeChange: jest.fn(),
}))

jest.mock('apis/promos', () => ({
  fetchPromo: jest.fn(),
}))

describe('promo actions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('given promoGet is dispatched', () => {
    const getState = () => ({
      promoStore: Immutable.fromJS({}),
      pending: Immutable.fromJS({}),
      auth: Immutable.fromJS({
        accessToken: 'test-access-token',
        isAuthenticated: false,
      }),
    })

    beforeEach(() => {
      fetchPromo.mockImplementation(() =>
        Promise.resolve({
          data: {
            codeData: {
              campaign: {
                enabled: true,
              },
            },
          },
        })
      )
      promoGet('DTI-SB-63')(dispatchSpy, getState)
    })

    test('then it should fill the promoStore with the promo code data', () => {
      expect(dispatchSpy.mock.calls).toEqual([
        [
          {
            key: 'PROMO_GET',
            type: 'PENDING',
            value: true,
          },
        ],
        [
          {
            key: 'PROMO_GET',
            type: 'ERROR',
            value: null,
          },
        ],
        [
          {
            key: 'PROMO_GET',
            type: 'PENDING',
            value: false,
          },
        ],
        [
          {
            promo: {
              codeData: {
                campaign: {
                  enabled: true,
                },
              },
              hasAgeRestricted: false,
              justApplied: false,
            },
            type: 'PROMO_RECEIVE',
          },
        ],
      ])
    })
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
