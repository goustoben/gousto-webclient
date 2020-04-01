import React from 'react'
import { shallow } from 'enzyme'

import { SubmitButton } from '../../SubmitButton/SubmitButton'
import CheckoutButton from '../../CheckoutButton'

describe('SubmitButton', () => {
  let wrapper
  const props = {
    onClick: jest.fn(),
    trackUTMAndPromoCode: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<SubmitButton {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper).toBeDefined()
  })

  describe('when SubmitButton renders', () => {
    test('should have a CheckoutButton', () => {
      expect(wrapper.find(CheckoutButton).exists()).toBeTruthy()
    })

    test('should not call onClick by default', () => {
      expect(props.onClick).not.toBeCalled()
    })

    test('should not call trackUTMAndPromoCode by default', () => {
      expect(props.trackUTMAndPromoCode).not.toBeCalled()
    })
  })

  describe('when CheckoutButton clicked', () => {
    beforeEach(() => {
      expect(props.onClick).not.toBeCalled()
      expect(props.trackUTMAndPromoCode).not.toBeCalled()
      wrapper.find(CheckoutButton).simulate('click')
    })

    test('should call onClick and trackUTMAndPromoCode with a proper parameter', () => {
      expect(props.trackUTMAndPromoCode).toHaveBeenCalledWith('clickSubmitOrder')
      expect(props.onClick).toBeCalled()
    })
  })
})
