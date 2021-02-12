import React from 'react'
import { shallow } from 'enzyme'
import { clickClaimDiscountBar } from 'actions/trackingKeys'
import logger from 'utils/logger'
import promoActions from 'actions/promos'
import { PromoBanner } from '../PromoBanner'

jest.mock('utils/logger', () => ({
  error: jest.fn(),
  warning: jest.fn(),
}))

jest.mock('actions/promos', () => ({
  promoChange: jest.fn(),
}))

describe('PromoBanner', () => {
  let wrapper
  let instance

  beforeEach(() => {
    wrapper = shallow(<PromoBanner />)
  })

  test('then DiscountBar component should be rendered', () => {
    expect(wrapper.find('DiscountBar').exists()).toBeTruthy()
  })

  describe('applyDiscount', () => {
    const trackUTMAndPromoCode = jest.fn()
    let spyOnApplyPromoCode

    beforeEach(() => {
      wrapper.setProps({
        trackUTMAndPromoCode,
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

    describe('when DiscountBar is clicked', () => {
      beforeEach(() => {
        wrapper.setProps({
          hide: false,
          trackUTMAndPromoCode,
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

      describe('when canApplyPromo is true and promoChange returns an error', () => {
        const err = new Error('oops')
        const onPromoChange = promoActions.promoChange.mockReturnValueOnce(
          new Promise((resolve, reject) => {
            reject(err)
          })
        )

        beforeEach(() => {
          wrapper.setProps({
            canApplyPromo: true,
            promoChange: onPromoChange,
          })
          instance = wrapper.instance()
          spyOnApplyPromoCode = jest.spyOn(instance, 'applyPromoCode')
          wrapper.find('DiscountBar').props().applyDiscount()
        })

        test('then should log a warning', () => {
          expect(spyOnApplyPromoCode).toHaveBeenCalled()
          expect(logger.warning).toHaveBeenCalled()
        })
      })
    })
  })
})
