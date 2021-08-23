import Immutable from 'immutable'
import * as menuCheckoutClick from '../menuCheckoutClick'
import { checkoutWithSides } from '../menuSidesCheckoutClick'
import * as sidesAction from '../sides'

describe('checkoutWithSides', () => {
  let state
  const dispatch = jest.fn()
  const getState = jest.fn()
  let closeSidesModalSpy
  let checkoutBasketSpy

  const products = {
    product_1: 2,
    product_2: 2,
  }

  beforeEach(() => {
    state = {
      basket: Immutable.fromJS({
        orderId: '',
      }),
      auth: Immutable.fromJS({
        id: 'user_id',
        isAuthenticated: true
      }),
    }
    getState.mockReturnValue(state)

    closeSidesModalSpy = jest.spyOn(sidesAction, 'closeSidesModal').mockImplementation()
    checkoutBasketSpy = jest.spyOn(menuCheckoutClick, 'checkoutBasket').mockImplementation()
    jest.spyOn(menuCheckoutClick, 'isOrderApiUpdateEnabled').mockResolvedValue(true)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('should dispatch closeSidesModal', async () => {
    const closeSidesModalMock = jest.fn()
    closeSidesModalSpy.mockReturnValue(closeSidesModalMock)

    await checkoutWithSides('menu', 'view', products)(dispatch, getState)

    expect(dispatch).toBeCalledTimes(3)
    expect(closeSidesModalSpy).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(closeSidesModalMock)
  })

  test('should dispatch products update', async () => {
    await checkoutWithSides('menu', 'view', products)(dispatch, getState)

    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_BASKET_PRODUCTS',
      products,
      trackingData: {
        actionType: 'SET_BASKET_PRODUCTS',
        productIds: Object.keys(products),
        section: 'menu',
        view: 'view',
      },
    })
  })

  test('should dispatch checkoutBasket with with section and view', async () => {
    const checkoutBasketMock = jest.fn()
    checkoutBasketSpy.mockReturnValue(checkoutBasketMock)

    await checkoutWithSides('menu', 'view', products)(dispatch, getState)

    expect(dispatch).toBeCalledTimes(3)
    expect(checkoutBasketSpy).toHaveBeenCalledWith('menu', 'view')
    expect(dispatch).toHaveBeenCalledWith(checkoutBasketMock)
  })

  describe('when no products are submitted', () => {
    test('should dispatch checkoutBasket with with section and view', async () => {
      const checkoutBasketMock = jest.fn()
      checkoutBasketSpy.mockReturnValue(checkoutBasketMock)

      await checkoutWithSides('menu', 'view', null)(dispatch, getState)

      expect(dispatch).toBeCalledTimes(2)
      expect(checkoutBasketSpy).toHaveBeenCalledWith('menu', 'view')
      expect(dispatch).toHaveBeenCalledWith(checkoutBasketMock)
    })
  })
})
