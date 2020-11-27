import {
  reduceSubscriptionData,
  reduceSubscriptionPageData,
  reduceSubscriptionUpdateData
} from '../subscription'

import * as deliveryReducers from '../deliveries'
import * as boxReducers from '../box'

const reduceDeliveriesDataSpy = jest.spyOn(deliveryReducers, 'reduceDeliveriesData')
const reduceUpdatedDeliveriesDataSpy = jest.spyOn(deliveryReducers, 'reduceUpdatedDeliveriesData')
const reduceBoxDataSpy = jest.spyOn(boxReducers, 'reduceBoxData')

let result

const mockState = {
  initial: 'state'
}

const mockReducedState = {
  box: 'data',
  delivery: 'data',
  initial: 'state',
  subscription: {
    deliverySlotId: 'mock-delivery-slot-id',
    requestState: { isLoaded: true, isLoading: false }
  }
}

const mockData = {
  subscription: {
    subscription: {
      delivery_slot_id: 'mock-delivery-slot-id'
    }
  }
}

const reducedSubscription = {
  deliverySlotId: 'mock-delivery-slot-id',
  requestState: {
    isLoaded: true,
    isLoading: false
  }
}

describe('subscription reducers', () => {
  beforeEach(() => {
    reduceDeliveriesDataSpy.mockReturnValue({ delivery: 'data' })
    reduceUpdatedDeliveriesDataSpy.mockReturnValue({ delivery: 'data' })
    reduceBoxDataSpy.mockReturnValue({ box: 'data' })
  })

  describe('reduceSubscriptionData', () => {
    describe('Given expected params are passed', () => {
      beforeEach(() => {
        result = reduceSubscriptionData(mockState, mockData.subscription)
      })

      test('Then subscription data is reduced as expected', () => {
        expect(result).toEqual({
          ...mockState,
          subscription: reducedSubscription
        })
      })
    })

    describe('Given malformed data is passed', () => {
      beforeEach(() => {
        result = reduceSubscriptionData(mockState, { foo: 'bar' })
      })

      test('Then initial state is returned', () => {
        expect(result).toEqual(mockState)
      })
    })
  })

  describe('reduceSubscriptionPageData', () => {
    describe('Given expected state and data are passed', () => {
      beforeEach(() => {
        result = reduceSubscriptionPageData(mockState, mockData)
      })

      test('Then subscription page data is reduced as expected', () => {
        expect(result).toEqual(mockReducedState)
      })
    })

    describe('Given one of the reducers throws', () => {
      beforeEach(() => {
        reduceBoxDataSpy.mockImplementation(() => { throw new Error('box reduce error') })

        result = reduceSubscriptionPageData(mockState, mockData)
      })

      test('Then initial state is returned', () => {
        expect(result).toEqual(mockState)
      })
    })
  })

  describe('reduceSubscriptionUpdateData', () => {
    describe('Given expected state and data are passed', () => {
      beforeEach(() => {
        result = reduceSubscriptionUpdateData(mockReducedState, {
          subscription: {
            slot: {
              id: 1
            }
          }
        })
      })

      test('Then state is reduced as expected', () => {
        expect(result).toEqual({
          ...mockReducedState,
          subscription: {
            ...mockReducedState.subscription,
            deliverySlotId: '1'
          }
        })
      })
    })

    describe('Given one of the reducers throws', () => {
      beforeEach(() => {
        reduceBoxDataSpy.mockImplementation(() => { throw new Error('box reduce error') })

        result = reduceSubscriptionUpdateData(mockReducedState, {
          subscription: {
            slot: {
              id: 1
            }
          }
        })
      })

      test('Then the initial state is returned', () => {
        expect(result).toEqual(mockReducedState)
      })
    })
  })
})
