import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { WelcomeContainer } from '../WelcomeContainer'

describe('Given WelcomeContainer', () => {
  let wrapper

  const state = {
    user: Immutable.fromJS({
      orders: {
        12345: {
          humanDeliveryDate: '12-12-2020',
          deliverySlot: '1',
          shouldCutoffAt: '12',
        }
      },
    }),
    request: Immutable.fromJS({
      browser: 'mobile',
    }),
    features: Immutable.fromJS({
      isGoustoOnDemandEnabled: {
        value: false,
      },
    }),
  }

  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<WelcomeContainer store={store} params={{ orderId: '12345' }} />)
  })

  describe('When WelcomeContainer is rendered', () => {
    test('Then should be rendered properly', () => {
      const expected = {
        isGoustoOnDemandEnabled: false,
      }
      expect(wrapper.find('Welcome').props()).toEqual(expect.objectContaining(expected))
    })
  })
})
