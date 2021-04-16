import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { ErrorMessageContainer } from '../ErrorMessageContainer'

describe('ErrorMessageContainer', () => {
  let wrapper

  const initialState = {
    features: Immutable.Map({
      isCheckoutOverhaulEnabled: Immutable.Map({
        value: true,
      }),
    }),
  }

  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<ErrorMessageContainer store={store} errorType="user-exists" />)
  })

  describe('when ErrorMessageContainer is rendered with explicit errorType', () => {
    test('then should pass down this errorType', () => {
      expect(wrapper.props()).toEqual(
        expect.objectContaining({
          errorType: 'user-exists',
        })
      )
    })
  })
})
