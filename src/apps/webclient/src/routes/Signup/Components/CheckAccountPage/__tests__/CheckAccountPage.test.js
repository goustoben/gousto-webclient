import React from 'react'
import { shallow, mount } from 'enzyme'
import { CheckAccountPage } from '../CheckAccountPage'

describe('CheckAccountPage', () => {
  let wrapper

  const signupCheckAccountGoToBoxPrices = jest.fn()
  const signupCheckAccountLogin = jest.fn()
  const redirect = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CheckAccountPage
        signupCheckAccountGoToBoxPrices={signupCheckAccountGoToBoxPrices}
        signupCheckAccountLogin={signupCheckAccountLogin}
        redirect={redirect}
        isAuthenticated={false}
      />,
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('CheckoutButton')).toHaveLength(2)
    expect(wrapper.find('CheckoutButton').at(0).prop('children')).toBe('Yes, I’m a new customer')
    expect(wrapper.find('CheckoutButton').at(1).prop('children')).toBe(
      'No, I already have an account',
    )
  })

  describe('when "new customer" button is clicked', () => {
    beforeEach(() => {
      wrapper.find('CheckoutButton').at(0).simulate('click')
    })

    test('then it should go to box prices step', () => {
      expect(signupCheckAccountGoToBoxPrices).toHaveBeenCalled()
    })
  })

  describe('when "existing customer" button is clicked', () => {
    beforeEach(() => {
      wrapper.find('CheckoutButton').at(1).simulate('click')
    })

    test('then it should open the login modal', () => {
      expect(signupCheckAccountLogin).toHaveBeenCalled()
    })
  })

  describe('when the user is logged in', () => {
    beforeEach(() => {
      wrapper = mount(
        <CheckAccountPage
          signupCheckAccountGoToBoxPrices={signupCheckAccountGoToBoxPrices}
          signupCheckAccountLogin={signupCheckAccountLogin}
          redirect={redirect}
          isAuthenticated
        />,
      )
    })

    test('then it should not render a page', () => {
      expect(wrapper.find('CheckoutButton')).toHaveLength(0)
    })

    test('instead, it should redirect to apply-voucher', () => {
      expect(redirect).toHaveBeenCalledWith('/signup/apply-voucher')
    })
  })
})
