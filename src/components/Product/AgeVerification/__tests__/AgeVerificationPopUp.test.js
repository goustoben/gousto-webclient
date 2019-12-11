import React from 'react'
import { mount } from 'enzyme'
import { AgeVerificationPopUp } from '../AgeVerificationPopUp'
import { modalTitle, underAgeModalText, modalText } from '../config'

describe('AgeVerificationPopUp Component', () => {
  let wrapper
  const onCloseSpy = jest.fn()
  const onAgeConfirmationSpy = jest.fn()

  beforeEach(() => {
    wrapper = mount(<AgeVerificationPopUp onClose={onCloseSpy} onAgeConfirmation={onAgeConfirmationSpy}/>)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render modal title with correct heading', () => {
    expect(wrapper.find('ModalTitle').text()).toEqual(modalTitle)
  })

  describe('given user has NOT confirmed age', () => {

    test('should render modal content with correct text', () => {
      expect(wrapper.find('ModalContent').text()).toEqual(modalText)
    })

    test('should render modal footer with 2 buttons', () => {
      expect(wrapper.find('ModalFooter').find('Button').length).toEqual(2)
    })

    test('should call "onAgeConfirmation" and set "hasSelectedUnder18" state to true on NO button click', () => {
      wrapper.find('Button').at(0).prop('onClick')()
      expect(onAgeConfirmationSpy).toHaveBeenCalledWith(false)
      expect(wrapper.state('hasSelectedUnder18')).toEqual(true)
    })

    test('should call "onAgeConfirmation" and "onClose" on YES button click', () => {
      wrapper.find('Button').at(1).prop('onClick')()
      expect(onAgeConfirmationSpy).toHaveBeenCalledWith(true)
      expect(onCloseSpy).toHaveBeenCalled()
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

    test('should call "onClose" on button click', () => {
      wrapper.find('Button').prop('onClick')()
      expect(onCloseSpy).toHaveBeenCalled()
    })
  })

})
