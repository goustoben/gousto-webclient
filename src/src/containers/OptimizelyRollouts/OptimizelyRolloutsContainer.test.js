import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { OptimizelyRolloutsContainer } from './OptimizelyRolloutsContainer'

describe('OptimizelyRolloutsContainer', () => {
  let wrapper
  test('should pass down correct props', () => {
    const state = {
      auth: Immutable.Map({
        id: '88ca946c-1111-4201-8e1a-b68f9ec582h5'
      }),
    }
    wrapper = shallow(<OptimizelyRolloutsContainer />, {
      context: {
        store: {
          getState: () => state,
          dispatch: () => {},
          subscribe: () => {}
        }
      }
    })
    expect(wrapper.find('OptimizelyRollouts').props()).toEqual({
      sessionId: null,
      authUserId: '88ca946c-1111-4201-8e1a-b68f9ec582h5',
      featureEnabled: false,
      children: null,
      trackExperimentInSnowplow: expect.any(Function)
    })
  })
})
