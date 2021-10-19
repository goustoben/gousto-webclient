import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import menuBoxPrices from 'routes/BoxPrices/__tests__/__mocks__/menuBoxPrices.json'
import { HomeContainer, getKnownVariant } from '../HomeContainer'

jest.mock('config/home', () => ({
  homeConfig: {
    whyGousto: {
      steps: [],
    },
    CTA: {
      text: 'cta',
    },
  },
  knownVariants: ['default', 'test'],
  defaultVariant: 'default',
}))

describe('HomeContainer', () => {
  let wrapper
  const initialState = {
    auth: Immutable.fromJS({
      isAuthenticated: false,
    }),
    menuBoxPrices: Immutable.fromJS(menuBoxPrices),
    features: Immutable.Map({
      isSignupReductionEnabled: Immutable.fromJS({
        value: false,
      }),
    }),
  }
  const redirectLoggedInUser = jest.fn()

  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<HomeContainer store={store} redirectLoggedInUser={redirectLoggedInUser} />)
  })

  test('should be rendered properly', () => {
    const expected = {
      isAuthenticated: false,
    }
    expect(wrapper.props()).toEqual(expect.objectContaining(expected))
  })

  test('should pass pricePerServing', () => {
    const expected = {
      pricePerServing: '2.98',
    }

    expect(wrapper.props()).toEqual(expect.objectContaining(expected))
  })

  describe('getKnownVariant', () => {
    let variant

    describe('when given a known variant', () => {
      test('should return the given variant', () => {
        variant = getKnownVariant('test')

        expect(variant).toEqual('test')
      })
    })

    describe('when given an unknown variant', () => {
      test('should return the default variant', () => {
        variant = getKnownVariant('alternate')

        expect(variant).toEqual('default')
      })
    })
  })
})
