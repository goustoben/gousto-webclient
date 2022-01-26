import React from 'react'
import { mount } from 'enzyme'
import * as trackingKeys from 'actions/trackingKeys'
import { NavBar } from 'routes/Account/Account/NavBar'
import NavBarItem from 'routes/Account/Account/NavBar/NavBarItem/NavBarItem'
import config from 'config/routes'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe('NavBar', () => {
  const initialState = {}

  describe('rendering', () => {
    let wrapper
    let store

    beforeEach(() => {
      const mockStore = configureStore([thunk])
      store = mockStore(initialState)
      wrapper = mount(
        <Provider store={store}>
          <NavBar />
        </Provider>
      )
    })

    test('should render 6 NavBarItem', () => {
      expect(wrapper.find(NavBarItem).length).toEqual(6)
    })

    test('should render 1 <ul>', () => {
      expect(wrapper.find('ul').length).toEqual(1)
    })
  })

  describe('mounting', () => {
    let wrapper
    let navBars
    let store

    beforeEach(() => {
      const mockStore = configureStore([thunk])
      store = mockStore(initialState)
      wrapper = mount(
        <Provider store={store}>
          <NavBar />
        </Provider>
      )
      navBars = wrapper.find('a')
    })

    test('should render with correct routes in order', () => {
      expect(navBars.at(0).props().href).toEqual(config.client.myDeliveries)
      expect(navBars.at(1).props().href).toEqual(config.client.mySubscription)
      expect(navBars.at(2).props().href).toEqual(config.client.myDetails)
      expect(navBars.at(3).props().href).toEqual(config.client.myReferral)
      expect(navBars.at(4).props().href).toEqual(config.client.rateMyRecipes)
    })

    test('should pass a tracking prop', () => {
      const location = 'nav'
      const type = trackingKeys.clickRateRecipes
      navBars.at(4).simulate('click')
      expect(store.getActions()).toEqual([{
        type,
        trackingData: {
          actionType: type,
          location
        }
      }])
    })
  })
})
