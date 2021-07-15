import React from 'react'
import { shallow } from 'enzyme'
import { PromoModalRedesign } from 'components/PromoModal/PromoModalRedesign'
import { clickClaimDiscountPopup } from 'actions/trackingKeys'

describe('given PromoModalRedesign', () => {
  let wrapper
  const onClick = jest.fn()
  const trackUTMAndPromoCode = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <PromoModalRedesign
        onClick={onClick}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
      />
    )
  })

  test('should be rendered properly', () => {
    expect(wrapper.find('.hideScroll').exists()).toBeTruthy()
    expect(wrapper.find('Modal').exists()).toBeTruthy()
    expect(wrapper.find('img').exists()).toBeTruthy()
    expect(wrapper.find('CTA').exists()).toBeTruthy()
  })

  describe('when user clicks claim my discount cta', () => {
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('then trackUTMAndPromoCode should be called with a proper parameter', () => {
      expect(trackUTMAndPromoCode).toHaveBeenCalledWith(clickClaimDiscountPopup)
    })

    test('then onClick should be called', () => {
      expect(onClick).toHaveBeenCalled()
    })
  })
})
