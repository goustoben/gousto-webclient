import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { DiscountAppliedBarContainer } from '../DiscountAppliedBarContainer'

describe('given DiscountAppliedBarContainer is rendered', () => {
  let wrapper

  const state = {
    promoModalVisible: false,
    auth: Immutable.fromJS({
      isAuthenticated: false,
    }),
    basket: Immutable.fromJS({}),
    error: Immutable.fromJS({}),
    signup: Immutable.fromJS({}),
  }

  const store = {
    getState: () => state,
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<DiscountAppliedBarContainer store={store} />)
  })

  test('then it should pass the correct props', () => {
    expect(wrapper.props()).toMatchObject({
      promoModalVisible: false,
      isPromoBarHidden: false,
      isDiscountAppliedBarDismissed: false,
      trackDiscountVisibility: expect.any(Function),
      signupDismissDiscountAppliedBar: expect.any(Function),
    })
  })
})
