import React from 'react'
import { mount } from 'enzyme'
import { AppAwarenessBanner } from '../AppAwarenessBanner'

describe('<AppAwarenessBanner />', () => {
  let wrapper
  const sendText = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <AppAwarenessBanner sendText={sendText} userPhoneNumber="" />
    )
  })

  describe('when the phone number is set', () => {
    beforeEach(() => {
      wrapper.setProps({ userPhoneNumber: '0123456789' })
    })

    test('the phone number is passed to the input correctly', () => {
      expect(wrapper.find('InputField').prop('value')).toBe('0123456789')
    })

    describe('and when clicking on Send Text', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('sendText is called', () => {
        expect(sendText).toHaveBeenCalledTimes(1)
      })
    })
  })
})
