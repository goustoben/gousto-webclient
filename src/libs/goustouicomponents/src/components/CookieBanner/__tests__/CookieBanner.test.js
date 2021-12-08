import React from 'react'
import { mount } from 'enzyme'
import { CookieBanner } from '..'

describe('<CookieBanner />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<CookieBanner />)
  })

  test('renders without crashing', () => {})

  test('does not have a data-testing attribute on the root element', () => {
    expect(wrapper.childAt(0).prop('data-testing')).toBe(null)
  })

  test('renders the copy', () => {
    expect(wrapper.text()).toContain('cookies')
  })

  test('renders a link pointing to our privacy-statement', () => {
    expect(wrapper.find('a').prop('href')).toBe('/privacy-statement')
  })

  test('renders a CTA', () => {
    expect(wrapper.find('CTA')).toHaveLength(1)
  })

  describe('when the testingSelector prop is passed', () => {
    const TESTING_SELECTOR = 'select-for-testing'

    beforeEach(() => {
      wrapper.setProps({ testingSelector: TESTING_SELECTOR })
    })

    test('adds a data-testing attribute to the root element with the value of the prop', () => {
      expect(wrapper.childAt(0).prop('data-testing')).toBe(TESTING_SELECTOR)
    })
  })

  describe('when the CTA is clicked', () => {
    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    afterEach(() => {
      window.localStorage.setItem('isCookieBannerAccepted', null)
    })

    test('the cookie banner goes away', () => {
      expect(wrapper.find('.wrapper').exists()).toBe(false)
    })

    describe('and the component is rendered again', () => {
      beforeEach(() => {
        wrapper = mount(<CookieBanner />)
      })

      test('the cookie banner does not render', () => {
        expect(wrapper.find('.wrapper').exists()).toBe(false)
      })
    })
  })

  describe('when onCookieBannerDismissed is passed', () => {
    const onCookieBannerDismissed = jest.fn()

    beforeEach(() => {
      wrapper.setProps({ onCookieBannerDismissed })
    })

    describe('when the CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTA').simulate('click')
      })

      test('then the callback is ivoked', () => {
        expect(onCookieBannerDismissed).toHaveBeenCalled()
      })
    })
  })
})
