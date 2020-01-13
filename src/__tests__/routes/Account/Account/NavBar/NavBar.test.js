import React from 'react'
import { shallow, mount } from 'enzyme'
import NavBar from 'routes/Account/Account/NavBar'
import NavBarItem from 'routes/Account/Account/NavBar/NavBarItem/NavBarItem'
import config from 'config/routes'

describe('NavBar', () => {
  describe('rendering', () => {
    let wrapper

    beforeEach(() => {
      wrapper = shallow(<NavBar />)
    })

    test('should render a <div> with no props', () => {
      expect(wrapper.type()).toEqual('div')
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

    beforeEach(() => {
      wrapper = mount(<NavBar />)
      navBars = wrapper.find('a')
    })

    test('should render with correct routes in order', () => {
      expect(navBars.at(0).props().href).toEqual(config.client.myDeliveries)
      expect(navBars.at(1).props().href).toEqual(config.client.mySubscription)
      expect(navBars.at(2).props().href).toEqual(config.client.myDetails)
      expect(navBars.at(3).props().href).toEqual(config.client.myReferral)
      expect(navBars.at(4).props().href).toEqual(config.client.rateMyRecipes)
    })

    describe('when isAccountTabNameTest is true', () => {
      test('then the navBar titles should be "Upcoming Deliveries", "Subscription Settings" and "Account Details"', () => {
        wrapper = mount(<NavBar isAccountTabNameTest />)
        navBars = wrapper.find('a')

        expect(navBars.at(0).text()).toEqual('Upcoming Deliveries')
        expect(navBars.at(1).text()).toEqual('Subscription Settings')
        expect(navBars.at(2).text()).toEqual('Account Details')
      })
    })

    describe('when isAccountTabNameTest is false', () => {
      test('then the navBar titles should be "Deliveries", "Subscription" and "Details"', () => {
        expect(navBars.at(0).text()).toEqual('Deliveries')
        expect(navBars.at(1).text()).toEqual('Subscription')
        expect(navBars.at(2).text()).toEqual('Details')
      })
    })
  })
})
