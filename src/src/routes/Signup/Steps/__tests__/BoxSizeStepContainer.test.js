import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { BoxSizeStepContainer } from '../BoxSize/BoxSizeStepContainer'

describe('BoxSizeStepContainer', () => {
  let wrapper

  const menuBoxPrices = Immutable.Map({
    testMenuBoxPrices: 1,
  })

  const lowestPricePerPortion = {
    forTwo: {},
    forFour: {},
  }

  const boxPrices = Immutable.Map({
    lowestPricePerPortion,
  })

  const initialState = {
    menuBoxPrices,
    features: Immutable.Map({
      isWizardPricePerServingEnabled: Immutable.Map({
        value: true,
      }),
    }),
    boxPrices,
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
      isWizardPricePerServingEnabled: true,
      lowestPricePerPortion,
    }
    expect(wrapper.props()).toEqual(expect.objectContaining(expected))
  })
})
