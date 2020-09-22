import React from 'react'
import { shallow, mount } from 'enzyme'
import { LoginMobile } from '../LoginMobile'

describe('<LoginMobile />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <LoginMobile
        showAppAwareness={false}
        trackAppStoreLoginButton={() => {}}
        trackPlayStoreLoginButton={() => {}}
      >
        <div data-testing="child" />
      </LoginMobile>
    )
  })

  test('children is rendered', () => {
    expect(wrapper.find('[data-testing="child"]').length).toBe(1)
  })

  test('<AppStoreLinks /> is not rendered', () => {
    expect(wrapper.find('AppStoreLinks').length).toBe(0)
  })

  test('Heading is not rendered', () => {
    expect(wrapper.find('Heading').length).toBe(0)
  })

  describe('when showAppAwareness feature is turned on', () => {
    const trackAppStoreLoginButton = jest.fn()
    const trackPlayStoreLoginButton = jest.fn()

    beforeEach(() => {
      wrapper = mount(
        <LoginMobile
          showAppAwareness
          trackAppStoreLoginButton={trackAppStoreLoginButton}
          trackPlayStoreLoginButton={trackPlayStoreLoginButton}
        >
          <div />
        </LoginMobile>
      )
    })

    afterEach(() => {
      trackPlayStoreLoginButton.mockClear()
      trackAppStoreLoginButton.mockClear()
    })

    test('<AppStoreLinks /> is rendered', () => {
      expect(wrapper.find('AppStoreLinks').length).toBe(1)
    })

    test('Heading is rendered', () => {
      expect(wrapper.find('HeadingWithSeparator').length).toBe(1)
    })

    describe('and when clicking on play store', () => {
      beforeEach(() => {
        wrapper.find('AppStoreLinks').find('a').at(0).simulate('click')
      })

      test('trackPlayStoreLoginButton is called', () => {
        expect(trackPlayStoreLoginButton).toHaveBeenCalledTimes(1)
      })
    })

    describe('and when clicking on app store', () => {
      beforeEach(() => {
        wrapper.find('AppStoreLinks').find('a').at(1).simulate('click')
      })

      test('trackAppStoreLoginButton is called', () => {
        expect(trackAppStoreLoginButton).toHaveBeenCalledTimes(1)
      })
    })

    describe('and when login is opened through help', () => {
      beforeEach(() => {
        wrapper = shallow(
          <LoginMobile
            showAppAwareness
            isHelpPreLoginOpen
            trackAppStoreLoginButton={() => {}}
            trackPlayStoreLoginButton={() => {}}
          >
            <div />
          </LoginMobile>
        )
      })

      test('<AppStoreLinks /> is not rendered', () => {
        expect(wrapper.find('AppStoreLinks').length).toBe(0)
      })
    })
  })
})
