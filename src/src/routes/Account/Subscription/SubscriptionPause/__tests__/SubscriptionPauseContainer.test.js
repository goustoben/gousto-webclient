import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'

import userActions from 'actions/user'
import SubscriptionPauseContainer from '../SubscriptionPauseContainer'

jest.mock('actions/subscriptionPause')
jest.mock('actions/user')

const mockReduxContext = {
  context: {
    store: {
      getState: () => ({
        subscriptionPause: Immutable.Map({
          reasons: [1, 2, 3],
          inProgress: true
        })
      }),
      dispatch: () => { },
      subscribe: () => { }
    }
  }
}

describe('Given the SubscriptionPauseContainer is rendered', () => {
  beforeEach(() => {
    mount(<SubscriptionPauseContainer />, mockReduxContext)
  })

  test('Then SubscriptionPause should fetch new orders as expected', () => {
    expect(userActions.userLoadNewOrders).toHaveBeenCalledTimes(1)
  })
})
