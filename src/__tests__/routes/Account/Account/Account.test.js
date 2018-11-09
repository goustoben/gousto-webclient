import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import AccountComponent from 'routes/Account/Account/Account'
import NavBar from 'routes/Account/Account/NavBar'
import Banner from 'routes/Account/Account/Banner'

describe('Account', () => {
  let wrapper
  let children
  let location
  let context
  let dispatch
  let subscribe
  let getState
  let store
  let userRecipeRatings

  beforeEach(() => {
    children = 'test'
    dispatch = sinon.spy()
    subscribe = sinon.spy()
    userRecipeRatings = sinon.stub().returns()
    location = { pathname: '/my-details' }
    wrapper = shallow(
			<AccountComponent location={location}>{children}</AccountComponent>,
    )

    store = {
      user: Immutable.Map({
        rateCount: 2,
      }),
    }
    getState = sinon.stub().returns(store)

    context = {
      store: {
        getState,
        subscribe,
        dispatch,
      },
    }
  })

  describe('rendering', () => {
    test('should render a <div>', () => {
      wrapper = shallow(
				<AccountComponent location={location}>{children}</AccountComponent>,
      )
      expect(wrapper.type()).toEqual('div')
    })

    test('should render 1 <NavBar> component(s)', () => {
      wrapper = shallow(
				<AccountComponent location={location}>{children}</AccountComponent>,
      )
      expect(wrapper.find(NavBar).length).toEqual(1)
    })

    test('should render 1 <Banner> component(s)', () => {
      wrapper = shallow(
				<AccountComponent location={location}>{children}</AccountComponent>,
      )
      expect(wrapper.find(Banner).length).toEqual(1)
    })

    test('should not render <Banner> component(s) for my Gousto', () => {
      location = { pathname: '/my-gousto' }
      wrapper = shallow(
				<AccountComponent location={location}>{children}</AccountComponent>,
      )
      expect(wrapper.find(Banner).length).toEqual(0)
    })

    test('should render <Banner> component(s) for the new mydeliveries page', () => {
      location = { pathname: '/mydeliveries' }
      wrapper = shallow(
				<AccountComponent location={location}>{children}</AccountComponent>,
      )
      expect(wrapper.find(Banner).length).toEqual(1)
    })
  })
})
