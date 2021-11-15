import Immutable from 'immutable'
import { loadNextProjectedOrder } from "routes/Account/MyGousto/actions/loadNextProjectedOrder/loadNextProjectedOrder"
import { fetchProjectedDeliveries } from "routes/Account/apis/subscription/fetchProjectedDeliveries"

jest.mock('../../apis/subscription')

const ACTION_TYPE = 'LOAD_NEXT_PROJECTED_ORDER'

const RESPONSE_EMPTY = {
  data: {
    data: {
      projectedDeliveries: [],
    },
  },
}

const DELIVERY_1_NOT_SKIPPED = {
  deliveryDate: '2021-08-03',
  skipped: false,
  menuOpenDate: '2021-07-20T12:00:00.000Z'
}

const DELIVERY_2_NOT_SKIPPED = {
  deliveryDate: '2021-08-10',
  skipped: false,
  menuOpenDate: '2021-07-27T12:00:00.000Z'
}

const RESPONSE_NONE_SKIPPED = {
  data: {
    data: {
      projectedDeliveries: [
        DELIVERY_1_NOT_SKIPPED,
        DELIVERY_2_NOT_SKIPPED,
        {
          deliveryDate: '2021-08-17',
          skipped: false,
          menuOpenDate: '2021-08-03T12:00:00.000Z'
        },
      ],
    },
  },
}

const RESPONSE_ALL_SKIPPED = {
  data: {
    data: {
      projectedDeliveries: [
        {
          deliveryDate: '2021-08-03',
          skipped: true,
          menuOpenDate: '2021-07-20T12:00:00.000Z'
        },
        {
          deliveryDate: '2021-08-10',
          skipped: true,
          menuOpenDate: '2021-07-27T12:00:00.000Z'
        },
        {
          deliveryDate: '2021-08-17',
          skipped: true,
          menuOpenDate: '2021-08-03T12:00:00.000Z'
        },
      ],
    },
  },
}

const RESPONSE_SOME_SKIPPED = {
  data: {
    data: {
      projectedDeliveries: [
        {
          deliveryDate: '2021-08-03',
          skipped: true,
          menuOpenDate: '2021-07-20T12:00:00.000Z'
        },
        DELIVERY_2_NOT_SKIPPED,
        {
          deliveryDate: '2021-08-17',
          skipped: true,
          menuOpenDate: '2021-08-03T12:00:00.000Z'
        },
      ],
    },
  },
}

const ACCESS_TOKEN = 'access-token'
const USER_ID = '1234'
const STATE = {
  auth: Immutable.fromJS({ accessToken: ACCESS_TOKEN }),
  user: Immutable.fromJS({ id: USER_ID }),
}

const dispatch = jest.fn()
const getState = jest.fn().mockReturnValue(STATE)

describe('Given loadNextProjectedOrder action is called', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('When api call returns no projected orders', () => {
    beforeEach(async () => {
      fetchProjectedDeliveries.mockResolvedValueOnce(RESPONSE_EMPTY)
      await loadNextProjectedOrder()(dispatch, getState)
    })

    test('it dispatches null', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ACTION_TYPE,
        payload: { nextProjectedOrder: null },
      })
    })
  })

  describe('When api call returns projected orders', () => {
    describe('and none of them are skipped', () => {
      beforeEach(async () => {
        fetchProjectedDeliveries.mockResolvedValueOnce(RESPONSE_NONE_SKIPPED)
        await loadNextProjectedOrder()(dispatch, getState)
      })

      test('it dispatches the first projected order', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ACTION_TYPE,
          payload: { nextProjectedOrder: DELIVERY_1_NOT_SKIPPED },
        })
      })
    })

    describe('and some of them are skipped', () => {
      beforeEach(async () => {
        fetchProjectedDeliveries.mockResolvedValueOnce(RESPONSE_SOME_SKIPPED)
        await loadNextProjectedOrder()(dispatch, getState)
      })

      test('it dispatches the first one that is not skipped', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ACTION_TYPE,
          payload: { nextProjectedOrder: DELIVERY_2_NOT_SKIPPED },
        })
      })
    })

    describe('and all of them are skipped', () => {
      beforeEach(async () => {
        fetchProjectedDeliveries.mockResolvedValueOnce(RESPONSE_ALL_SKIPPED)
        await loadNextProjectedOrder()(dispatch, getState)
      })

      test('it dispatches null', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: ACTION_TYPE,
          payload: { nextProjectedOrder: null },
        })
      })
    })
  })

  describe('When api call returns an unexpected format', () => {
    beforeEach(async () => {
      fetchProjectedDeliveries.mockResolvedValueOnce({})
      await loadNextProjectedOrder()(dispatch, getState)
    })

    test('it dispatches null', () => {
      expect(dispatch).toHaveBeenCalledWith({
        type: ACTION_TYPE,
        payload: { nextProjectedOrder: null },
      })
    })
  })
})
