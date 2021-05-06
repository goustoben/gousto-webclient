import React from 'react'
import { shallow } from 'enzyme'
import { ReferAFriend } from '../ReferAFriend.logic'

describe('Refer A Friend Logic', () => {
  const changeRecaptcha = jest.fn()
  const userReferAFriend = jest.fn()
  const trackingReferFriendSocialSharing = jest.fn()
  const buildReferAFriend = (props = {}) => {
    const baseProps = {
      changeRecaptcha,
      userReferAFriend,
      trackingReferFriendSocialSharing,
      isRecaptchaEnabled: false,
    }

    return shallow(
      <ReferAFriend {...{...baseProps, ...props} } />
    )
  }

  describe('Refer A Friend', () => {
    let wrapper

    beforeAll(() => {
      wrapper = buildReferAFriend()
    })

    test('should fetch recaptcha', () => {
      expect(changeRecaptcha).toHaveBeenCalled()
    })

    test('should call userReferAFriend action with the email', () => {
      const email = 'test email'
      const recaptchaToken = 'recaptcha-token'
      wrapper.setState({ email, recaptchaToken })
      wrapper.instance().referAFriend()

      expect(userReferAFriend).toHaveBeenCalledWith(email, recaptchaToken)
    })
  })

  describe('Handle Email Change', () => {
    let wrapper

    beforeAll(() => {
      wrapper = buildReferAFriend()
    })

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
    let wrapper

    beforeAll(() => {
      wrapper = buildReferAFriend({ isRecaptchaEnabled: true })
    })

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

      expect(wrapper.state().errorMessage).toEqual('Please provide a valid email address.')
    })

    describe('And captcha needs to prompt', () => {
      test('should call captcha execute', () => {
        const email = '123@email.com'
        wrapper.instance().handleEmailChange(email)

        const mockEvent = {
          preventDefault: () => {}
        }

        const mockReferAFriend = jest.fn()
        const mockCaptchaExecute = jest.fn()
        wrapper.instance().setCaptchaRef({ execute: mockCaptchaExecute })
        wrapper.instance().referAFriend = mockReferAFriend
        wrapper.instance().handleSubmit(mockEvent)

        expect(mockCaptchaExecute).toHaveBeenCalledTimes(1)
      })

      test('should set token once', () => {
        const recaptchaToken = 'recaptcha-token'

        wrapper.instance().captchaChanges(recaptchaToken)

        expect(wrapper.state('recaptchaToken')).toEqual(recaptchaToken)
      })
    })

    describe('And captcha does not needs to prompt', () => {
      test('should not call captcha execute', () => {
        const email = '123@email.com'
        wrapper.instance().handleEmailChange(email)

        const mockEvent = {
          preventDefault: () => {}
        }

        const mockReferAFriend = jest.fn()
        const mockCaptchaExecute = jest.fn()

        wrapper.instance().referAFriend = mockReferAFriend
        wrapper.instance().handleSubmit(mockEvent)

        expect(mockCaptchaExecute).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('Show Email Referral Form', () => {
    let wrapper

    beforeAll(() => {
      wrapper = buildReferAFriend()
    })

    test('should reset the state to initial values', () => {
      wrapper.instance().showEmailReferralForm()

      expect(wrapper.state().email).toEqual('')
      expect(wrapper.state().isEmailSent).toEqual(false)
      expect(wrapper.state().isEmailValid).toEqual(false)
      expect(wrapper.state().errorMessage).toEqual('')
    })
  })
})
