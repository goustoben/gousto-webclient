import React from 'react'
import { shallow } from 'enzyme'
import { CheckoutButton } from '../CheckoutButton'

describe('CheckoutButton', () => {
  let wrapper
  const onClick = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <CheckoutButton
        stepName="go to delivery"
        onClick={onClick}
      />
    )
  })

  test('Should render correctly', () => {
    expect(wrapper.find('Button').exists()).toBeTruthy()
  })

  describe('When Button is clicked', () => {
    beforeEach(() => {
      wrapper.find('Button').simulate('click')
    })

    test('Then onClick should be called', () => {
      expect(onClick).toHaveBeenCalled()
    })
  })

  describe('When isCheckoutOverhaulEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCheckoutOverhaulEnabled: true
      })
    })

    test('Then should render CTA', () => {
      expect(wrapper.find('CTA').exists()).toBeTruthy()
      expect(wrapper.find('Button').exists()).toBeFalsy()
    })

    describe('When Button is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('Then onClick should be called', () => {
        expect(onClick).toHaveBeenCalled()
      })
    })
  })
})
