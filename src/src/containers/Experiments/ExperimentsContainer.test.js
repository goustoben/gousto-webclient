import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { safeJestMock } from '_testing/mocks'
import configureMockStore from 'redux-mock-store'
import * as experimentSelectors from 'selectors/experiments'
import { ExperimentsContainer } from './ExperimentsContainer'
import { Experiments } from './Experiments'

const mockedMakeGetExperimentByName = safeJestMock(experimentSelectors, 'makeGetExperimentByName')
const mockedIsFetchingExperiments = safeJestMock(experimentSelectors, 'isFetchingExperiments')

describe('ExperimentsContainer', () => {
  let wrapper

  beforeEach(() => {
    mockedMakeGetExperimentByName.mockReturnValue(() => Immutable.Map({
      mock: 'experiment'
    }))

    mockedIsFetchingExperiments.mockReturnValue(false)

    const mockStore = configureMockStore()
    const store = mockStore({})

    wrapper = shallow(
      <ExperimentsContainer experimentName="mock-experiment" store={store}>
        {() => null}
      </ExperimentsContainer>
    )
  })

  test('renders <Experiments /> with correct props', () => {
    expect(wrapper.find(Experiments).prop('experiment').toJS()).toEqual({
      mock: 'experiment'
    })
    expect(wrapper.find(Experiments).prop('isFetchingExperiments')).toBe(false)
    expect(wrapper.find(Experiments).prop('experimentName')).toBe('mock-experiment')
    expect(wrapper.find(Experiments).prop('fetchOrAssignUserToExperiment')).toBeInstanceOf(Function)
  })
})
