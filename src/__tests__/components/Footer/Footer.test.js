import React from 'react'
import { shallow } from 'enzyme'
import * as trackingKeys from 'actions/trackingKeys'
import { AppStoreLinks } from 'components/AppStoreLinks'
import Footer from 'Footer/Footer'
import { helpPreLoginVisibilityChange } from "actions/login/helpPreLoginVisibilityChange"

jest.mock('actions/login')

describe('<Footer />', () => {
  const trackNavigationClick = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return a <footer>', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper.type()).toEqual('footer')
  })

  test('should display the medium footer by default which conatains AppStoreLinks and full list', () => {
    const wrapper = shallow(<Footer isAuthenticated />)
    expect(wrapper.find(AppStoreLinks).length).toEqual(1)

    // Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(1)
    // Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(1)
    // render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // render Modern Slavery link
    expect(
      wrapper.find('[data-selid="footer-modern-slavery-statement"]').length,
    ).toEqual(1)
    // Don't render pattern
    expect(wrapper.find('#pattern').length).toEqual(0)
  })

  test("should display the Simple footer when type is 'simple' ", () => {
    const wrapper = shallow(<Footer type="simple" />)
    // Render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // Render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // render Modern Slavery link
    expect(
      wrapper.find('[data-selid="footer-modern-slavery-statement"]').length,
    ).toEqual(1)
    // DONT Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
    // DONT Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
    // DONT render pattern
    expect(wrapper.find('#pattern').length).toEqual(0)
    // DONT render app store links
    expect(wrapper.find(AppStoreLinks).length).toEqual(0)
  })

  test('should keep back compatibility with the `simple` prop ', () => {
    const wrapper = shallow(<Footer simple />)
    // Render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // Render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // render Modern Slavery link
    expect(
      wrapper.find('[data-selid="footer-modern-slavery-statement"]').length,
    ).toEqual(1)
    // DONT Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
    // DONT Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
    // DONT render pattern
    expect(wrapper.find('#pattern').length).toEqual(0)
    // DONT render app store links
    expect(wrapper.find(AppStoreLinks).length).toEqual(0)
  })

  test("should display the Large footer when type is 'large' ", () => {
    const wrapper = shallow(<Footer type="large" isAuthenticated />)
    // render Terms
    expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
    // Render Privacy links
    expect(
      wrapper.find('[data-selid="footer-privacy-statement"]').length,
    ).toEqual(1)
    // render Modern Slavery link
    expect(
      wrapper.find('[data-selid="footer-modern-slavery-statement"]').length,
    ).toEqual(1)
    // Render app links store
    expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(1)
    // Render full list
    expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(1)
    // Render app store links
    expect(wrapper.find(AppStoreLinks).length).toEqual(1)
  })

  test('should not display copyright if set to false', () => {
    const wrapper = shallow(<Footer copyright={false} />)
    // render Terms
    expect(wrapper.find('#copyright').length).toEqual(0)
  })

  test('should display copyright if set to true', () => {
    const wrapper = shallow(<Footer copyright />)
    // render Terms
    expect(wrapper.find('#copyright').length).toEqual(1)
  })

  describe('clicking the links', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<Footer />)
    })

    test('does not open other links in a new tab', () => {
      const linksWithNewTab = wrapper.findWhere(n => n.prop('target') === '_blank')
      expect(linksWithNewTab).toHaveLength(0)
    })
  })

  describe('given the user is logged in', () => {
    let wrapper
    let helpLink

    describe('when Help is clicked', () => {
      beforeEach(() => {
        wrapper = shallow(
          <Footer
            copyright={false}
            isAuthenticated
            trackNavigationClick={trackNavigationClick}
          />
        )

        helpLink = wrapper.findWhere(n => n.prop('title') === 'Help')
      })

      test('tracking event is dispatched correctly', () => {
        const TRACKING_DATA = {
          actionType: trackingKeys.clickHelpFooter,
          logged_in: true,
          seCategory: 'help',
        }
        helpLink.prop('tracking')()

        expect(trackNavigationClick).toHaveBeenCalledWith(TRACKING_DATA)
      })

      test('the help links to the help center page', () => {
        const helpLink = wrapper.findWhere(n => n.prop('title') === 'Help')
        expect(helpLink.prop('to')).toContain('/help-centre')
      })
    })
  })

  describe('given the user is logged out', () => {
    let wrapper
    let helpLink

    beforeEach(() => {
      wrapper = shallow(
        <Footer
          helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
          isAuthenticated={false}
          trackNavigationClick={trackNavigationClick}
        />
      )
      helpLink = wrapper.find('[data-test="help-link"]')
    })

    test('the help link is not a Link component', () => {
      expect(helpLink.name()).not.toBe('GoustoLink')
    })

    describe('when Help link is clicked', () => {
      beforeEach(() => {
        helpLink.simulate('click')
      })

      test('helpPreLoginVisibilityChange action generator is called with visibility true', () => {
        expect(helpPreLoginVisibilityChange).toHaveBeenCalledWith(true)
      })

      test('tracking event is dispatched correctly', () => {
        const TRACKING_DATA = {
          actionType: trackingKeys.clickHelpFooter,
          logged_in: false,
          seCategory: 'help',
        }

        expect(trackNavigationClick).toHaveBeenCalledWith(TRACKING_DATA)
      })
    })

    describe('when Help link is clicked using ENTER in the keyboard', () => {
      beforeEach(() => {
        helpLink.simulate('keyDown', { keyCode: 13 })
      })

      test('helpPreLoginVisibilityChange action generator is called with visibility true', () => {
        expect(helpPreLoginVisibilityChange).toHaveBeenCalledWith(true)
      })
    })
  })

  describe('when weeks recipes link is rendered', () => {
    const wrapper = shallow(<Footer trackNavigationClick={trackNavigationClick} />)

    test('then it should be client routed', () => {
      const recipesSelector = '[data-selid="footer-this-weeks-recipes"]'
      const weekRecipes = wrapper.find(recipesSelector)
      expect(weekRecipes.prop('clientRouted')).toBeTruthy()
    })

    test('then trackWeeklyRecipesClick should not be called by default', () => {
      expect(trackNavigationClick).not.toBeCalled()
    })

    describe('and a user clicks on it', () => {
      beforeEach(() => {
        wrapper.find('[data-test="week-recipes"]').simulate('click')
      })

      test('then trackNavigationClick should be called with proper prop', () => {
        expect(trackNavigationClick).toHaveBeenCalledWith({ actionType: trackingKeys.clickRecipeNavigationFooter })
      })
    })
  })
})
