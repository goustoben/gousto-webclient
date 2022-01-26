import React from 'react'
import { mount, shallow } from 'enzyme'
import { LoginDesktop } from '../LoginDesktop'

describe('<LoginDesktop />', () => {
  let wrapper
  const defaultProps = {
    goustoAppEventName: 'send-gousto-app-link-app-store-sms',
    sendGoustoAppLinkSMS: () => {},
    eventErrorMessage: '',
    showEventPending: false,
    showEventSent: false,
    initialUserPhoneNumber: '',
  }
  const sendGoustoAppLinkSMS = jest.fn()

  afterEach(() => {
    sendGoustoAppLinkSMS.mockClear()
  })

  beforeEach(() => {
    wrapper = shallow(
      <LoginDesktop {...defaultProps}>
        <div />
      </LoginDesktop>
    )
  })

  test('children is rendered', () => {
    expect(wrapper.children().length).toBe(1)
  })

  describe('when showAppAwareness feature is turned on', () => {
    beforeEach(() => {
      wrapper = mount(
        <LoginDesktop
          {...defaultProps}
          initialUserPhoneNumber="1234567890"
          sendGoustoAppLinkSMS={sendGoustoAppLinkSMS}
          showAppAwareness
        >
          <div />
        </LoginDesktop>
      )
    })

    test('Heading is rendered', () => {
      expect(wrapper.find('Heading').length).toBe(1)
    })

    describe('when clicking on Send Text', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('sendGoustoAppLinkSMS is called passing goustoAppEventName and userPhoneNumber', () => {
        expect(sendGoustoAppLinkSMS).toHaveBeenCalledWith({
          isAnonymousUser: true,
          goustoAppEventName: 'send-gousto-app-link-app-store-sms',
          userPhoneNumber: '1234567890'
        })
      })
    })

    describe('when entering a valid phone number and submitting', () => {
      beforeEach(() => {
        wrapper.find('InputField').find('input').simulate('change', { target: { value: '7456640000', type: 'tel' } })
        wrapper.find('InputField').find('input').simulate('blur', { target: { type: 'tel' } })

        wrapper.find('CTA').simulate('click')
      })

      test('sendGoustoAppLinkSMS is called passing goustoAppEventName and userPhoneNumber', () => {
        expect(sendGoustoAppLinkSMS).toHaveBeenCalledWith({
          isAnonymousUser: true,
          goustoAppEventName: 'send-gousto-app-link-app-store-sms',
          userPhoneNumber: '7456640000'
        })
      })
    })

    describe('when entering an invalid phone number and submitting', () => {
      beforeEach(() => {
        wrapper.find('InputField').find('input').simulate('change', { target: { value: '123467', type: 'tel' } })
        wrapper.find('InputField').find('input').simulate('blur', { target: { type: 'tel' } })

        wrapper.find('CTA').simulate('click')
      })

      test('sendGoustoAppLinkSMS is not called', () => {
        expect(sendGoustoAppLinkSMS).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('when showAppAwareness feature is turned off', () => {
    beforeEach(() => {
      wrapper = shallow(
        <LoginDesktop {...defaultProps}>
          <div />
        </LoginDesktop>
      )
    })

    test('Heading is not rendered', () => {
      expect(wrapper.find('Heading').length).toBe(0)
    })
  })
})
