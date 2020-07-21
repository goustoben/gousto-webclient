import React from 'react'
import { shallow } from 'enzyme'

import { CookieBanner } from '../CookieBanner'

describe('CookieBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<CookieBanner
      copy={{
        button: '',
        findMore: '',
        description: '',
      }}
      cookiePolicyAcceptanceChange={() => {}}
      isCookiePolicyAccepted
      trackCookiePolicyAccepted={() => {}}
    />)
  })

  describe('when isCookiePolicyAccepted is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isCookiePolicyAccepted: true })
    })

    test('cookie banner not rendering', () => {
      expect(wrapper.children().length).toBe(0)
    })
  })

  describe('when isCookiePolicyAccepted is false', () => {
    beforeEach(() => {
      wrapper.setProps({ isCookiePolicyAccepted: false })
    })

    test('copy is displayed correctly', () => {
      wrapper.setProps({
        copy: {
          button: 'button',
          findMore: 'find more',
          description: 'description',
        }
      })

      expect(wrapper.find('.button').text()).toBe('button')
      expect(wrapper.find('.linkMessage').text()).toBe('find more')
      expect(wrapper.find('.description').text().indexOf('description')).toBeGreaterThan(-1)
    })

    describe('and the accept cookie policy button is clicked', () => {
      const cookiePolicyAcceptanceChangeSpy = jest.fn()
      const trackCookiePolicyAcceptedSpy = jest.fn()

      beforeEach(() => {
        wrapper.setProps({
          cookiePolicyAcceptanceChange: cookiePolicyAcceptanceChangeSpy,
          trackCookiePolicyAccepted: trackCookiePolicyAcceptedSpy,
        })
        wrapper.find('button').simulate('click')
      })

      test('triggers the cookiePolicyAcceptanceChange', () => {
        expect(cookiePolicyAcceptanceChangeSpy).toHaveBeenCalledWith(true)
      })

      test('triggers the trackCookiePolicyAccepted', () => {
        expect(trackCookiePolicyAcceptedSpy).toHaveBeenCalled()
      })
    })
  })
})
