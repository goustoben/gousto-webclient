import React from 'react'
import { mount } from 'enzyme'
import { browserHistory } from 'react-router'
import { MenuRedirect } from 'routes/MenuRedirect/MenuRedirect'
import { clickGetStartedOnMenu2, clickLoginOnMenu2 } from 'actions/trackingKeys'
import { client } from 'config/routes'

describe('MenuRedirect', () => {
  let wrapper
  const props = {
    isAuthenticated: false,
    loginVisibilityChange: jest.fn(),
    device: 'desktop',
    trackGetStarted: jest.fn(),
    trackLoginClick: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<MenuRedirect {...props} />)
  })

  describe('when MenuRedirects is opened', () => {
    test('then MenuRedirect should be defined', () => {
      expect(wrapper).toBeDefined()
    })

    test('then interactive elements should be rendered', () => {
      expect('<CTA>').toBeTruthy()
      expect(wrapper.find('.loginButton')).toBeTruthy()
    })
  })

  describe('when a user is not authenticated', () => {
    describe('and clicks on Log in CTA', () => {
      beforeEach(() => {
        wrapper.find('.loginButton').simulate('click')
      })

      test('then loginVisibilityChange should be called with true parameter', () => {
        expect(props.loginVisibilityChange).toHaveBeenCalledWith(true)
      })

      test('then trackLoginClick should be called with true parameter', () => {
        expect(props.trackLoginClick).toHaveBeenCalledWith(clickLoginOnMenu2)
      })
    })
  })

  describe('when a user is authenticated', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      wrapper.setProps({ isAuthenticated: true })
    })

    describe('and clicks on Log in CTA', () => {
      beforeEach(() => {
        wrapper.find('.loginButton').simulate('click')
      })

      test('then loginVisibilityChange & trackLoginClick should not be called', () => {
        expect(props.loginVisibilityChange).not.toHaveBeenCalled()
        expect(props.trackLoginClick).not.toHaveBeenCalled()
      })
    })
  })

  describe('when device property is equal to browser', () => {
    test('then CTA should have isFullWidth = false', () => {
      expect(wrapper.find('CTA').prop('isFullWidth')).toBeFalsy()
    })
  })

  describe('when device property is equal to mobile', () => {
    beforeEach(() => {
      wrapper.setProps({ device: 'mobile' })
    })

    test('then CTA should have isFullWidth = false', () => {
      expect(wrapper.find('CTA').prop('isFullWidth')).toBeTruthy()
    })
  })

  describe('when a user clicks on Get started CTA', () => {
    browserHistory.push = jest.fn()

    beforeEach(() => {
      wrapper.find('CTA').simulate('click')
    })

    test('then trackGetStarted should be called with proper parameter', () => {
      expect(props.trackGetStarted).toHaveBeenCalledWith(clickGetStartedOnMenu2)
    })

    test('then user should be redirected to wizard step 1', () => {
      expect(browserHistory.push).toHaveBeenCalledWith(client.signup)
    })
  })
})
