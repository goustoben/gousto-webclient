import React from 'react'
import * as trackingKeys from 'actions/trackingKeys'
import { AppStoreLinks } from 'components/AppStoreLinks'
import { Footer } from 'Footer/Footer'
import { mount } from 'enzyme'
import * as Redux from 'react-redux'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

jest.mock('actions/login')

describe('<Footer />', () => {
  const trackNavigationClick = jest.fn()
  const helpPreLoginVisibilityChange = jest.fn()
  let wrapper
  const mockStore = configureMockStore()
  const mockedStore = mockStore({
    features: {},
  })
  const dispatch = jest.fn()
  jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
  jest.spyOn(Redux, 'useSelector').mockImplementation(() => false)
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <Footer
          trackNavigationClick={trackNavigationClick}
          helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
        />
      </Provider>)
  })

  test('should return a <footer>', () => {
    expect(wrapper.find('footer')).toBeTruthy()
  })

  describe('when type prop is not passed', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isAuthenticated
          />
        </Provider>)
    })

    test('then should render medium footer by default', () => {
      expect(wrapper.find(AppStoreLinks).length).toEqual(1)
      expect(wrapper.find('footer').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-learn-more"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('#pattern').length).toEqual(0)
    })
  })

  describe('when type prop is not any of supported sizes', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isAuthenticated
            type="not-supported-size"
          />
        </Provider>)
    })

    test('then should render medium footer by default', () => {
      expect(wrapper.find(AppStoreLinks).length).toEqual(1)
      expect(wrapper.find('footer').length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-learn-more"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('#pattern').length).toEqual(0)
    })
  })

  describe('when type is "simple"', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            type="simple"
          />
        </Provider>)
    })

    test('then should display the Simple footer with proper links', () => {
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
      expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
      expect(wrapper.find('#pattern').length).toEqual(0)
      expect(wrapper.find(AppStoreLinks).length).toEqual(0)
    })
  })

  describe('when simple prop is passed', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            simple
          />
        </Provider>)
    })

    test('should keep back compatibility and render proper links', () => {
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').length).toEqual(0)
      expect(wrapper.find('[data-selid="footer-learn-more"]').length).toEqual(0)
      expect(wrapper.find('#pattern').length).toEqual(0)
      expect(wrapper.find(AppStoreLinks).length).toEqual(0)
    })
  })

  describe('when type is "large"', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isAuthenticated
            type="large"
          />
        </Provider>)
    })

    test('then should render proper links', () => {
      expect(wrapper.find('[data-selid="footer-terms-of-use"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-privacy-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-modern-slavery-statement"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-facebook"]').hostNodes().length).toEqual(1)
      expect(wrapper.find('[data-selid="footer-learn-more"]').hostNodes().length).toEqual(1)
      expect(wrapper.find(AppStoreLinks).length).toEqual(1)
    })
  })

  describe('when copyright is false', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            copyright={false}
          />
        </Provider>)
    })

    test('then should not display copyright', () => {
      expect(wrapper.find('#copyright').length).toEqual(0)
    })
  })

  describe('when copyright is true', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            copyright
          />
        </Provider>)
    })

    test('then should display copyright', () => {
      expect(wrapper.find('#copyright').hostNodes().length).toEqual(1)
    })
  })

  describe('clicking the links', () => {
    test('does not open other links in a new tab', () => {
      const linksWithNewTab = wrapper.findWhere(n => n.prop('target') === '_blank').hostNodes()
      expect(linksWithNewTab).toHaveLength(0)
    })
  })

  describe('given the user is logged in', () => {
    let helpLink

    describe('when Help is clicked', () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={mockedStore}>
            <Footer
              trackNavigationClick={trackNavigationClick}
              helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
              copyright={false}
              isAuthenticated
            />
          </Provider>)
        helpLink = wrapper.findWhere(n => n.prop('title') === 'Help').hostNodes()
      })

      xtest('tracking event is dispatched correctly', () => {
        const TRACKING_DATA = {
          actionType: trackingKeys.clickHelpFooter,
          logged_in: true,
          seCategory: 'help',
        }
        helpLink.prop('tracking')()

        expect(trackNavigationClick).toHaveBeenCalledWith(TRACKING_DATA)
      })

      test('the help links to the help center page', () => {
        const helpLinkWrapper = wrapper.findWhere(n => n.prop('title') === 'Help').hostNodes()
        expect(helpLinkWrapper.prop('to')).toContain('/help-centre')
      })
    })
  })

  describe('given the user is logged out', () => {
    let helpLink

    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isAuthenticated={false}
          />
        </Provider>)
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
    test('then trackWeeklyRecipesClick should not be called by default', () => {
      expect(trackNavigationClick).not.toBeCalled()
    })

    describe('and a user clicks on it', () => {
      beforeEach(() => {
        wrapper.find('[data-test="week-recipes"]').hostNodes().simulate('click')
      })

      test('then trackNavigationClick should be called with proper prop', () => {
        expect(trackNavigationClick).toHaveBeenCalledWith({ actionType: trackingKeys.clickRecipeNavigationFooter })
      })
    })
  })

  describe('when isCorporateEnquiriesLinkVisible is true', () => {
    let corporateEnquiries

    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isCorporateEnquiriesLinkVisible
          />
        </Provider>)
      corporateEnquiries = wrapper.find('[data-selid="footer-corporate-enquiries"]').hostNodes()
    })

    test('then corporate enquiries link should be visible', () => {
      expect(corporateEnquiries.exists()).toBeTruthy()
    })

    xdescribe('when link is clicked', () => {
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
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isCorporateEnquiriesLinkVisible={false}
          />
        </Provider>)
    })

    test('then corporate enquiries link should be hidden', () => {
      const corporateEnquiries = wrapper.find('[data-selid="footer-corporate-enquiries"]').hostNodes()
      expect(corporateEnquiries.exists()).toBeFalsy()
    })
  })

  describe('when isGiftCardsLinkVisible is true', () => {
    let element

    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isGiftCardsLinkVisible
          />
        </Provider>)
      element = wrapper.find('[data-selid="footer-gift-cards"]').hostNodes()
    })

    test('then the Gift Cards link should be visible', () => {
      expect(element.exists()).toBe(true)
    })

    xdescribe('when link is clicked', () => {
      beforeEach(() => {
        element.prop('tracking')()
      })

      test('then trackNavigationClick should be called with a proper parameter', () => {
        expect(trackNavigationClick).toHaveBeenCalledWith({ actionType: 'click_gift_cards_footer' })
      })
    })
  })

  describe('when isGiftCardsLinkVisible is false', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={mockedStore}>
          <Footer
            trackNavigationClick={trackNavigationClick}
            helpPreLoginVisibilityChange={helpPreLoginVisibilityChange}
            isGiftCardsLinkVisible={false}
          />
        </Provider>)
    })

    test('then corporate enquiries link should be hidden', () => {
      const element = wrapper.find('[data-selid="footer-gift-cards"]').hostNodes()
      expect(element.exists()).toBe(false)
    })
  })
})
