import Immutable from 'immutable'
import {
  getNumPortions,
  getBasketRecipes,
  getSignupChosenCollection,
  getBasketOrderDetails,
} from '../basket'

describe('the basket selectors', () => {
  let state

  beforeEach(() => {
    state = {
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {
          '100': 1,
          '200': 1,
        },
        collection: '',
      }),
    }
  })

  describe('getNumPortions', () => {
    test('returns the number of portions from basket state', () => {
      expect(getNumPortions(state)).toBe(2)
    })
  })

  describe('getBasketRecipes', () => {
    test('returns the recipes from basket state', () => {
      expect(getBasketRecipes(state)).toEqual(Immutable.Map({
        '100': 1,
        '200': 1,
      }))
    })
  })

  describe('getSignupChosenCollection', () => {
    test('returns the collections from basket state', () => {
      expect(getSignupChosenCollection(state)).toBe('')
    })
  })

  describe('getBasketOrderDetails', () => {
    describe('when there are no order details in the state', () => {
      test('returns false as default', () => {
        expect(getBasketOrderDetails(state)).toBe(false)
      })
    })

    describe('when there are order details in the state', () => {
      let orderDetails
      let updatedState

      beforeEach(() => {
        orderDetails = Immutable.fromJS({
          id: '100',
          products: [{ id: 1, itemableId: 'product-1', quantity: 2 }],
        })

        updatedState = {
          ...state,
          basket: state.basket.set('orderDetails', orderDetails)
        }
      })

      test('returns the order details from basket state', () => {
        expect(getBasketOrderDetails(updatedState)).toEqual(orderDetails)
      })
    })
  })
})
