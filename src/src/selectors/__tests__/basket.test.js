import Immutable from 'immutable'
import {
  getNumPortions,
  getBasketRecipes,
  getBasketOrderTotal,
  getBasketOrderPrices,
  getBasketOrderDetails,
  getBasketOrderDetailId,
  getBasketOrderPromoCode,
  getSignupChosenCollection,
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

  describe('basket order detail selectors', () => {
    const createOrderDetailState = (orderDetails = Immutable.Map({})) => ({
      basket: Immutable.Map({
        orderDetails,
      })
    })

    describe('getBasketOrderDetailId', () => {
      const id = '31373'

      beforeEach(() => {
        state = createOrderDetailState(Immutable.Map({
          id,
        }))
      })

      test('should return the order detail id', () => {
        expect(getBasketOrderDetailId(state)).toEqual(id)
      })
    })

    describe('getBasketOrderPrices', () => {
      const prices = Immutable.Map({
        total: '10.00',
      })

      beforeEach(() => {
        state = createOrderDetailState(Immutable.Map({
          prices,
        }))
      })

      test('should return the order detail prices', () => {
        expect(getBasketOrderPrices(state)).toEqual(prices)
      })
    })

    describe('getBasketOrderTotal', () => {
      const total = '45.00'

      beforeEach(() => {
        state = createOrderDetailState(Immutable.Map({
          prices: Immutable.Map({
            total,
          }),
        }))
      })

      test('should return the order detail prices', () => {
        expect(getBasketOrderTotal(state)).toEqual(total)
      })
    })

    describe('getBasketOrderPromoCode', () => {
      const promoCode = 'DIT-BS-1010'

      beforeEach(() => {
        state = createOrderDetailState(Immutable.Map({
          prices: Immutable.Map({
            promoCode,
          }),
        }))
      })

      test('should return the order detail prices', () => {
        expect(getBasketOrderPromoCode(state)).toEqual(promoCode)
      })
    })
  })
})
