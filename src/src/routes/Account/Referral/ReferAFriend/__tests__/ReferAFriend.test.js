import React from 'react'
import { shallow } from 'enzyme'
import { ReferAFriend } from '../ReferAFriend.logic'

describe('Refer A Friend Logic', () => {
  let wrapper
  const userReferAFriend = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <ReferAFriend userReferAFriend={userReferAFriend}/>
    )
  })

  describe('Refer A Friend', () => {

    test('should call userReferAFriend action with the email', () => {
      const email = 'test email'
      wrapper.setState({ email: email })
      wrapper.instance().referAFriend()

      expect(userReferAFriend).toHaveBeenCalledWith(email)
    })
  })

  describe('Handle Email Change', () => {
    
    test('should set email in state to value passed in', () => {
      const email = '123@email.com'
      wrapper.instance().handleEmailChange(email)
      expect(wrapper.state().email).toEqual(email)
    })

    test('should set isEmailValid to true when given a valid email', () => {
      const email = '123@email.com'
      wrapper.instance().handleEmailChange(email)
      expect(wrapper.state().isEmailValid).toEqual(true)
    })

    test('should set isEmailValid to false when given a invalid email', () => {
      const email = 'invalid email'
      wrapper.instance().handleEmailChange(email)
      expect(wrapper.state().isEmailValid).toEqual(false)
    })

    test('should set isEmailValid to false when given an empty email', () => {
      const email = ''
      wrapper.instance().handleEmailChange(email)
      expect(wrapper.state().isEmailValid).toEqual(false)
    })
  })

  describe('Handle Submit', () => {

    test('should set isEmailSent to true & no error message if the email is valid', () => {
      wrapper.setState({ isEmailValid: true })

      const mockEvent = {
        preventDefault: () => {}
      }

      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.state().isEmailSent).toEqual(true)
      expect(wrapper.state().errorMessage).toEqual('')
      
    })

    test('should call referAFriend when the email is valid', () => {
      wrapper.setState({ isEmailValid: true })

      const mockEvent = {
        preventDefault: () => {}
      }
    
      const mockReferAFriend = jest.fn()
      wrapper.instance().referAFriend = mockReferAFriend
      wrapper.instance().handleSubmit(mockEvent)

      expect(mockReferAFriend).toHaveBeenCalled()
    })

    test('should set the errorMessage if email is not valid', () => {
      wrapper.setState({ isEmailValid: false })

      const mockEvent = {
        preventDefault: () => {}
      }
    
      const mockReferAFriend = jest.fn()
      wrapper.instance().referAFriend = mockReferAFriend
      wrapper.instance().handleSubmit(mockEvent)

      expect(wrapper.state().errorMessage).toEqual('Please provide a valid email address')
    })
  })

  describe('Show Email Referral Form', () => {

    test('should reset the state to initial values', () => {
      wrapper.instance().showEmailReferralForm()

      expect(wrapper.state().email).toEqual('')
      expect(wrapper.state().isEmailSent).toEqual(false)
      expect(wrapper.state().isEmailValid).toEqual(false)
      expect(wrapper.state().errorMessage).toEqual('')

    })
  })

})
