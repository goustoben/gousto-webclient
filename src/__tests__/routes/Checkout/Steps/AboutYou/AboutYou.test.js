import sinon from 'sinon'

import { Field, FormSection } from 'redux-form'

import React from 'react'
import { shallow } from 'enzyme'
import { AboutYou } from 'routes/Checkout/Components/AboutYou/AboutYou'
import Overlay from 'Overlay'
import ModalPanel from 'Modal/ModalPanel'
import Login from 'Login'

describe('AboutYou', () => {
  let wrapper
  let checkoutStepValidation

  beforeEach(() => {
    checkoutStepValidation = sinon.spy()
    wrapper = shallow(
      <AboutYou checkoutStepValidation={checkoutStepValidation} />,
    )
  })

  describe('rendering', () => {
    test('should return FormSection', () => {
      expect(wrapper.type()).toEqual(FormSection)
    })

    test('should render 7 Fields', () => {
      expect(wrapper.find(Field).length).toEqual(6)
    })

    test('should render 1 Overlay', () => {
      expect(wrapper.find(Overlay).length).toEqual(1)
    })

    test('should render 1 ModalPanel', () => {
      expect(wrapper.find(ModalPanel).length).toEqual(1)
    })

    test('should render 1 Login', () => {
      expect(wrapper.find(Login).length).toEqual(1)
    })
  })

  describe('props', () => {
    describe('when isOpen is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoginOpen: true })
      })

      test('should be true for Login "isOpen" prop', () => {
        expect(wrapper.find(Login).prop('isOpen')).toBeTruthy()
      })
    })

    describe('when isOpen is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoginOpen: false })
      })

      test('should be false for Login "isOpen" prop', () => {
        expect(wrapper.find(Login).prop('isOpen')).toBeFalsy()
      })
    })

    describe('when isAuthenticated is true', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: true })
      })

      test('should be false for Login "isAuthenticated" prop', () => {
        expect(wrapper.find(Login).prop('isAuthenticated')).toBeTruthy()
      })
    })

    describe('when isAuthenticated is false', () => {
      beforeEach(() => {
        wrapper.setProps({ isAuthenticated: true })
      })

      test('should be false for Login "isAuthenticated" prop', () => {
        expect(wrapper.find(Login).prop('isAuthenticated')).toBeTruthy()
      })
    })

    describe('when isOpen is true and Overlay is open', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoginOpen: true })
      })

      test('should be true for Login "isOpen" and Overlay "open" props', () => {
        expect(wrapper.find(Overlay).prop('open')).toBeTruthy()
        expect(wrapper.find(Login).prop('isOpen')).toBeTruthy()
      })
    })

    describe('when isOpen is false and Overlay is open', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoginOpen: false })
      })

      test('should be true for Login "isOpen" and Overlay "open" props', () => {
        expect(wrapper.find(Overlay).prop('open')).toBeFalsy()
        expect(wrapper.find(Login).prop('isOpen')).toBeFalsy()
      })
    })

    describe('inputs with a mask', () => {
      beforeEach(() => {
        wrapper.setProps({ isLoginOpen: false })
      })

      test('should be true for "mask" for first name, last name, email, password, and marketing checkboxes', () => {
        const fields = Array.from(5)
        fields.forEach((index) => {
          expect(
            wrapper
              .find(Field)
              .at(index)
              .prop('mask'),
          ).toBeTruthy()
        })
      })
    })
  })

  test('should return proper title - About You', () => {
    expect(wrapper.find('h3').text()).toEqual('About you')
  })

  test('should have Log in here button', () => {
    expect(wrapper.find('.link').text().includes('Log in here')).toBeTruthy()
  })

  describe('when Log in here button clicked', () => {
    const trackCheckoutButtonPressed = jest.fn()

    describe('and isMobile false', () => {
      beforeEach(() => {
        wrapper.setProps({
          isMobile: false,
          isAuthenticated: true,
          trackCheckoutButtonPressed
        })
      })

      test('then should not call trackCheckoutButtonPressed', () => {
        expect(trackCheckoutButtonPressed).not.toBeCalled()
        wrapper.find('.link').simulate('click')
        expect(trackCheckoutButtonPressed).not.toBeCalled()
      })
    })

    describe('and isMobile true', () => {
      beforeEach(() => {
        wrapper.setProps({
          isMobile: true,
          isAuthenticated: true,
          trackCheckoutButtonPressed
        })
      })

      test('then should dispatch trackCheckoutButtonPressed with proper parameter', () => {
        expect(trackCheckoutButtonPressed).not.toBeCalled()
        wrapper.find('.link').simulate('click')
        expect(trackCheckoutButtonPressed).toHaveBeenCalledWith('LogInCTA Clicked')
      })
    })
  })

  test('should return About you title', () => {
    expect(wrapper.find('h3').text()).toEqual('About you')
  })
})
