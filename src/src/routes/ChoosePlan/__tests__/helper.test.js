import { calculateTransactionalOptionPrices } from '../helper'
import * as config from '../config'

describe('Choose Plan Helper', () => {
  describe('calculateTransactionalOptionPrices', () => {
    const totalPrice = '50.00'
    const numPortions = '4'
    const numRecipes = '3'

    test('should return the total price', () => {
      const result = calculateTransactionalOptionPrices(totalPrice, numPortions, numRecipes)
      expect(result.totalPrice).toEqual(totalPrice)
    })

    describe('50% off', () => {
      beforeEach(() => {
        config.transactional = { percentageOff : 50 } //eslint-disable-line
      })

      test('should return correct discounted price', () => {
        const result = calculateTransactionalOptionPrices(totalPrice, numPortions, numRecipes)
        expect(result.totalPriceDiscounted).toEqual('25.00')
      })

      test('should return correct price per portion', () => {
        const result = calculateTransactionalOptionPrices(totalPrice, numPortions, numRecipes)
        expect(result.pricePerPortion).toEqual('2.08')
      })
    })

    describe('20% off', () => {
      beforeEach(() => {
        config.transactional = { percentageOff : 20 } //eslint-disable-line
      })

      test('should return correct discounted price', () => {
        const result = calculateTransactionalOptionPrices(totalPrice, numPortions, numRecipes)
        expect(result.totalPriceDiscounted).toEqual('40.00')
      })

      test('should return correct price per portion', () => {
        const result = calculateTransactionalOptionPrices(totalPrice, numPortions, numRecipes)
        expect(result.pricePerPortion).toEqual('3.33')
      })
    })

  })

})
