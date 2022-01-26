import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { YourBoxDetailsContainer } from '../YourBoxDetailsContainer'

describe('YourBoxDetailsContainer', () => {
  let wrapper

  const initialState = {
    basket: Immutable.Map({
      numPortions: 2,
      numRecipes: 3,
    }),
  }

  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<YourBoxDetailsContainer store={store} />)
  })

  describe('Given initialState to YourBoxDetailsContainer component', () => {
    describe('When component is rendered', () => {
      test('Then should display data properly', () => {
        const { numPortions, numRecipes } = wrapper.find('YourBoxDetails').props()
        expect(numPortions).toBe(2)
        expect(numRecipes).toBe(3)
      })
    })
  })
})
