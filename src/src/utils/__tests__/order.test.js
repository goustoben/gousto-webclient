import Immutable from 'immutable'

import { getAffiliateTrackingData } from 'utils/order'

describe('order utils', () => {
  describe('getAffiliateTrackingData', () => {
    describe('when given nothing', () => {
      test('should fail gracefully', () => {
        expect(getAffiliateTrackingData()).toEqual({
          orderId: '',
          total: '',
          commissionGroup: '',
          promoCode: '',
        })
      })
    })

    describe('when given an order and commission group', () => {
      let order
      let commissionGroup

      beforeEach(() => {
        commissionGroup = 'FIRSTPURCHASE'
        order = Immutable.Map({
          id: '9012312',
          prices: Immutable.Map({
            total: '24.99',
            promoCode: 'TV',
          }),
        })
      })

      test('should return affiliate purchase data', () => {
        expect(getAffiliateTrackingData(order, commissionGroup)).toEqual({
          orderId: '9012312',
          total: '24.99',
          commissionGroup: 'FIRSTPURCHASE',
          promoCode: 'TV',
        })
      })
    })
  })
})
