import Immutable from 'immutable'

import { mockGetProductRecipePairingsState, mockProductsStock } from '../../components/config'
import {
  getProductsRecipePairings,
  getProductsRecipePairingsWithStock,
  getProductRecipePairingsTotalProducts,
  getProductsRecipePairingsWithRecipes,
} from '../recipePairings'

describe('recipe pairings selectors', () => {
  let state

  beforeEach(() => {
    state = {
      productRecipePairings: mockGetProductRecipePairingsState(),
      productsStock: mockProductsStock,
      productRecipePairingsTotalProducts: 2,
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
        const result = getProductsRecipePairingsWithStock(state)

        expect(result.getIn(['2211', 'products', 0, 'stock'])).toEqual(10)
      })
    })

    describe('when productsStock does not have a matching product id', () => {
      beforeEach(() => {
        state.productsStock = Immutable.Map({})
      })

      test('should return product with correct stock level 0', () => {
        const result = getProductsRecipePairingsWithStock(state)

        expect(result.getIn(['2211', 'products', 0, 'stock'])).toEqual(0)
      })
    })

    describe('when user has no pairings', () => {
      beforeEach(() => {
        state.productRecipePairings = Immutable.Map({})
      })

      test('should return empty map', () => {
        const result = getProductsRecipePairingsWithStock(state)

        expect(result).toEqual(Immutable.Map({}))
      })
    })
  })

  describe('getProductRecipePairingsTotalProducts', () => {
    test('should return productRecipePairingsTotalProducts from state', () => {
      const result = getProductRecipePairingsTotalProducts(state)

      expect(result).toEqual(2)
    })
  })

  describe('getProductsRecipePairingsWithRecipes', () => {
    describe('when recipe has a matching pairing', () => {
      beforeEach(() => {
        state = {
          ...state,
          basket: Immutable.fromJS({
            orderDetails: {
              recipeItems: [
                {
                  recipeId: '2211',
                  title: 'mock recipe title',
                  media: [1, 2, 3],
                },
              ],
            },
          }),
        }
      })

      test('should return pairings with recipe data', () => {
        const mockProductRecipePairings = mockGetProductRecipePairingsState()
        const expected = Immutable.List([
          {
            recipeId: '2211',
            title: 'mock recipe title',
            media: Immutable.List([1, 2, 3]),
            products: mockProductRecipePairings
              .setIn(['2211', 'products', 0, 'stock'], 10)
              .getIn(['2211', 'products']),
          },
        ])

        const result = getProductsRecipePairingsWithRecipes(state)

        expect(result).toEqual(expected)
      })

      describe("And pairings don't contain any products", () => {
        beforeEach(() => {
          const mockProductRecipePairings = mockGetProductRecipePairingsState()
          state = {
            ...state,
            productRecipePairings: mockProductRecipePairings.setIn(
              ['2211', 'products'],
              Immutable.List([]),
            ),
          }
        })

        test('should not return pairings', () => {
          const result = getProductsRecipePairingsWithRecipes(state)

          expect(result).toEqual(Immutable.List([]))
        })
      })

      describe("And recipe id doesn't match the pairing recipe id", () => {
        beforeEach(() => {
          state = {
            ...state,
            basket: Immutable.fromJS({
              orderDetails: {
                recipeItems: [
                  {
                    recipeId: '1234',
                    title: 'mock recipe title',
                    media: [1, 2, 3],
                  },
                ],
              },
            }),
          }
        })
        test('should not return pairings', () => {
          const result = getProductsRecipePairingsWithRecipes(state)

          expect(result).toEqual(Immutable.List([]))
        })
      })
    })
  })

  describe('getProductRecipePairingsTotalProducts', () => {
    test('should return productRecipePairingsTotalProducts from state', () => {
      const result = getProductRecipePairingsTotalProducts(state)

      expect(result).toEqual(2)
    })
  })
})
