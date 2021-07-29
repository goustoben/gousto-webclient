import { fromJS } from 'immutable'
import {
  getNextOrder,
  getNextProjectedOrder,
  getPreviousOrder,
  getIsOrdersPending,
  getIsProjectedDeliveriesPending,
} from '.'

const PROJECTED_DELIVERY = {
  deliveryDate: '2021-08-03',
  skipped: false,
  menuOpenDate: '2021-07-20T12:00:00.000Z'
}

const NEXT_ORDER = {
  field: 'a',
}

const PREVIOUS_ORDER = {
  field: 'b',
}

const PENDING_MY_GOUSTO_LOAD_ORDERS = 'MY_GOUSTO_LOAD_ORDERS true or false'
const PENDING_LOAD_NEXT_PROJECTED_ORDER = 'LOAD_NEXT_PROJECTED_ORDER true or false'

const STATE = {
  myGousto: fromJS({
    nextOrder: NEXT_ORDER,
    nextProjectedOrder: PROJECTED_DELIVERY,
    previousOrder: PREVIOUS_ORDER,
  }),
  pending: fromJS({
    MY_GOUSTO_LOAD_ORDERS: PENDING_MY_GOUSTO_LOAD_ORDERS,
    LOAD_NEXT_PROJECTED_ORDER: PENDING_LOAD_NEXT_PROJECTED_ORDER,
  })
}

describe('My Gousto selectors', () => {
  let result

  describe.each([
    ['getNextOrder', getNextOrder, STATE.myGousto.get('nextOrder')],
    ['getNextProjectedOrder', getNextProjectedOrder, PROJECTED_DELIVERY],
    ['getPreviousOrder', getPreviousOrder, STATE.myGousto.get('previousOrder')],
    ['getIsOrdersPending', getIsOrdersPending, PENDING_MY_GOUSTO_LOAD_ORDERS],
    ['getIsProjectedDeliveriesPending', getIsProjectedDeliveriesPending, PENDING_LOAD_NEXT_PROJECTED_ORDER],
  ])('Given %s is called', (_selectorName, selector, expectedResult) => {
    beforeEach(() => {
      result = selector(STATE)
    })

    test('gets the corresponding value from the store', () => {
      expect(result).toEqual(expectedResult)
    })
  })
})
