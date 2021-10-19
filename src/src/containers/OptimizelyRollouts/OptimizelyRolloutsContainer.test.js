import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { OptimizelyRolloutsContainer } from './OptimizelyRolloutsContainer'

describe('OptimizelyRolloutsContainer', () => {
  let wrapper
  test('should pass down correct props', () => {
    const mockStore = configureMockStore()
    const store = mockStore({
      auth: Immutable.Map({
        id: '88ca946c-1111-4201-8e1a-b68f9ec582h5'
      }),
    })

    wrapper = shallow(<OptimizelyRolloutsContainer store={store} />)

    expect(wrapper.find('OptimizelyRollouts').props()).toEqual(expect.objectContaining({
      sessionId: null,
      authUserId: '88ca946c-1111-4201-8e1a-b68f9ec582h5',
      featureEnabled: false,
      children: null,
      trackExperimentInSnowplow: expect.any(Function)
    }))
  })
})
