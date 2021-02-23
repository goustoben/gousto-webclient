import React from 'react'
import { shallow } from 'enzyme'
import AccountComponent from 'routes/Account/Account/Account'
import NavBar from 'routes/Account/Account/NavBar'
import Banner from 'routes/Account/Account/Banner'

describe('Account', () => {
  let wrapper
  let children
  let location

  beforeEach(() => {
    children = 'test'
    location = { pathname: '/my-details' }
    wrapper = shallow(
      <AccountComponent
        location={location}
        userLoadData={() => {}}
        checkCardExpiry={() => {}}
        subscriptionLoadData={() => {}}
        loadMenuServiceDataIfDeepLinked={() => {}}
        userRecipeRatings={() => {}}
      >
        {children}
      </AccountComponent>
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
        <AccountComponent
          location={location}
          userLoadData={() => {}}
          checkCardExpiry={() => {}}
          subscriptionLoadData={() => {}}
          loadMenuServiceDataIfDeepLinked={() => {}}
          userRecipeRatings={() => {}}
        >
          {children}
        </AccountComponent>
      )
      expect(wrapper.find(Banner).length).toEqual(0)
    })
  })
})
