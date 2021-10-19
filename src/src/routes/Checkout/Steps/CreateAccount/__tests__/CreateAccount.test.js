import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { CreateAccount } from '../CreateAccount'

describe('CreateAccount', () => {
  let wrapper
  const userProspect = jest.fn()
  const receiveRef = jest.fn()
  const submit = jest.fn()
  const trackUTMAndPromoCode = jest.fn()
  const onLoginClick = jest.fn()
  const props = {
    submit,
    userProspect,
    receiveRef,
    checkoutValid: false,
    trackUTMAndPromoCode,
    onLoginClick,
  }

  const state = {
    form: {},
    request: Immutable.fromJS({
      browser: 'mobile',
    }),
    checkout: Immutable.fromJS({
      errors: {},
    }),
  }

  const options = {
    context: {
      store: {
        getState: () => state,
        dispatch: () => {},
        subscribe: () => {},
      },
    },
  }

  beforeEach(() => {
    wrapper = mount(<CreateAccount {...props} />, options)
  })

  test('should render CreateAccount component', () => {
    expect(wrapper).toBeDefined()
  })
})
