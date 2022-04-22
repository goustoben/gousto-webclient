import React from 'react'
import { shallow } from 'enzyme'
import { browserHistory } from 'react-router'
import { PromoModal } from 'components/PromoModal/PromoModal'
import {
  clickClaimDiscountPopup,
  clickCloseDiscountFailurePopup,
  clickEnterPromoCodeManuallyButton,
} from 'actions/trackingKeys'

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
    jest.clearAllMocks()
    wrapper = shallow(<PromoModal {...props} />)
  })

  test('should be rendered properly', () => {
    expect(wrapper.find('Modal').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('.errorSubHeader').exists()).toBeFalsy()
    expect(wrapper.find('CTA')).toHaveLength(1)
    expect(wrapper.find('EnterPromoCodeManuallyButton')).toHaveLength(1)
  })

  describe('when CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('then proper actions should be called', () => {
      expect(trackUTMAndPromoCode).toBeCalledWith(clickClaimDiscountPopup, null)
      expect(promoApply).toBeCalled()
    })
  })

  describe('when the enter-manually button is clicked', () => {
    beforeEach(() => {
      browserHistory.push = jest.fn()
      wrapper.find('EnterPromoCodeManuallyButton').simulate('click')
    })

    test('then proper actions should be called', () => {
      expect(trackUTMAndPromoCode).toBeCalledWith(clickEnterPromoCodeManuallyButton)
      expect(closeModal).toHaveBeenCalled()
      expect(browserHistory.push).toHaveBeenCalledWith('/signup/enter-discount-code')
    })
  })

  describe('when error prop is defined', () => {
    beforeEach(() => {
      wrapper.setProps({
        error: 'error',
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

  describe('when isGoustoOnDemandError prop is true', () => {
    const promoResetGoustoOnDemandFlow = jest.fn()
    browserHistory.push = jest.fn()

    beforeEach(() => {
      wrapper.setProps({
        isGoustoOnDemandError: true,
        promoResetGoustoOnDemandFlow,
      })
      wrapper.find('CTA').simulate('click')
    })

    test('then proper action should be invoked on CTA click', () => {
      expect(promoResetGoustoOnDemandFlow).toBeCalled()
      expect(browserHistory.push).toHaveBeenCalledWith('/')
    })
  })
})
