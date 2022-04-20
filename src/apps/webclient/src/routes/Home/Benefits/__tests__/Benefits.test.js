import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { Benefits } from '../Benefits'

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
  OptimizelyFeature: () => null,
}))

describe('Benefits', () => {
  let wrapper

  beforeEach(() => {
    const mockStore = configureMockStore()
    const mockedStore = mockStore({
      auth: Immutable.fromJS({}),
    })
    wrapper = mount(
      <Provider store={mockedStore}>
        <Benefits byId="noLockIn" />
      </Provider>
    )
  })

  test('should render correctly', () => {
    expect(wrapper.find('.row')).toHaveLength(1)
  })
})
