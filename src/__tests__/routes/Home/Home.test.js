import React from 'react'
import Immutable from 'immutable'
import { mount, shallow } from 'enzyme'
import Helmet from 'react-helmet'

import home from 'config/home'
import routes from 'config/routes'
import HomeSections from 'routes/Home/HomeSections'
import { homeLoadCarousel } from 'actions'
import menuFetchData from 'routes/Menu/fetchData'

import Home from 'routes/Home/Home'

jest.mock('routes/Menu/fetchData')

jest.mock('routes/Home/HomeSections', () => (
  () => <div />
))

jest.mock('actions', () => ({
  homeLoadCarousel: jest.fn(),
}))

describe('Home', () => {
  let store
  let wrapper
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
    homeLoadCarousel.mockReturnValue('returned from homeLoadCarousel')
    store = {
      getState: () => ({
        homeCarouselRecipes: Immutable.OrderedMap({
          a: Immutable.fromJS({ availability: [], title: 'title' }),
          b: Immutable.fromJS({ availability: [], title: 'title' }),
          c: Immutable.fromJS({ availability: [], title: 'title' }),
          d: Immutable.fromJS({ availability: [], title: 'title' }),
          e: Immutable.fromJS({ availability: [], title: 'title' }),
          f: Immutable.fromJS({ availability: [], title: 'title' }),
          g: Immutable.fromJS({ availability: [], title: 'title' }),
          h: Immutable.fromJS({ availability: [], title: 'title' }),
          i: Immutable.fromJS({ availability: [], title: 'title' }),
        }),
        persist: { get: () => {} },
        auth: { get: () => {} },
        basket: { get: () => {} },
      }),
      subscribe: () => () => ({}),
      unsubscribe: () => ({}),
      dispatch,
    }
  })

  afterEach(() => {
    menuFetchData.mockClear()
  })

  describe('fetchData', () => {
    test('should dispatch the result of a actions.homeLoadCarousel', () => {
      Home.fetchData({ store })
      expect(dispatch).toHaveBeenCalled()
      expect(homeLoadCarousel).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalledWith(
        'returned from homeLoadCarousel',
      )
    })
  })

  describe('componentDidMount', () => {
    test('should call menu fetch data after 2.5 seconds', () => {
      jest.useFakeTimers()
      wrapper = mount(<Home />, { context: { store } })
      expect(menuFetchData).not.toHaveBeenCalled()
      jest.advanceTimersByTime(4000)
      expect(menuFetchData).toHaveBeenCalled()
      jest.clearAllTimers()
    })
  })

  describe('componentWillUnmount', () => {
    test('should not call menu fetch data if unmounted within 2.5 seconds', () => {
      jest.useFakeTimers()
      wrapper = mount(<Home />, { context: { store } })
      expect(menuFetchData).not.toHaveBeenCalled()
      wrapper.unmount()
      jest.advanceTimersByTime(3500)
      expect(menuFetchData).not.toHaveBeenCalled()
      jest.clearAllTimers()
    })
  })

  describe('rendered Home sections', () => {
    test('should display default HomeSections component with emailForm when logged-out', () => {
      wrapper = shallow(<Home isAuthenticated={false} />)
      expect(wrapper.find(HomeSections)).toHaveLength(1)
      expect(wrapper.find(HomeSections).prop('modules')).toEqual([
        'hero',
        'howItWorks',
        'subscription',
        'recipes',
        'whatsInYourBox',
        'emailForm',
        'testimonials',
        'testedAndLovedBy',
      ])
    })
    test('should display default HomeSections component without emailForm when logged-in', () => {
      wrapper = shallow(<Home isAuthenticated />)
      expect(wrapper.find(HomeSections)).toHaveLength(1)
      expect(wrapper.find(HomeSections).prop('modules')).toEqual([
        'hero',
        'howItWorks',
        'subscription',
        'recipes',
        'whatsInYourBox',
        'testimonials',
        'testedAndLovedBy',
      ])
    })
  })

  describe('cta uri & text passed to HomeSections by default', () => {
    let homeSectionsWrapper
    const expectedCtaUri = routes.client.signup
    const expectedCtaText = home.CTA.main

    beforeEach(() => {
      wrapper = shallow(<Home />)
      homeSectionsWrapper = wrapper.find(HomeSections)
    })

    test('should pass correct ctaUri & ctaText to testimonials', () => {
      expect(homeSectionsWrapper.prop('testimonials').ctaUri).toEqual(
        expectedCtaUri,
      )
      expect(homeSectionsWrapper.prop('testimonials').ctaText).toEqual(
        expectedCtaText,
      )
    })

    test('should pass correct ctaUri & ctaText to hero', () => {
      expect(homeSectionsWrapper.prop('hero').ctaUri).toEqual(expectedCtaUri)
      expect(homeSectionsWrapper.prop('hero').ctaText).toEqual(expectedCtaText)
    })

    test('should pass correct ctaUri & ctaText to recipes', () => {
      expect(homeSectionsWrapper.prop('recipes').ctaUri).toEqual(
        expectedCtaUri,
      )
      expect(homeSectionsWrapper.prop('recipes').ctaText).toEqual(
        expectedCtaText,
      )
    })

    test('should pass correct ctaUri & ctaText to whatsInYourBox', () => {
      expect(homeSectionsWrapper.prop('whatsInYourBox').ctaUri).toEqual(
        expectedCtaUri,
      )
      expect(homeSectionsWrapper.prop('whatsInYourBox').ctaText).toEqual(
        expectedCtaText,
      )
    })
  })

  describe('cta uri & text passed to HomeSections when user is authenticated', () => {
    let homeSectionsWrapper
    const expectedCtaUri = routes.client.menu
    const expectedCtaText = home.CTA.loggedIn.main

    beforeEach(() => {
      wrapper = shallow(<Home isAuthenticated />)
      homeSectionsWrapper = wrapper.find(HomeSections)
    })

    test('should pass correct ctaUri & ctaText to testimonials', () => {
      expect(homeSectionsWrapper.prop('testimonials').ctaUri).toEqual(
        expectedCtaUri,
      )
      expect(homeSectionsWrapper.prop('testimonials').ctaText).toEqual(
        expectedCtaText,
      )
    })

    test('should pass correct ctaUri & ctaText to hero', () => {
      expect(homeSectionsWrapper.prop('hero').ctaUri).toEqual(expectedCtaUri)
      expect(homeSectionsWrapper.prop('hero').ctaText).toEqual(expectedCtaText)
    })

    test('should pass correct ctaUri & ctaText to recipes', () => {
      expect(homeSectionsWrapper.prop('recipes').ctaUri).toEqual(
        expectedCtaUri,
      )
      expect(homeSectionsWrapper.prop('recipes').ctaText).toEqual(
        expectedCtaText,
      )
    })

    test('should pass correct ctaUri & ctaText to whatsInYourBox', () => {
      expect(homeSectionsWrapper.prop('whatsInYourBox').ctaUri).toEqual(
        expectedCtaUri,
      )
      expect(homeSectionsWrapper.prop('whatsInYourBox').ctaText).toEqual(
        expectedCtaText,
      )
    })
  })

  describe('helmet', () => {
    describe('when given a variant', () => {
      test('should put a canonical tag in the url', () => {
        wrapper = shallow(<Home variant="alt" />)

        expect(wrapper.find(Helmet).first().prop('link')).toEqual([{
          href: 'https://www.gousto.local/',
          rel: 'canonical',
        }])
      })
    })

    describe('when not given a variant', () => {
      test('should not put a canonical tag in the url', () => {
        wrapper = shallow(<Home />)

        expect(wrapper.find(Helmet).first().prop('link')).toEqual([])
      })
    })
  })
})
