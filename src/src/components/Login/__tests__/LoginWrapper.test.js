import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'
import { Provider } from 'react-redux'
import { LoginWrapper } from '../LoginWrapper'

describe('<LoginWrapper />', () => {
  let wrapper
  const store = {
    getState: () => ({
      auth: fromJS({
        isAuthenticated: true,
        isRecaptchaEnabled: false,
      }),
      error: fromJS({}),
      features: fromJS({
        rememberMeDefault: {
          value: true,
        },
      }),
      loginVisibility: fromJS({
        helpPreLogin: false,
      }),
      pending: fromJS({}),
    }),
    dispatch: () => {},
    subscribe: () => {},
  }

  describe('when rendered on any device viewport', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <LoginWrapper isMobileViewport />
        </Provider>
      )
    })

    test('the "Login" title is rendered', () => {
      expect(wrapper.find('Heading').at(0).text()).toBe('Log in')
    })

    describe('when the title prop is passed', () => {
      const TITLE = 'This is the title'

      beforeEach(() => {
        wrapper = mount(
          <Provider store={store}>
            <LoginWrapper title={TITLE} isMobileViewport />
          </Provider>
        )
      })

      beforeEach(() => {
        wrapper.setProps({ title: TITLE })
      })

      test('the title is rendered in the heading element', () => {
        expect(wrapper.find('Heading').at(0).text()).toBe(TITLE)
      })
    })
  })

  describe('when on mobile viewport', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <LoginWrapper isMobileViewport />
        </Provider>
      )
    })

    test('<LoginMobile /> is rendered', () => {
      expect(wrapper.find('LoginDesktop').length).toBe(0)
      expect(wrapper.find('LoginMobile').length).toBe(1)
    })
  })

  describe('when not on mobile viewport', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <LoginWrapper isMobileViewport={false} />
        </Provider>
      )
    })

    test('<LoginDesktop /> is rendered', () => {
      expect(wrapper.find('LoginDesktop').length).toBe(1)
      expect(wrapper.find('LoginMobile').length).toBe(0)
    })
  })
})
