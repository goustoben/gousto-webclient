import React from 'react'
import { shallow } from 'enzyme'
import { MobileWrapper } from '../MobileWrapper'

describe('MenuWrapper', () => {
  let wrapper
  const props = {
    isAuthenticated: false,
    hideNav: false,
    mobileMenuOpen: false,
    mobileMenuItems: [{ name: '', url: '' }],
    hideMobileMenu: false,
    onOpen: () => { },
    logoutFunc: () => { },
    showMobileMenu: () => { },
    promoCodeUrl: '',
    trackNavigationClick: () => { },
    serverError: false,
  }

  describe('when shouldRenderNewMenuDesign false', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        shouldRenderNewMenuDesign: false
      }
      wrapper = shallow(<MobileWrapper {...newProps} />)
    })

    test('should render MobileMenu', () => {
      expect(wrapper.find('MobileMenu').exists()).toBe(true)
    })

    test('should render burgerMenu button', () => {
      expect(wrapper.find('[data-testing="burgerMenu"]').exists()).toBe(true)
    })
  })

  describe('when shouldRenderNewMenuDesign true', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        shouldRenderNewMenuDesign: true
      }
      wrapper = shallow(<MobileWrapper {...newProps} />)
    })

    describe('when isAuthenticated is false', () => {
      test('should render Log in link', () => {
        expect(wrapper.find('.accountMenuItem').text()).toEqual('Log in')
      })

      test('should render Help link', () => {
        expect(wrapper.find('.helpMenuItem').children().text()).toEqual('Help')
      })

      describe('when click on login button', () => {
        const trackNavigationClickSpy = jest.fn()
        const loginFunc = jest.fn()
        beforeEach(() => {
          const newProps = {
            ...props,
            shouldRenderNewMenuDesign: true,
            trackNavigationClick: trackNavigationClickSpy,
            onOpen: loginFunc
          }
          wrapper = shallow(<MobileWrapper {...newProps} />)
        })

        test('should call tracking function', () => {
          wrapper.find('.accountMenuItem').simulate('click')
          expect(trackNavigationClickSpy).toHaveBeenCalledWith('New Login Clicked')
        })
        test('should call login function', () => {
          wrapper.find('.accountMenuItem').simulate('click')
          expect(loginFunc).toHaveBeenCalled()
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
        wrapper = shallow(<MobileWrapper {...newProps} />)
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
})
