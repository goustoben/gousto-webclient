import React from 'react'
import { shallow } from 'enzyme'
import * as trackingKeys from 'actions/trackingKeys'
import { AppStoreLinks } from 'components/AppStoreLinks'
import Footer from 'Footer/Footer'

jest.mock('actions/login')

describe('<Footer />', () => {
  const trackNavigationClick = jest.fn()
  const helpPreLoginVisibilityChange = jest.fn()
  let wrapper

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    wrapper = shallow(<Footer
      trackNavigationClick={trackNavigationClick}
      helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
    />)
  })

  test('should return a <footer>', () => {
    expect(wrapper.type()).toEqual('footer')
  })

  describe('when type prop is not passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        isAuthenticated: true
      })
    })

    test('then should render medium footer by default', () => {
      expect(wrapper.find(AppStoreLinks).length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').length).toEqual(1)
      expect(wrapper.find('#pattern').length).toEqual(0)
    })
  })

  describe('when type is "simple"', () => {
    beforeEach(() => {
      wrapper.setProps({
        type: 'simple',
      })
    })

    test('then should display the Simple footer with proper links', () => {
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
      expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
      expect(wrapper.find('#pattern').length).toEqual(0)
      expect(wrapper.find(AppStoreLinks).length).toEqual(0)
    })
  })

  describe('when simple prop is passed', () => {
    beforeEach(() => {
      wrapper.setProps({
        simple: true,
      })
    })

    test('should keep back compatibility and render proper links', () => {
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
      expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
      expect(wrapper.find('#pattern').length).toEqual(0)
      expect(wrapper.find(AppStoreLinks).length).toEqual(0)
    })
  })

  describe('when type is "large"', () => {
    beforeEach(() => {
      wrapper.setProps({
        type: 'large',
        isAuthenticated: true,
      })
    })

    test('then should render proper links', () => {
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(1)
      expect(wrapper.find(AppStoreLinks).length).toEqual(1)
    })
  })

  describe('when copyright is false', () => {
    beforeEach(() => {
      wrapper.setProps({
        copyright: false,
      })
    })

    test('then should not display copyright', () => {
      expect(wrapper.find('#copyright').length).toEqual(0)
    })
  })

  describe('when copyright is true', () => {
    beforeEach(() => {
      wrapper.setProps({
        copyright: true,
      })
    })

    test('then should display copyright', () => {
      expect(wrapper.find('#copyright').length).toEqual(1)
    })
  })

  describe('clicking the links', () => {
    test('does not open other links in a new tab', () => {
      const linksWithNewTab = wrapper.findWhere(n => n.prop('target') === '_blank')
      expect(linksWithNewTab).toHaveLength(0)
    })
  })

  describe('given the user is logged in', () => {
    let helpLink

    describe('when Help is clicked', () => {
      beforeEach(() => {
        wrapper.setProps({
          copyright: false,
          isAuthenticated: true,
        })
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
        const helpLinkWrapper = wrapper.findWhere(n => n.prop('title') === 'Help')
        expect(helpLinkWrapper.prop('to')).toContain('/help-centre')
      })
    })
  })

  describe('given the user is logged out', () => {
    let helpLink

    beforeEach(() => {
      wrapper.setProps({
        isAuthenticated: false
      })
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

  describe('when isCorporateEnquiriesLinkVisible is true', () => {
    let corporateEnquiries

    beforeEach(() => {
      wrapper.setProps({
        isCorporateEnquiriesLinkVisible: true
      })
      corporateEnquiries = wrapper.find('[data-selid="footer-corporate-enquiries"]')
    })

    test('then corporate enquiries link should be visible', () => {
      expect(corporateEnquiries.exists()).toBeTruthy()
    })

    describe('when link is clicked', () => {
      beforeEach(() => {
        corporateEnquiries.prop('tracking')()
      })

      test('then trackNavigationClick should be called with a proper parameter', () => {
        expect(trackNavigationClick).toHaveBeenCalledWith({ actionType: 'click_corporate_enquiry_footer' })
      })
    })
  })

  describe('when isCorporateEnquiriesLinkVisible is false', () => {
    beforeEach(() => {
      wrapper.setProps({
        isCorporateEnquiriesLinkVisible: false
      })
    })

    test('then corporate enquiries link should be hidden', () => {
      const corporateEnquiries = wrapper.find('[data-selid="footer-corporate-enquiries"]')
      expect(corporateEnquiries.exists()).toBeFalsy()
    })
  })
})
