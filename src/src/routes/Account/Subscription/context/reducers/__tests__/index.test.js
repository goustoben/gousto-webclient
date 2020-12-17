import {
  SubscriptionReducer,
  actionTypes,
  ENTITIES
} from '../index'

import {
  reduceSubscriptionPageData,
  reduceSubscriptionUpdateData,
  reduceSubscriptionStatusUpdate
} from '../subscription'
import { reduceCurrentUserData } from '../currentUser'
import { reduceLoadingState } from '../loading'
import { reduceBoxPricesData } from '../box'
import { reduceOrdersData } from '../orders'

jest.mock('../subscription')
jest.mock('../loading')
jest.mock('../currentUser')
jest.mock('../box')
jest.mock('../orders')

const mockState = 'INITIAL STATE'
const mockData = 'MOCK DATA'

describe('SubscriptionReducer', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('Given subscription data action is received', () => {
    beforeEach(() => {
      SubscriptionReducer(mockState, {
        type: actionTypes.SUBSCRIPTION_DATA_RECEIVED,
        data: mockData
      })
    })

    test('Then reduceSubscriptionPageData is invoked as expected', () => {
      expect(reduceSubscriptionPageData).toHaveBeenCalledWith(mockState, mockData)
    })
  })

  describe('Given subscription update data action is received', () => {
    beforeEach(() => {
      SubscriptionReducer(mockState, {
        type: actionTypes.SUBSCRIPTION_UPDATE_DATA_RECEIVED,
        data: mockData
      })
    })

    test('Then reduceSubscriptionPageData is invoked as expected', () => {
      expect(reduceSubscriptionUpdateData).toHaveBeenCalledWith(mockState, mockData)
    })
  })

  describe('Given current user update data action is received', () => {
    beforeEach(() => {
      SubscriptionReducer(mockState, {
        type: actionTypes.CURRENT_USER_DATA_RECEIVED,
        data: mockData
      })
    })

    test('Then reduceSubscriptionPageData is invoked as expected', () => {
      expect(reduceCurrentUserData).toHaveBeenCalledWith(mockState, mockData)
    })
  })

  describe('Given subscription status update action is received', () => {
    beforeEach(() => {
      SubscriptionReducer(mockState, {
        type: actionTypes.SUBSCRIPTION_STATUS_UPDATE_RECEIVED,
        data: { state: 'inactive' }
      })
    })

    test('Then reduceSubscriptionPageData is invoked as expected', () => {
      expect(reduceSubscriptionStatusUpdate).toHaveBeenCalledWith(mockState, { state: 'inactive' })
    })
  })

  describe('Given subscription loading action is received', () => {
    beforeEach(() => {
      SubscriptionReducer(mockState, {
        type: actionTypes.DELIVERIES_DATA_LOADING,
        data: mockData
      })
    })

    test('Then reduceSubscriptionPageData is invoked as expected', () => {
      expect(reduceLoadingState).toHaveBeenCalledWith(mockState, ENTITIES.DELIVERIES)
    })
  })

  describe('Given subscription loading action is received', () => {
    beforeEach(() => {
      SubscriptionReducer(mockState, {
        type: actionTypes.BOX_PRICES_DATA_RECEIVED,
        data: mockData
      })
    })

    test('Then reduceBoxPricesData is invoked as expected', () => {
      expect(reduceBoxPricesData).toHaveBeenCalledWith(mockState, mockData)
    })
  })

  describe('Given orders data received action is received', () => {
    beforeEach(() => {
      SubscriptionReducer(mockState, {
        type: actionTypes.ORDERS_DATA_RECEIVED,
        data: mockData
      })
    })

    test('Then reduceOrdersData is invoked as expected', () => {
      expect(reduceOrdersData).toHaveBeenCalledWith(mockState, mockData)
    })
  })

  describe('Given unrelated action is received', () => {
    let result

    beforeEach(() => {
      result = SubscriptionReducer(mockState, {
        type: 'SOME_OTHER_ACTION_TYPE',
      })
    })

    test('Then reduceSubscriptionPageData is invoked as expected', () => {
      expect(result).toEqual(mockState)
    })
  })
})
