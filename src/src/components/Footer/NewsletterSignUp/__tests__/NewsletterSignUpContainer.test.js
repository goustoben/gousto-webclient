import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import NewsletterSignUpContainer from '../NewsletterSignUpContainer'

describe('NewsletterSignUpContainer', () => {
  let wrapper

  const defaultState = {
    newsletterSignup: Immutable.fromJS({
      success: true,
    }),
  }

  const store = {
    getState: () => defaultState,
    dispatch: () => {},
    subscribe: () => {},
  }

  beforeEach(() => {
    wrapper = shallow(<NewsletterSignUpContainer store={store} />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('NewsletterSignUp').prop('signup').get('success')).toBe(true)
  })
})
