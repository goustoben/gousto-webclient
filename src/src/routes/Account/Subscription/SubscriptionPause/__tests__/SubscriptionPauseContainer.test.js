import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'

import userActions from 'actions/user'
import SubscriptionPauseContainer from '../SubscriptionPauseContainer'

jest.mock('actions/subscriptionPause')
jest.mock('actions/user')

const store = {
  getState: () => ({
    subscriptionPause: Immutable.Map({
      reasons: [1, 2, 3],
      inProgress: true,
      activeReasons: Immutable.List([]),
      startScreen: Immutable.List([]),
      chosenReasonIds: Immutable.List([]),
    }),
    pending: []
  }),
  dispatch: () => { },
  subscribe: () => { }
}
const mockReduxContext = {
  context: {
    store
  }
}

describe('Given the SubscriptionPauseContainer is rendered', () => {
  beforeEach(() => {
    mount(
      <Provider store={store}>
        <SubscriptionPauseContainer />
      </Provider>,
      mockReduxContext
    )
  })

  test('Then SubscriptionPause should fetch new orders as expected', () => {
    expect(userActions.userLoadNewOrders).toHaveBeenCalledTimes(1)
  })
})
