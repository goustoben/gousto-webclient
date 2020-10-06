import React from 'react'
import { mount } from 'enzyme'
import { AppAwarenessBanner } from '../AppAwarenessBanner'

describe('<AppAwarenessBanner />', () => {
  let wrapper
  const sendGoustoAppLinkSMS = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <AppAwarenessBanner
        goustoAppEventName="send-gousto-app-link-app-store-sms"
        sendGoustoAppLinkSMS={sendGoustoAppLinkSMS}
        eventErrorMessage=""
        showEventPending={false}
        showEventSent={false}
        initialUserPhoneNumber="1234567890"
      />
    )
  })

  afterEach(() => {
    sendGoustoAppLinkSMS.mockClear()
  })

  test('the phone number is passed to the input correctly', () => {
    expect(wrapper.find('InputField').prop('value')).toBe('1234567890')
  })

  describe('when clicking on Send Text', () => {
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('sendGoustoAppLinkSMS is called passing goustoAppEventName and userPhoneNumber', () => {
      expect(sendGoustoAppLinkSMS).toHaveBeenCalledWith({
        isAnonymousUser: false,
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
        isAnonymousUser: false,
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
