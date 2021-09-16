import {
  reduceSubscriptionData,
  reduceSubscriptionPageData,
  reduceSubscriptionUpdateData,
  reduceSubscriptionStatusUpdate,
  reduceSubscriptionHideResubscriptionModal
} from '../subscription'

import * as deliveryReducers from '../deliveries'
import * as boxReducers from '../box'

const reduceDeliveriesDataSpy = jest.spyOn(deliveryReducers, 'reduceDeliveriesData')
const reduceUpdatedDeliveriesDataSpy = jest.spyOn(deliveryReducers, 'reduceUpdatedDeliveriesData')
const reduceBoxDataSpy = jest.spyOn(boxReducers, 'reduceBoxData')

let result

const mockState = {}

const mockReducedState = {
  box: 'data',
  delivery: 'data',
  subscription: {
    deliverySlotId: 'mock-delivery-slot-id',
    status: 'active',
    requestState: { isLoaded: true, isLoading: false }
  }
}

const mockData = {
  subscription: {
    subscription: {
      delivery_slot_id: 'mock-delivery-slot-id',
      state: 'active'
    }
  }
}

const reducedSubscription = {
  deliverySlotId: 'mock-delivery-slot-id',
  status: 'active',
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
            },
            state: {
              description: 'Active'
            }
          }
        })
      })

      test('Then state is reduced as expected', () => {
        expect(result).toEqual({
          ...mockReducedState,
          subscription: {
            ...mockReducedState.subscription,
            deliverySlotId: '1',
            status: 'active'
          }
        })
      })
    })

    describe('Given expected state and data with missing properties are passed', () => {
      beforeEach(() => {
        result = reduceSubscriptionUpdateData(mockReducedState, {
          subscription: {
            slot: {
              id: 1
            }
          }
        })
      })

      test('Then state is reduced as expected with default values', () => {
        expect(result).toEqual({
          ...mockReducedState,
          subscription: {
            ...mockReducedState.subscription,
            deliverySlotId: '1',
            status: ''
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

  describe('reduceSubscriptionStatusUpdate', () => {
    describe('Given expected data and state are passed', () => {
      beforeEach(() => {
        result = reduceSubscriptionStatusUpdate({
          ...mockReducedState,
          isSubscriberPricingEnabled: false,
        }, {
          subscription: {
            status: 'inactive'
          }
        })
      })

      test('Then the state is reduced as expected', () => {
        expect(result).toEqual({
          isSubscriberPricingEnabled: false,
          box: 'data',
          delivery: 'data',
          subscription: {
            deliverySlotId: 'mock-delivery-slot-id',
            showResubscriptionModal: false,
            status: 'inactive',
            requestState: { isLoaded: true, isLoading: false }
          }
        })
      })
    })

    describe('reduceSubscriptionHideResubscriptionModal', () => {
      describe('Given expected data and isSubscriberPricingEnabled is true', () => {
        beforeEach(() => {
          result = reduceSubscriptionHideResubscriptionModal({
            ...mockReducedState,
            isSubscriberPricingEnabled: true,
          })
        })

        test('Then the state is reduced as expected', () => {
          expect(result).toEqual({
            isSubscriberPricingEnabled: true,
            box: 'data',
            delivery: 'data',
            subscription: {
              deliverySlotId: 'mock-delivery-slot-id',
              showResubscriptionModal: false,
              status: 'active',
              requestState: { isLoaded: true, isLoading: false }
            }
          })
        })
      })

      describe('Given expected data and isSubscriberPricingEnabled is false', () => {
        beforeEach(() => {
          result = reduceSubscriptionHideResubscriptionModal({
            ...mockReducedState,
            isSubscriberPricingEnabled: false,
          })
        })

        test('Then the state is reduced as expected', () => {
          expect(result).toEqual({
            isSubscriberPricingEnabled: false,
            box: 'data',
            delivery: 'data',
            subscription: {
              deliverySlotId: 'mock-delivery-slot-id',
              showResubscriptionModal: false,
              status: 'active',
              requestState: { isLoaded: true, isLoading: false }
            }
          })
        })
      })
    })

    describe('Given there is an error', () => {
      beforeEach(() => {
        result = reduceSubscriptionStatusUpdate(mockReducedState, null)
      })

      test('Then the initial state is returned', () => {
        expect(result).toEqual(mockReducedState)
      })
    })
  })
})
