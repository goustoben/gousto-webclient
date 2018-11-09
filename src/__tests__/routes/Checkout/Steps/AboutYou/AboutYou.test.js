import sinon from 'sinon'

import { Field, FormSection } from 'redux-form'

import React from 'react'
import { shallow } from 'enzyme'
import AboutYou from 'routes/Checkout/Components/AboutYou/AboutYou'
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
      expect(wrapper.find(Field).length).toEqual(7)
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
    test('should be true for Login "isOpen" prop', () => {
      const wrapper = shallow(
				<AboutYou loginOpen checkoutStepValidation={checkoutStepValidation} />,
      )
      expect(wrapper.find(Login).prop('isOpen')).toBe(true)
    })
    test('should be false for Login "isOpen" prop', () => {
      const wrapper = shallow(
				<AboutYou
				  loginOpen={false}
				  checkoutStepValidation={checkoutStepValidation}
				/>,
      )
      expect(wrapper.find(Login).prop('isOpen')).toBe(false)
    })

    test('should be true for Login "isAuthenticated" prop', () => {
      const wrapper = shallow(
				<AboutYou
				  isAuthenticated
				  checkoutStepValidation={checkoutStepValidation}
				/>,
      )
      expect(wrapper.find(Login).prop('isAuthenticated')).toBe(true)
    })
    test('should be false for Login "isAuthenticated" prop', () => {
      const wrapper = shallow(
				<AboutYou
				  isAuthenticated={false}
				  checkoutStepValidation={checkoutStepValidation}
				/>,
      )
      expect(wrapper.find(Login).prop('isAuthenticated')).toBe(false)
    })
    test('should be true for Login "isOpen" and Overlay "open" props', () => {
      const wrapper = shallow(
				<AboutYou loginOpen checkoutStepValidation={checkoutStepValidation} />,
      )
      expect(wrapper.find(Overlay).prop('open')).toBe(true)
      expect(wrapper.find(Login).prop('isOpen')).toBe(true)
    })
    test('should be false for Login "isOpen" and Overlay "open" props', () => {
      const wrapper = shallow(
				<AboutYou
				  loginOpen={false}
				  checkoutStepValidation={checkoutStepValidation}
				/>,
      )
      expect(wrapper.find(Overlay).prop('open')).toBe(false)
      expect(wrapper.find(Login).prop('isOpen')).toBe(false)
    })
    test('should be true for "mask" for first name, last name, email, password, and marketing checkboxes', () => {
      const wrapper = shallow(
				<AboutYou
				  loginOpen={false}
				  checkoutStepValidation={checkoutStepValidation}
				/>,
      )
      expect(
        wrapper
          .find(Field)
          .at(1)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(2)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(3)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(4)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(5)
          .prop('mask'),
      ).toEqual(true)
      expect(
        wrapper
          .find(Field)
          .at(6)
          .prop('mask'),
      ).toEqual(true)
    })
  })
})
