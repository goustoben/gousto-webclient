import Immutable from 'immutable'
import { areExtrasIncluded, getSubscriptionOptionsPrices } from '../pricing'
describe('Pricing selectors', () => {

  describe('areExtrasIncluded', () => {

    test('should return true if there is a surcharge', () => {
      const mockState = {
        pricing: Immutable.fromJS({
          prices: {
            surchargeTotal: '5.00',
            deliveryTotal: '0.00',
            grossTotal: '20.00',
            recipeTotal: '20.00'
          }
        })
      }
      expect(areExtrasIncluded(mockState)).toEqual(true)
    })

    test('should return true if there is a delivery cost', () => {
      const mockState = {
        pricing: Immutable.fromJS({
          prices: {
            surchargeTotal: '0.00',
            deliveryTotal: '5.00',
            grossTotal: '20.00',
            recipeTotal: '20.00'
          }
        })
      }

      expect(areExtrasIncluded(mockState)).toEqual(true)
    })

    test('should return true if the gross total is not equal to the recipe total', () => {
      const mockState = {
        pricing: Immutable.fromJS({
          prices: {
            surchargeTotal: '0.00',
            deliveryTotal: '0.00',
            grossTotal: '25.00',
            recipeTotal: '20.00'
          }
        })
      }
      expect(areExtrasIncluded(mockState)).toEqual(true)
    })

    test('should return false if  there is no surcharge, delivery cost and the grossTotal is equal to the recipe total  ', () => {
      const mockState = {
        pricing: Immutable.fromJS({
          prices: {
            surchargeTotal: '0.00',
            deliveryTotal: '0.00',
            grossTotal: '20.00',
            recipeTotal: '20.00'
          }
        })
      }
      expect(areExtrasIncluded(mockState)).toEqual(false)
    })
  })

  describe('getSubscriptionOptionsPrices', () => {

    const mockState = {
      pricing: Immutable.fromJS({
        prices: {
          recipeTotal: '25.00',
          recipeTotalDiscounted: '15.00',
          pricePerPortion: '1.50',
          pricePerPortionDiscounted: '1.00'
        }
      })
    }

    test('should return the transformed pricing fields for the subscription option', () => {

      const subscriptionOption = {
        totalPrice: '25.00',
        totalPriceDiscounted: '15.00',
        pricePerPortion: '1.00'
      }

      expect(getSubscriptionOptionsPrices(mockState)[0]).toEqual(subscriptionOption)
    })

    test('should return the transformed pricing fields for the transactional option', () => {
      const transactionalOption = {
        totalPrice: '25.00',
        pricePerPortion: '1.50'
      }

      expect(getSubscriptionOptionsPrices(mockState)[1]).toEqual(transactionalOption)
    })

    test('should return an empty object if state is empty', () => {
      const emptyState = {
        pricing: Immutable.fromJS({
          prices: {}
        })
      }

      expect(getSubscriptionOptionsPrices(emptyState)[1]).toEqual({})
    })
  })
})
