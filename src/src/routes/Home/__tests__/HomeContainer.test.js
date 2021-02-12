import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { getKnownVariant } from 'routes/Home/HomeContainer'
import { HomeContainer } from '../HomeContainer'

jest.mock('config/home', () => ({
  defaultVariant: 'default',
  knownVariants: ['default', 'test'],
  whyGousto: {
    steps: [],
  },
  CTA: {
    text: 'cta',
  },
}))

describe('HomeContainer', () => {
  let wrapper
  const initialState = {
    auth: Immutable.fromJS({
      isAuthenticated: false,
    }),
    boxPrices: Immutable.fromJS({
      pricePerServing: '2.87',
    }),
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
      pricePerServing: '2.87',
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
