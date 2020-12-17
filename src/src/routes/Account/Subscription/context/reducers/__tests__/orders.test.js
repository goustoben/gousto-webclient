import { reduceOrdersData } from '../orders'

const initialState = {
  initial: 'state'
}

const mockOrders = [{
  phase: 'open',
  human_delivery_date: '10th Jan 2020',
}]

describe('Order reducers', () => {
  describe('reduceOrdersData', () => {
    describe('Given no orders are passed', () => {
      test('Then state is returned', () => {
        const result = reduceOrdersData(initialState)

        expect(result).toEqual(initialState)
      })
    })

    describe('Given orders are passed', () => {
      test('Then orders are reduced as expected', () => {
        const result = reduceOrdersData(initialState, mockOrders)

        expect(result).toEqual({
          ...initialState,
          orders: [{ phase: 'open', deliveryDate: '10th Jan 2020' }]
        })
      })
    })

    describe('Given there is an error reducing orders', () => {
      test('Then state is returned', () => {
        const result = reduceOrdersData(initialState, {})

        expect(result).toEqual(initialState)
      })
    })
  })
})
