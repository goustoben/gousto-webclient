import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import menuFetchData from 'routes/Menu/fetchData'
import { Home } from '../Home'

jest.mock('routes/Menu/fetchData')

describe('Home', () => {
  let store
  let wrapper
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
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
        persist: { get: jest.fn() },
        auth: { get: jest.fn() },
        basket: { get: jest.fn() },
      }),
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      dispatch,
    }

    wrapper = shallow(<Home redirectLoggedInUser={jest.fn()} />, { context: { store } })
  })

  afterEach(() => {
    menuFetchData.mockClear()
  })

  describe('componentDidMount', () => {
    test('should call menu fetch data after 2.5 seconds', () => {
      jest.useFakeTimers()
      wrapper = shallow(<Home redirectLoggedInUser={jest.fn()} />, { context: { store } })
      expect(menuFetchData).not.toHaveBeenCalled()
      jest.advanceTimersByTime(4000)
      expect(menuFetchData).toHaveBeenCalled()
      jest.clearAllTimers()
    })
  })

  describe('componentWillUnmount', () => {
    test('should not call menu fetch data if unmounted within 2.5 seconds', () => {
      jest.useFakeTimers()
      expect(menuFetchData).not.toHaveBeenCalled()
      wrapper.unmount()
      jest.advanceTimersByTime(3500)
      expect(menuFetchData).not.toHaveBeenCalled()
      jest.clearAllTimers()
    })
  })

  test('should render 3 components', () => {
    expect(wrapper.children()).toHaveLength(3)
  })

  describe('helmet', () => {
    test('should contain correct title', () => {
      expect(wrapper.find(Helmet).prop('title')).toBe('Recipe Boxes | Get Fresh Food & Recipes Delivered | Gousto')
    })

    describe('when given a variant', () => {
      beforeEach(() => {
        wrapper.setProps({
          variant: 'alt'
        })
      })

      test('should put a canonical tag in the url', () => {
        expect(wrapper.find(Helmet).first().prop('link')).toEqual([{
          href: 'https://www.gousto.local/',
          rel: 'canonical',
        }])
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
        isAuthenticated: true
      })
      homeSectionsWrapper = wrapper.find('HomeSections')
    })

    test('then should pass proper props', () => {
      expect(homeSectionsWrapper.props().ctaUri).toEqual('/menu')
      expect(homeSectionsWrapper.props().ctaText).toEqual('See Menu')
    })
  })
})
