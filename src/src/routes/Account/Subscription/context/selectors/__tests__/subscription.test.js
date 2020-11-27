import { getIsSubscriptionLoaded, getSubscriptionUpdatePayload } from '../subscription'

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

  describe('getSubscriptionUpdatePayload', () => {
    const numPortions = 2
    const numRecipes = 2
    const dietaryPreference = 'vegetarian'
    const currentDeliverySlot = '3'
    const deliveryFrequency = 2
    test('should return formatted payload', () => {
      const expectedResult = {
        num_portions: numPortions,
        num_recipes: numRecipes,
        box_type: dietaryPreference,
        delivery_slot_id: currentDeliverySlot.coreSlotId,
        interval: deliveryFrequency
      }
      expect(getSubscriptionUpdatePayload.resultFunc(numPortions, numRecipes, dietaryPreference, currentDeliverySlot, deliveryFrequency))
        .toEqual(expectedResult)
    })
  })
})
