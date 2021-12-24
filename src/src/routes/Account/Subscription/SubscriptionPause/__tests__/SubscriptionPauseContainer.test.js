import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { userLoadNewOrders } from 'actions/user'
import SubscriptionPauseContainer from '../SubscriptionPauseContainer'

jest.mock('actions/subscriptionPause', () => ({
  subscriptionPauseFetchReasons: jest.fn(() => ({ type: 'subscriptionPauseFetchReasons' })),
  fetchData: jest.fn(),
}))

jest.mock('actions/user', () => ({
  userLoadNewOrders: jest.fn(() => ({ type: 'userLoadNewOrders' })),
}))

const defaultState = {
  subscriptionPause: Immutable.Map({
    reasons: [1, 2, 3],
    inProgress: true,
    activeReasons: Immutable.Map(),
    startScreen: Immutable.List([]),
    chosenReasonIds: Immutable.List([]),
  }),
  pending: [],
  auth: Immutable.fromJS({
    isAuthenticated: false,
  }),
}

const getMockReduxContext = (state) => {
  const mockStore = configureMockStore()

  const store = mockStore(state)

  const mockReduxContext = {
    context: {
      store,
    },
  }

  return { mockReduxContext, store }
}

describe('Given the SubscriptionPauseContainer is rendered', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when the user is not authenticated', () => {
    beforeEach(() => {
      const { mockReduxContext, store } = getMockReduxContext(defaultState)
      mount(
        <Provider store={store}>
          <SubscriptionPauseContainer />
        </Provider>,
        mockReduxContext
      )
    })

    test('Then SubscriptionPause should not fetch new orders', () => {
      expect(userLoadNewOrders).not.toHaveBeenCalled()
    })
  })

  describe('when the user is authenticated ', () => {
    beforeEach(() => {
      const { mockReduxContext, store } = getMockReduxContext({
        ...defaultState,
        auth: Immutable.fromJS({
          isAuthenticated: true,
        }),
      })
      mount(
        <Provider store={store}>
          <SubscriptionPauseContainer />
        </Provider>,
        mockReduxContext
      )
    })

    test('Then SubscriptionPause should fetch new orders', () => {
      expect(userLoadNewOrders).toHaveBeenCalledTimes(1)
    })
  })
})
