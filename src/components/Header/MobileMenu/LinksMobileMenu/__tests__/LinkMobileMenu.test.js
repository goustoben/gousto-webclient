import React from 'react'
import { shallow } from 'enzyme'
import { LinkMobileMenu } from '../LinksMobileMenu'

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

    describe('help button', () => {
      test('should have to property equal /help', () => {
        expect(wrapper.find('.helpMenuItem').prop('to')).toEqual('https://gousto.zendesk.com/hc/en-gb')
      })

      test('should have target property equal _blank to open link in new tab', () => {
        expect(wrapper.find('.helpMenuItem').prop('target')).toEqual('_blank')
      })
    })
  })

  describe('when isAuthenticated is true', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        isAuthenticated: true,
        shouldRenderNewMenuDesign: true,
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
