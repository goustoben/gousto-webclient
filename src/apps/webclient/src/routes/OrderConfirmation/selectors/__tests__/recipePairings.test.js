import Immutable from 'immutable'
import { getProductsRecipePairings, getProductsRecipePairingsWithStock } from '../recipePairings'
import { mockGetProductRecipePairingsState, mockProductsStock } from '../../components/config'

describe('recipe pairings selectors', () => {
  let state

  beforeEach(() => {
    state = {
      productRecipePairings: mockGetProductRecipePairingsState(),
      productsStock: mockProductsStock
    }
  })

  describe('getProductsRecipePairings', () => {
    test('should return productRecipePairings from state', () => {
      const expected = mockGetProductRecipePairingsState()
      const result = getProductsRecipePairings(state)

      expect(result).toEqual(expected)
    })
  })

  describe('getProductsRecipePairingsWithStock', () => {
    describe('when productsStock has a matching product id', () => {
      test('should return product with correct stock level', () => {
        const expected = 10
        const result = getProductsRecipePairingsWithStock(state)

        expect(result.getIn(['2211', 'products', 0, 'stock'])).toEqual(expected)
      })
    })

    describe('when productsStock does not have a matching product id', () => {
      beforeEach(() => {
        state.productsStock = Immutable.Map({})
      })

      test('should return product with correct stock level 0', () => {
        const expected = 0
        const result = getProductsRecipePairingsWithStock(state)

        expect(result.getIn(['2211', 'products', 0, 'stock'])).toEqual(expected)
      })
    })
  })
})
