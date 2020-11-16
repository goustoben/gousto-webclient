import React from 'react'
import { shallow } from 'enzyme'
import { clickClaimDiscountBar } from 'actions/trackingKeys'
import { PromoBanner } from '../PromoBanner'

describe('PromoBanner', () => {
  let wrapper
  let instance

  beforeEach(() => {
    wrapper = shallow(<PromoBanner />)
  })

  describe('when isHomePageRedesignEnabled is disabled', () => {
    beforeEach(() => {
      wrapper.setProps({
        isHomePageRedesignEnabled: false,
      })
    })

    test('then should render Banner component', () => {
      expect(wrapper.find('Banner')).toBeDefined()
    })
  })

  describe('when isHomePageRedesignEnabled is enabled', () => {
    test('then DiscountBar component should be rendered', () => {
      expect(wrapper.find('DiscountBar')).toBeDefined()
    })
  })

  describe('applyDiscount', () => {
    const trackUTMAndPromoCode = jest.fn()
    let spyOnApplyPromoCode

    beforeEach(() => {
      wrapper.setProps({
        trackUTMAndPromoCode
      })
      instance = wrapper.instance()
      spyOnApplyPromoCode = jest.spyOn(instance, 'applyPromoCode')
    })

    test('should not call trackUTMAndPromoCode by default', () => {
      expect(trackUTMAndPromoCode).not.toBeCalled()
    })

    test('should not call applyPromoCode by default', () => {
      expect(spyOnApplyPromoCode).not.toBeCalled()
    })

    describe('when Banner is clicked', () => {
      beforeEach(() => {
        wrapper.find('Banner').simulate('click')
      })

      test('then should dispatch trackUTMAndPromoCode with proper parameter', () => {
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(clickClaimDiscountBar)
      })

      test('then should dispatch applyPromoCode', () => {
        expect(spyOnApplyPromoCode).toHaveBeenCalled()
      })
    })

    describe('when DiscountBar is clicked', () => {
      beforeEach(() => {
        wrapper.setProps({
          hide: false,
          trackUTMAndPromoCode,
          isHomePageRedesignEnabled: true,
        })
        instance = wrapper.instance()
        spyOnApplyPromoCode = jest.spyOn(instance, 'applyPromoCode')
        wrapper.find('DiscountBar').props().applyDiscount()
      })

      test('then should dispatch trackUTMAndPromoCode with proper parameter', () => {
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith(clickClaimDiscountBar)
      })

      test('then should dispatch applyPromoCode', () => {
        expect(spyOnApplyPromoCode).toHaveBeenCalled()
      })
    })
  })

  describe('when hide is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        hide: true,
      })
    })

    test('then the Banner should have prop hide', () => {
      expect(wrapper.find('Banner').props().hide).toBeTruthy()
    })
  })
})
