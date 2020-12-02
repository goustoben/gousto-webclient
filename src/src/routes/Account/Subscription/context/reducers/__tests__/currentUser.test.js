import { reduceCurrentUserData } from '../currentUser'

let result

const mockState = {
  initial: 'state'
}

const mockData = {
  user: {
    shipping_address: {
      postcode: 'W1A',
    },
  },
}

describe('currentUser reducers', () => {
  describe('reduceCurrentUserData', () => {
    describe('Given invalid data is passed', () => {
      beforeEach(() => {
        result = reduceCurrentUserData(mockState, { notUser: 123 })
      })

      test('Then it returns initial state', () => {
        expect(result).toEqual(mockState)
      })
    })

    describe('Given no data is passed', () => {
      beforeEach(() => {
        result = reduceCurrentUserData(mockState, undefined)
      })

      test('Then it returns initial state', () => {
        expect(result).toEqual(mockState)
      })
    })

    describe('Given valid data is passed', () => {
      beforeEach(() => {
        result = reduceCurrentUserData(mockState, mockData)
      })

      test('Then current user is reduced as expected', () => {
        expect(result).toEqual({
          initial: 'state',
          currentUser: {
            shippingAddress: { postcode: 'W1A' },
          },
        })
      })
    })
  })
})
