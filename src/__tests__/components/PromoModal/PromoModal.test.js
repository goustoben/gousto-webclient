import React from 'react'
import { shallow } from 'enzyme'

import { PromoModal } from 'components/PromoModal/PromoModal'
import ModalPanel from 'Modal/ModalPanel'

describe('PromoModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PromoModal />)
  })

  test('should return a ModalPanel with no props', () => {
    expect(wrapper.type()).toEqual(ModalPanel)
  })

  describe('ModalPanel props', () => {
    describe('when disableOverlay is true', () => {
      beforeEach(() => {
        wrapper.setProps({ loginOpen: true })
      })

      test('should be true for ModalPanel "disableOverlay" prop', () => {
        expect(wrapper.find(ModalPanel).prop('disableOverlay')).toBeTruthy()
      })
    })

    describe('closePortal', () => {
      const closePortal = jest.fn()

      beforeEach(() => {
        wrapper.setProps({ closePortal })
      })

      test('should be tru for ModalPanel', () => {
        expect(wrapper.find(ModalPanel).prop('closePortal')).toBeTruthy()
      })

      test('should not be called by default', () => {
        expect(closePortal).not.toBeCalled()
      })
    })

    describe('closePortalFromButton', () => {
      const closePortalFromButton = jest.fn()

      beforeEach(() => {
        wrapper.setProps({ closePortalFromButton })
      })

      test('should be tru for ModalPanel', () => {
        expect(wrapper.find(ModalPanel).prop('closePortalFromButton')).toBeTruthy()
      })

      test('should not be called by default', () => {
        expect(closePortalFromButton).not.toBeCalled()
      })
    })
  })

  describe('when ModalPanel renders', () => {
    test('should have Button', () => {
      expect(wrapper.find('Button').exists()).toBeTruthy()
    })
  })

  describe('trackUTMAndPromoCode', () => {
    const trackUTMAndPromoCode = jest.fn()
    const promoApply = jest.fn()
    let instance
    let spyOnHandleClick

    beforeEach(() => {
      wrapper.setProps({
        trackUTMAndPromoCode,
        error: '',
        justApplied: false,
        promoApply
      })
      instance = wrapper.instance()
      spyOnHandleClick = jest.spyOn(instance, 'handleClick')
    })

    test('should not call trackUTMAndPromoCode by default', () => {
      expect(trackUTMAndPromoCode).not.toBeCalled()
    })

    test('should not call handleClick by default', () => {
      expect(spyOnHandleClick).not.toBeCalled()
    })

    describe('when Button clicked', () => {
      beforeEach(() => {
        wrapper.find('Button').simulate('click')
      })

      test('then should dispatch trackUTMAndPromoCode with proper parameter', () => {
        expect(trackUTMAndPromoCode).toHaveBeenCalledWith('clickClaimDiscountPopup')
      })

      test('then should dispatch handleClick', () => {
        expect(spyOnHandleClick).toHaveBeenCalled()
      })

      describe('and when error is empty and justApplied is false', () => {
        test('then should call promoApply', () => {
          expect(promoApply).toBeCalled()
        })
      })

      describe('and when error is not empty and justApplied is false', () => {
        beforeEach(() => {
          jest.clearAllMocks()
          wrapper.setProps({ error: 'error' })
        })

        test('then should call promoApply', () => {
          expect(promoApply).not.toBeCalled()
        })
      })

      describe('and when error is empty and justApplied is true', () => {
        beforeEach(() => {
          jest.clearAllMocks()
          wrapper.setProps({ justApplied: true })
        })

        test('then should call promoApply', () => {
          expect(promoApply).not.toBeCalled()
        })
      })
    })
  })
})
