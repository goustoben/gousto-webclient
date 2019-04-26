import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import AccountComponent from 'routes/Account/Account/Account'
import NavBar from 'routes/Account/Account/NavBar'
import Banner from 'routes/Account/Account/Banner'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

describe('Account', () => {
  let wrapper
  let children
  let location
  let context
  let dispatch
  let subscribe
  let getState
  let userRecipeRatings
  let state

  beforeEach(() => {
    children = 'test'
    dispatch = jest.fn()
    subscribe = jest.fn()
    userRecipeRatings = jest.fn()
    location = { pathname: '/my-details' }
    state = mockStore({
      user: Immutable.Map({
        rateCount: 2,
      }),
    })
    getState = () => ({
      user: Immutable.Map({
        rateCount: 2,
      }),
    })
    context = {
      store: {
        getState,
        subscribe,
        dispatch,
        userRecipeRatings,
        state
      },
    }
    wrapper = shallow(
      <AccountComponent location={location}>{children}</AccountComponent>,
      { context }
    )
  })

  describe('rendering', () => {
    test('should render a <div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <NavBar> component(s)', () => {
      expect(wrapper.find(NavBar).length).toEqual(1)
    })

    test('should render 1 <Banner> component(s)', () => {
      expect(wrapper.find(Banner).length).toEqual(1)
    })

    test('should not render <Banner> component(s) for my Gousto', () => {
      location = { pathname: '/my-gousto' }
      wrapper = shallow(
        <AccountComponent location={location}>{children}</AccountComponent>,
        { context }
      )
      expect(wrapper.find(Banner).length).toEqual(0)
    })

    test('should render <Banner> component(s) for the new mydeliveries page', () => {
      location = { pathname: '/mydeliveries' }
      wrapper = shallow(
        <AccountComponent location={location}>{children}</AccountComponent>,
        { context }
      )
      expect(wrapper.find(Banner).length).toEqual(1)
    })
  })
})
