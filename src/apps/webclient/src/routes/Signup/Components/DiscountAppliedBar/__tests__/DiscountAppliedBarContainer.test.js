import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import { DiscountAppliedBarContainer } from '../LEGACY_DiscountAppliedBarContainer'

describe('given DiscountAppliedBarContainer is rendered', () => {
  let wrapper

  const mockStore = configureMockStore()
  const store = mockStore({
    promoModalVisible: false,
    auth: Immutable.fromJS({
      isAuthenticated: false,
    }),
    basket: Immutable.fromJS({}),
    error: Immutable.fromJS({}),
    signup: Immutable.fromJS({}),
  })

  beforeEach(() => {
    wrapper = shallow(<DiscountAppliedBarContainer store={store} />)
  })

  test('then it should pass the correct props', () => {
    expect(wrapper.find('DiscountAppliedBar').props()).toMatchObject({
      promoModalVisible: false,
      isPromoBarHidden: false,
      isDiscountAppliedBarDismissed: false,
      trackDiscountVisibility: expect.any(Function),
      signupDismissDiscountAppliedBar: expect.any(Function),
    })
  })
})
