import React from 'react'
import { shallow } from 'enzyme'

import { PromoBanner } from '../PromoBanner'

describe('PromoBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PromoBanner />)
  })

  test('should render Banner', () => {
    expect(wrapper.find('Banner')).toBeDefined()
  })

  describe('trackUTMAndPromoCode', () => {
    const trackUTMAndPromoCode = jest.fn()
    let instance
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

    describe('when Banner clicked', () => {
      beforeEach(() => {
        wrapper.find('Banner').simulate('click')
      })

      test('then should dispatch trackUTMAndPromoCode with proper parameter', () => {
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith('clickClaimDiscountBar')
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
