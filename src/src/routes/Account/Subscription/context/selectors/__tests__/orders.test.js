import { getOpenOrders } from '../orders'

const mockState = {
  orders: [
    { id: 1, phase: 'delivered' },
    { id: 2, phase: 'open' },
  ]
}

describe('Order selectors', () => {
  describe('getOpenOrders', () => {
    test('returns array of open orders', () => {
      expect(getOpenOrders(mockState)).toEqual([{ id: 2, phase: 'open' }])
    })
  })
})
