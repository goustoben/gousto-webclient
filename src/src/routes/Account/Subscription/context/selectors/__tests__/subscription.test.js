import { getIsSubscriptionLoaded, getSubscriptionUpdateV2Payload, getIsSubscriptionActive, getShowResubscriptionModal } from '../subscription'

describe('subscription selectors', () => {
  let contextState
  beforeEach(() => {
    contextState = {}
  })

  describe('getAreDeliveriesLoaded', () => {
    test('should return false', () => {
      expect(getIsSubscriptionLoaded(contextState)).toBe(false)
    })

    describe('When subscription is defined', () => {
      beforeEach(() => {
        contextState = {
          subscription: {
            deliverySlotId: '6'
          }
        }
      })
      test('should return true', () => {
        expect(getIsSubscriptionLoaded(contextState)).toBe(true)
      })
    })
  })

  describe('getSubscriptionUpdateV2Payload', () => {
    const numPortions = 2
    const numRecipes = 3
    const dietaryPreference = 'vegetarian'
    const deliveryFrequency = 2
    const currentDeliverySlot = { deliveryStartTime: '1', deliveryEndTime: '2', defaultDay: '3' }
    test('should return formatted payload', () => {
      const expectedResult = {
        numRecipes: 2,
        numPortions: 3,
        boxType: 'vegetarian',
        interval: 2,
        intervalUnit: 'weeks',
        deliverySlotStartTime: '1',
        deliverySlotEndTime: '2',
        deliverySlotDay: '3',
      }
      expect(
        getSubscriptionUpdateV2Payload.resultFunc(
          numRecipes,
          numPortions,
          dietaryPreference,
          deliveryFrequency,
          currentDeliverySlot
        )
      ).toEqual(expectedResult)
    })
  })

  describe('getIsSubscriptionActive', () => {
    test('should return false', () => {
      expect(getIsSubscriptionActive(contextState)).toBe(false)
    })

    describe('When subscription is active', () => {
      beforeEach(() => {
        contextState = {
          subscription: {
            status: 'active'
          }
        }
      })
      test('should return true', () => {
        expect(getIsSubscriptionActive(contextState)).toBe(true)
      })
    })
  })

  describe('getShowResubscriptionModal', () => {
    test('should return false', () => {
      expect(getShowResubscriptionModal(contextState)).toBe(undefined)
    })

    describe('When showResubscriptionModal is false', () => {
      beforeEach(() => {
        contextState = {
          subscription: {
            showResubscriptionModal: false
          }
        }
      })
      test('should return false', () => {
        expect(getIsSubscriptionActive(contextState)).toBe(false)
      })
    })
  })
})
