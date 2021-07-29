import { fromJS } from 'immutable'
import { findNewestOrder } from 'utils/order'
import { actionTypes } from '../../routes/Account/MyGousto/actions/actionTypes'
import { myGousto, initialState } from '../myGousto'

jest.mock('utils/order')

const NEXT_ORDER = {
  field: 'a',
}

const PREVIOUS_ORDER = {
  field: 'b',
}

const ORDERS = [PREVIOUS_ORDER, NEXT_ORDER]

findNewestOrder.mockImplementation((_orders, areFutureOrdersIncluded) => {
  if (areFutureOrdersIncluded) {
    return NEXT_ORDER
  }

  return PREVIOUS_ORDER
})

describe('myGousto reducer', () => {
  let newState

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when an action of type LOAD_NEXT_PROJECTED_ORDER is received', () => {
    const PROJECTED_DELIVERY = {
      deliveryDate: '2021-08-03',
      skipped: false,
      menuOpenDate: '2021-07-20T12:00:00.000Z'
    }

    beforeEach(() => {
      newState = myGousto(initialState, {
        type: actionTypes.LOAD_NEXT_PROJECTED_ORDER,
        payload: {
          nextProjectedOrder: PROJECTED_DELIVERY,
        }
      })
    })

    test('the new state.nextProjectedOrder has the projected delivery from the action stored', () => {
      expect(newState.get('nextProjectedOrder')).toEqual(fromJS(PROJECTED_DELIVERY))
    })
  })

  describe('when an action of type MY_GOUSTO_LOAD_ORDERS is received', () => {
    beforeEach(() => {
      newState = myGousto(initialState, {
        type: actionTypes.MY_GOUSTO_LOAD_ORDERS,
        payload: {
          orders: ORDERS,
        }
      })
    })

    test('the previous order is obtained correctly', () => {
      expect(findNewestOrder).toHaveBeenCalledWith(fromJS(ORDERS), false)
    })

    test('the previous order is obtained correctly', () => {
      expect(findNewestOrder).toHaveBeenCalledWith(fromJS(ORDERS), true)
    })

    test('the new state.previousOrder has the right order', () => {
      expect(newState.get('previousOrder')).toEqual(PREVIOUS_ORDER)
    })

    test('the new state.nextOrder has the right order', () => {
      expect(newState.get('nextOrder')).toEqual(NEXT_ORDER)
    })
  })
})
