import React from 'react'
import { shallow } from 'enzyme'
import { clickClaimDiscountBar } from 'actions/trackingKeys'
import { applyPromoCodeAndShowModal } from 'actions/home'
import { redirect } from 'actions/redirect'
import { PromoBanner } from '../PromoBanner'

jest.mock('actions/home', () => ({
  applyPromoCodeAndShowModal: jest.fn(),
}))

jest.mock('actions/promos', () => ({
  promoChange: jest.fn(),
}))

jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))

describe('PromoBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PromoBanner />)
  })

  test('then DiscountBar component should be rendered', () => {
    expect(wrapper.find('DiscountBar').exists()).toBeTruthy()
  })

  describe('applyDiscount', () => {
    const trackUTMAndPromoCode = jest.fn()

    beforeEach(() => {
      wrapper.setProps({
        trackUTMAndPromoCode,
        applyPromoCodeAndShowModal,
        redirect,
      })
    })

    test('should not call trackUTMAndPromoCode by default', () => {
      expect(trackUTMAndPromoCode).not.toBeCalled()
    })

    test('should not call applyPromoCodeAndShowModal by default', () => {
      expect(applyPromoCodeAndShowModal).not.toBeCalled()
    })

    describe('when DiscountBar is clicked', () => {
      beforeEach(() => {
        wrapper.setProps({
          hide: false,
          trackUTMAndPromoCode,
        })
        wrapper.find('DiscountBar').props().applyDiscount()
      })

      test('then should dispatch applyPromoCodeAndShowModal, redirect, trackUTMAndPromoCode', () => {
        expect(applyPromoCodeAndShowModal).toHaveBeenCalled()
        expect(redirect).toHaveBeenCalledWith('/signup/box-size')
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(clickClaimDiscountBar)
      })
    })
  })
})
