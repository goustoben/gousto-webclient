import React from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import configureMockStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import { fetchMenuForCarousel } from 'routes/Home/homeActions'
import { Home } from '../Home'

jest.mock('routes/Home/homeActions', () => ({
  fetchMenuForCarousel: jest.fn(),
}))

// We add legacy context to access the store to test the Home
// component. This is cause enzyme only supports legacy context
Home.contextTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.any,
}

describe('Home', () => {
  let store
  let wrapper

  beforeEach(() => {
    fetchMenuForCarousel.mockImplementation(
      jest.fn(() => ({
        type: 'action',
      }))
    )

    const mockStore = configureMockStore()
    store = mockStore({
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
      persist: { get: jest.fn() },
      auth: { get: jest.fn() },
      basket: { get: jest.fn() },
    })

    wrapper = shallow(<Home store={store} />, {
      context: { store },
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('componentDidMount', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      wrapper = shallow(<Home store={store} />, {
        context: { store },
      })
      wrapper.instance().context = store
    })

    afterEach(() => {
      jest.clearAllMocks()
      jest.clearAllTimers()
    })

    test('should fetch recipes for the carousel', () => {
      expect(fetchMenuForCarousel).toHaveBeenCalled()
    })
  })

  test('should render 3 components', () => {
    expect(wrapper.children()).toHaveLength(3)
  })

  describe('helmet', () => {
    test('should contain correct title', () => {
      expect(wrapper.find(Helmet).prop('title')).toBe(
        'Recipe Boxes | Get Fresh Food & Recipes Delivered | Gousto'
      )
    })

    describe('when given a variant', () => {
      beforeEach(() => {
        wrapper.setProps({
          variant: 'alt',
        })
      })

      test('should put a canonical tag in the url', () => {
        expect(wrapper.find(Helmet).first().prop('link')).toEqual([
          {
            href: 'https://www.gousto.local/',
            rel: 'canonical',
          },
        ])
      })
    })

    describe('when not given a variant', () => {
      test('should not put a canonical tag in the url', () => {
        expect(wrapper.find(Helmet).first().prop('link')).toEqual([])
      })
    })
  })

  describe('when user is authenticated', () => {
    let homeSectionsWrapper

    beforeEach(() => {
      wrapper.setProps({
        isAuthenticated: true,
        pricePerServing: '2.87',
      })
      homeSectionsWrapper = wrapper.find('HomeSections')
    })

    test('then should pass proper props', () => {
      expect(homeSectionsWrapper.props().ctaUri).toEqual('/menu')
      expect(homeSectionsWrapper.props().ctaText).toEqual('See Menu')
      expect(homeSectionsWrapper.props().pricePerServing).toEqual('2.87')
    })
  })

  describe('getModules', () => {
    const defaultHomeModules = ['hero', 'trustPilot', 'whyChooseGousto', 'joeWicks', 'recipes']

    describe('given no arguments passed', () => {
      describe('when getModules is called', () => {
        test('then should return default home modules', () => {
          const { getModules } = wrapper.instance()
          expect(getModules()).toEqual(defaultHomeModules)
        })
      })
    })

    describe('given arguments are passed', () => {
      describe('when getModules is called and arguments are truthy', () => {
        test('then returned modules should contain emailForm', () => {
          const { getModules } = wrapper.instance()
          const expected = ['emailForm', ...defaultHomeModules]
          const isSignupReductionEnabled = true
          expect(getModules(isSignupReductionEnabled)).toEqual(expected)
        })
      })
    })
  })
})
