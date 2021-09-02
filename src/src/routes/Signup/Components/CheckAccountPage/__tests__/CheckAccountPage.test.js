import React from 'react'
import { shallow } from 'enzyme'
import { CheckAccountPage } from '../CheckAccountPage'

describe('CheckAccountPage', () => {
  let wrapper

  const signupCheckAccountGoToBoxPrices = jest.fn()
  const signupCheckAccountLogin = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CheckAccountPage
        signupCheckAccountGoToBoxPrices={signupCheckAccountGoToBoxPrices}
        signupCheckAccountLogin={signupCheckAccountLogin}
      />
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('CheckoutButton')).toHaveLength(2)
    expect(wrapper.find('CheckoutButton').at(0).prop('children')).toBe('Yes, I’m a new customer')
    expect(wrapper.find('CheckoutButton').at(1).prop('children')).toBe(
      'No, I already have an account'
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
})
