import React from 'react'
import { shallow } from 'enzyme'
import { LinkMobileMenu } from '../LinksMobileMenu'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

describe('LinkMobileMenu', () => {
  let wrapper
  const props = {
    isAuthenticated: false,
    trackNavigationClick: () => { },
    onLoginClick: () => { }
  }
  beforeEach(() => {
    wrapper = shallow(<LinkMobileMenu {...props} />)
  })

  describe('when is in double decker experiment is true and path is menu', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        doubleDeckerExperimentEnabled: true,
        isAuthenticated: false,
        isOnMenu: '/menu'
      }
      wrapper = shallow(<LinkMobileMenu {...newProps} />)
    })
    test('should render Log in link', () => {
      expect(wrapper.find('.experimentAccountMenuItem').text()).toEqual('Log in')
    })

    test('should render Help link', () => {
      expect(wrapper.find('.experimentHelpMenuItem').children().text()).toEqual('Help')
    })
  })

  describe('when isAuthenticated is false', () => {
    test('should render Log in link', () => {
      expect(wrapper.find('.accountMenuItem').text()).toEqual('Log in')
    })

    test('should render Help link', () => {
      expect(wrapper.find('.helpMenuItem').children().text()).toEqual('Help')
    })

    describe('when click on login button', () => {
      const onLoginClickSpy = jest.fn()
      beforeEach(() => {
        const newProps = {
          ...props,
          isAuthenticated: false,
          onLoginClick: onLoginClickSpy
        }
        wrapper = shallow(<LinkMobileMenu {...newProps} />)
      })

      test('should call onLoginClick function', () => {
        wrapper.find('.accountMenuItem').simulate('click')
        expect(onLoginClickSpy).toHaveBeenCalled()
      })
    })
  })

  describe('when isAuthenticated is true', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        isAuthenticated: true,
        shouldRenderAccountLink: true,
      }
      wrapper = shallow(<LinkMobileMenu {...newProps} />)
    })
    test('should render Log in link', () => {
      expect(wrapper.find('.accountMenuItem').children().text()).toEqual('Account')
    })

    test('should render Help link', () => {
      expect(wrapper.find('.helpMenuItem').children().text()).toEqual('Help')
    })

    describe('Account button', () => {
      test('should have to property equal /help', () => {
        expect(wrapper.find('.accountMenuItem').prop('to')).toEqual('/my-gousto')
      })
    })
  })
})
