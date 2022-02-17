import React from 'react'
import { mount } from 'enzyme'
import { ApplyVoucherPage } from '../ApplyVoucherPage'

describe('Given ApplyVoucherPage', () => {
  let wrapper

  const signupApplyVoucherGoToDeliveries = jest.fn()
  const trackUTMAndPromoCode = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <ApplyVoucherPage
        signupApplyVoucherGoToDeliveries={signupApplyVoucherGoToDeliveries}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
      />
    )
  })

  test('renders properly', () => {
    expect(wrapper.find('.customText').exists()).toBeTruthy()
    expect(wrapper.find('ExpandableSection').exists()).toBeTruthy()
    expect(wrapper.find('CheckoutButton').exists()).toBeTruthy()
    expect(wrapper.find('HeaderContent').exists()).toBeTruthy()
  })

  describe('when Apply voucher CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('button').find({ 'data-testing': 'applyVoucherCTA' }).simulate('click')
    })

    test('then signupApplyVoucherGoToDeliveries should be called', () => {
      expect(signupApplyVoucherGoToDeliveries).toHaveBeenCalled()
    })
  })
})
