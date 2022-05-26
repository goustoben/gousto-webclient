import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { BoxSizeStepContainer } from '../BoxSize/BoxSizeStepContainer'

describe('BoxSizeStepContainer', () => {
  let wrapper

  const menuBoxPrices = Immutable.Map({
    testMenuBoxPrices: 1,
  })

  const initialState = {
    menuBoxPrices,
    pending: Immutable.fromJS({}),
    basket: Immutable.fromJS({}),
  }

  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<BoxSizeStepContainer store={store} next={jest.fn()} />)
  })

  test('should be rendered properly', () => {
    const expected = {
      menuBoxPrices,
    }
    expect(wrapper.find('BoxSizeStep').props()).toEqual(expect.objectContaining(expected))
  })
})
