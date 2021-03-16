import React from 'react'
import { shallow } from 'enzyme'
import { checkoutClickContinueToPayment } from 'actions/trackingKeys'
import { YourDetailsStep } from '../YourDetails'
import { CheckoutButton } from '../../../../Components/CheckoutButton'

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
    expect(wrapper.find(CheckoutButton)).toHaveLength(1)
  })

  describe('when CheckoutButton clicked', () => {
    describe('and checkoutValid is false', () => {
      test('then trackUTMAndPromoCode should not be called', () => {
        expect(submit).not.toBeCalled()
        expect(trackUTMAndPromoCode).not.toBeCalled()
        wrapper.find(CheckoutButton).simulate('click')
        expect(submit).toBeCalled()
        expect(trackUTMAndPromoCode).not.toBeCalled()
      })
    })

    describe('and checkoutValid is true', () => {
      beforeEach(() => {
        wrapper.setProps({ checkoutValid: true })
        jest.clearAllMocks()
        expect(trackUTMAndPromoCode).not.toBeCalled()
        expect(userProspect).not.toBeCalled()
        expect(submit).not.toBeCalled()
        wrapper.find(CheckoutButton).first().simulate('click')
      })

      test('then trackUTMAndPromoCode should be called with a proper parameter', () => {
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(checkoutClickContinueToPayment, 'top')
        expect(userProspect).toBeCalled()
        expect(submit).toBeCalled()
      })
    })
  })
})
