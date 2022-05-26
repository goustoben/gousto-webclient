import Immutable from 'immutable'

import { getOrderWhenStartDate } from '../order'

describe('OrderConfirmation order utils', () => {
  describe('getOrderWhenStartDate', () => {
    const orderDetails = Immutable.fromJS({
      period: {
        whenStart: '2022-05-17T11:00:00Z',
      },
    })

    test('returns when start date when user has order', () => {
      const result = getOrderWhenStartDate(orderDetails)

      expect(result).toEqual('2022-05-17T11:00:00Z')
    })

    test('returns undefined when order is empty', () => {
      const result = getOrderWhenStartDate(Immutable.Map({}))

      expect(result).toEqual(undefined)
    })
  })
})
