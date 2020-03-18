import Immutable from 'immutable'
import { getUTMAndPromoCode } from '../tracking'

describe('tracking', () => {
  describe('getUTMAndPromoCode', () => {
    const promoCode = '123'
    const utmSource = 'google.com'
    const state = {
      basket: Immutable.fromJS({
        promoCode,
      }),
      tracking: Immutable.fromJS({
        utmSource,
      })
    }
    test('should return utm and promo code from store', () => {
      const expected = {
        UTM: utmSource,
        promoCode
      }
      expect(getUTMAndPromoCode(state)).toMatchObject(expected)
    })
  })
})
