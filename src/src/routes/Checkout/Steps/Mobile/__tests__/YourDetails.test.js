import React from 'react'
import { shallow } from 'enzyme'

import { YourDetailsStep } from '../YourDetails/YourDetails'
import CheckoutButton from '../../../Components/CheckoutButton'

describe('YourDetailsStep', () => {
  let wrapper
  const trackUTMAndPromoCode = jest.fn()
  const userProspect = jest.fn()
  const submit = jest.fn()
  const trackClick = jest.fn()
  const props = {
    trackUTMAndPromoCode,
    userProspect,
    submit,
    trackClick,
    stepName: '',
    formValues: {
      delivery: {
        confirmed: true
      }
    }
  }

  beforeEach(() => {
    wrapper = shallow(<YourDetailsStep {...props} />)
  })

  test('should render by default', () => {
    expect(wrapper).toBeDefined()
  })

  test('should have CheckoutButton button', () => {
    expect(wrapper.find(CheckoutButton)).toHaveLength(2)
  })

  describe('when CheckoutButton clicked', () => {
    describe('and checkoutValid is false', () => {
      test('then trackUTMAndPromoCode should not be called', () => {
        expect(submit).not.toBeCalled()
        expect(trackUTMAndPromoCode).not.toBeCalled()
        wrapper.find(CheckoutButton).at(0).simulate('click')
        expect(submit).toBeCalled()
        expect(trackUTMAndPromoCode).not.toBeCalled()
      })
    })

    describe('and checkoutValid is true', () => {
      beforeEach(() => {
        wrapper.setProps({ checkoutValid: true })
        jest.clearAllMocks()
      })

      test('then trackUTMAndPromoCode should be called with a proper parameter', () => {
        expect(trackUTMAndPromoCode).not.toBeCalled()
        expect(userProspect).not.toBeCalled()
        expect(submit).not.toBeCalled()
        wrapper.find(CheckoutButton).at(0).simulate('click')
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith('clickNextPayment', 'top')
        expect(userProspect).toBeCalled()
        expect(submit).toBeCalled()
        wrapper.find(CheckoutButton).at(1).simulate('click')
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith('clickNextPayment', 'bottom')
      })
    })
  })
})
