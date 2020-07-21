import React from 'react'
import { shallow } from 'enzyme'

import { CookieBanner } from '../CookieBanner'

describe('CookieBanner', () => {
  let wrapper
  const PROPS = {
    copy: {
      button: '',
      findMore: '',
      description: '',
    },
    cookiePolicyAcceptanceChange: jest.fn(),
    isCookiePolicyAccepted: true,
    trackCookiePolicyAccepted: jest.fn(),
    trackCookiePolicyVisible: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<CookieBanner {...PROPS} />)
  })

  describe('when isCookiePolicyAccepted is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isCookiePolicyAccepted: true })
    })

    test('cookie banner not rendering', () => {
      expect(wrapper.children().length).toBe(0)
    })

    test('does not trigger the trackCookiePolicyVisible', () => {
      expect(PROPS.trackCookiePolicyVisible).not.toHaveBeenCalled()
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

    test('triggers the trackCookiePolicyVisible', () => {
      expect(PROPS.trackCookiePolicyVisible).toHaveBeenCalled()
    })

    describe('and the accept cookie policy button is clicked', () => {
      beforeEach(() => {
        wrapper.find('button').simulate('click')
      })

      test('triggers the cookiePolicyAcceptanceChange', () => {
        expect(PROPS.cookiePolicyAcceptanceChange).toHaveBeenCalledWith(true)
      })

      test('triggers the trackCookiePolicyAccepted', () => {
        expect(PROPS.trackCookiePolicyAccepted).toHaveBeenCalled()
      })
    })
  })
})
