import Immutable from 'immutable'
import * as orderConfirmation from 'actions/orderConfirmation'
import * as menuCheckoutClick from '../menuCheckoutClick'
import { checkoutWithSides } from '../menuSidesCheckoutClick'
import * as sidesAction from '../sides'

describe('checkoutWithSides', () => {
  let state
  const dispatch = jest.fn()
  const getState = jest.fn()
  let closeSidesModalSpy
  let orderConfirmationSpy
  let orderConfirmationRedirectMock

  const products = {
    product_1: 2,
    product_2: 2,
  }
  const orderId = 'order-id'

  beforeEach(() => {
    state = {
      basket: Immutable.fromJS({
        orderId,
      }),
      auth: Immutable.fromJS({
        id: 'user_id',
        isAuthenticated: true
      }),
      user: Immutable.fromJS({
        orders: Immutable.List([]),
      }),
    }

    getState.mockReturnValue(state)

    orderConfirmationRedirectMock = jest.fn()
    closeSidesModalSpy = jest.spyOn(sidesAction, 'closeSidesModal').mockImplementation()
    jest.spyOn(menuCheckoutClick, 'isOrderApiUpdateEnabled').mockResolvedValue(true)
    orderConfirmationSpy = jest.spyOn(orderConfirmation, 'orderConfirmationRedirect').mockReturnValue(orderConfirmationRedirectMock)
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
    expect(orderConfirmationSpy).toBeCalledWith('order-id', 'recipe-choice')
    expect(dispatch).toHaveBeenCalledWith(orderConfirmationRedirectMock)
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

  describe('when no products are submitted', () => {
    test('should dispatch checkoutBasket with with section and view', async () => {
      await checkoutWithSides('menu', 'view', null)(dispatch, getState)

      expect(dispatch).toBeCalledTimes(2)
      expect(orderConfirmationSpy).toBeCalledWith('order-id', 'recipe-choice')
      expect(dispatch).toHaveBeenCalledWith(orderConfirmationRedirectMock)
    })
  })
})
