import Immutable from 'immutable'
import {
  getNumPortions,
  getBasketRecipes,
  getBasketRecipesCount,
  getBasketTotalRecipes,
  getBasketOrderTotal,
  getBasketOrderPrices,
  getBasketOrderDetails,
  getBasketOrderDetailId,
  getBasketOrderPromoCode,
  getSignupChosenCollection,
  getBasketOrderId,
  getBasketLimitReached,
  getBasketProducts,
  getChosenAddressId,
  getBasketTariffId,
} from '../basket'

describe('the basket selectors', () => {
  let state

  beforeEach(() => {
    state = {
      basket: Immutable.fromJS({
        numPortions: 2,
        recipes: {
          100: 1,
          200: 1,
        },
        collection: '',
      }),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getNumPortions', () => {
    test('returns the number of portions from basket state', () => {
      expect(getNumPortions(state)).toBe(2)
    })
  })

  describe('getBasketRecipes', () => {
    test('returns the recipes from basket state', () => {
      expect(getBasketRecipes(state)).toEqual(Immutable.Map({
        100: 1,
        200: 1,
      }))
    })
  })

  describe('getBasketRecipesCount', () => {
    test('when no recipes it returns the number of recipes in the basket state', () => {
      expect(getBasketRecipesCount({ basket: Immutable.fromJS({}) })).toEqual(0)
    })

    test('returns the number of recipes in the basket state', () => {
      expect(getBasketRecipesCount(state)).toEqual(2)
    })
  })

  describe('getBasketTotalRecipes', () => {
    test('returns the total number of recipes from basket state', () => {
      state = {
        basket: Immutable.fromJS({
          numPortions: 2,
          recipes: {
            100: 1,
            200: 2,
            300: 1,
          },
        }),
      }
      expect(getBasketTotalRecipes(state)).toEqual(4)
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

  describe('getBasketOrderId', () => {
    const orderId = '311737157'

    beforeEach(() => {
      state = {
        basket: Immutable.Map({
          orderId,
        })
      }
    })

    test('should return the basket order id', () => {
      expect(getBasketOrderId(state)).toEqual(orderId)
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

  describe('getBasketLimitReached', () => {
    test('should return the basket limitReached true', () => {
      state = {
        basket: Immutable.Map({
          limitReached: true,
        })
      }
      expect(getBasketLimitReached(state)).toEqual(true)
    })

    test('should return the basket limitReached false', () => {
      state = {
        basket: Immutable.Map({
          limitReached: false,
        })
      }
      expect(getBasketLimitReached(state)).toEqual(false)
    })
  })

  describe('getBasketTariffId', () => {
    const tariffId = '123'

    beforeEach(() => {
      state = {
        basket: Immutable.Map({
          tariffId,
        })
      }
    })

    test('should return the basket tariff id', () => {
      expect(getBasketTariffId(state)).toEqual(tariffId)
    })
  })
})

describe('the getBasketProducts selector', () => {
  let state
  const productsInBasket = Immutable.Map({
    product1: 1,
    product2: 3,
  })

  beforeEach(() => {
    state = {
      basket: Immutable.fromJS({
        products: productsInBasket,
      })
    }
  })

  test('returns the products in the basket', () => {
    expect(getBasketProducts(state)).toEqual(productsInBasket)
  })
})

describe('getChosenAddressId', () => {
  let state
  describe('when chosenAddress exists', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          chosenAddress: {
            id: '1234'
          }
        })
      }
    })

    test('should return the id', () => {
      expect(getChosenAddressId(state)).toEqual('1234')
    })
  })
  describe('when chosenAddress is not in basket', () => {
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({})
      }
    })

    test('should return null', () => {
      expect(getChosenAddressId(state)).toEqual(null)
    })
  })
})
