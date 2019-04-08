import React from 'react'
import { mount } from 'enzyme'
import { AgeVerificationPopUp } from '../AgeVerificationPopUp'
import { underAgeModalText, modalText } from '../config'

describe('AgeVerificationPopUp Component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<AgeVerificationPopUp />)
  })

  test('should render modal title with correct heading', () => {
    expect(wrapper.find('ModalTitle').text()).toEqual('Are you over 18?')
  })

  describe('given user has NOT confirmed age', () => {

    test('should render modal content with correct text', () => {
      expect(wrapper.find('ModalContent').text()).toEqual(modalText)
    })

    test('should render modal footer with 2 buttons', () => {
      expect(wrapper.find('ModalFooter').find('Button').length).toEqual(2)
    })

  })

  describe('given user has confirmed UNDER age', () => {

    beforeEach(() => {
      wrapper.setState({ hasSelectedUnder18: true })
    })

    test('should render modal content with correct text', () => {
      expect(wrapper.find('ModalContent').text()).toEqual(underAgeModalText)
    })

    test('should render modal footer with 1 button', () => {
      expect(wrapper.find('ModalFooter').find('Button').length).toEqual(1)
    })
  })

})
