import React from 'react'
import { shallow } from 'enzyme'
import { PromoModal } from 'components/PromoModal/PromoModal'
import { clickClaimDiscountPopup, clickCloseDiscountFailurePopup } from 'actions/trackingKeys'

describe('Given PromoModal component', () => {
  let wrapper
  const promoApply = jest.fn()
  const trackUTMAndPromoCode = jest.fn()
  const closeModal = jest.fn()

  const props = {
    buttonText: 'button',
    closeModal,
    text: 'text',
    title: 'title',
    error: '',
    trackUTMAndPromoCode,
    promoApply,
  }

  beforeEach(() => {
    wrapper = shallow(<PromoModal {...props} />)
  })

  test('should be rendered properly', () => {
    expect(wrapper.find('Modal').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('.errorSubHeader').exists()).toBeFalsy()
    expect(wrapper.find('CTA').exists()).toBeTruthy()
  })

  describe('when CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('then proper actions should be called', () => {
      expect(trackUTMAndPromoCode).toBeCalledWith(clickClaimDiscountPopup)
      expect(promoApply).toBeCalled()
    })
  })

  describe('when error prop is defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        error: 'error'
      })
    })

    test('then header image should not be rendered', () => {
      expect(wrapper.find('img').exists()).toBeFalsy()
      expect(wrapper.find('.errorSubHeader').exists()).toBeTruthy()
    })

    describe('and CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('then proper actions should be called', () => {
        expect(trackUTMAndPromoCode).toBeCalledWith(clickCloseDiscountFailurePopup)
        expect(closeModal).toBeCalled()
      })
    })
  })
})
