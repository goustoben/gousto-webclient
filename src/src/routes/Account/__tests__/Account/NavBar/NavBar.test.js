import React from 'react'
import { mount } from 'enzyme'
import NavBar from 'routes/Account/Account/NavBar'
import config from 'config/routes'
import { OptimizelyRolloutsContainer } from '../../../../../containers/OptimizelyRollouts'

jest.mock('../../../../../containers/OptimizelyRollouts', () => ({
  OptimizelyRolloutsContainer: jest.fn()
}))

describe('NavBar', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    describe('when optimizely featureEnabled is true', () => {
      let wrapper
      let navBars

      beforeEach(() => {
        OptimizelyRolloutsContainer.mockImplementation(({ featureEnabled, children }) => (featureEnabled ? children : null))

        wrapper = mount(<NavBar />)
        navBars = wrapper.find('a')
      })

      test('should render MenuItems with Rate My Recipes higher than My Details', () => {
        expect(navBars.at(0).props().href).toEqual(config.client.myDeliveries)
        expect(navBars.at(1).props().href).toEqual(config.client.mySubscription)
        expect(navBars.at(2).props().href).toEqual(config.client.rateMyRecipes)
        expect(navBars.at(3).props().href).toEqual(config.client.myReferral)
        expect(navBars.at(4).props().href).toEqual(config.client.myDetails)
      })
    })

    describe('when featureEnabled is false', () => {
      let wrapper
      let navBars

      beforeEach(() => {
        OptimizelyRolloutsContainer.mockImplementation(({ featureEnabled, children }) => (!featureEnabled ? children : null))

        wrapper = mount(<NavBar />)
        navBars = wrapper.find('a')
      })

      test('should render MenuItems with Rate My Recipes lower than My Details', () => {
        expect(navBars.at(0).props().href).toEqual(config.client.myDeliveries)
        expect(navBars.at(1).props().href).toEqual(config.client.mySubscription)
        expect(navBars.at(2).props().href).toEqual(config.client.myDetails)
        expect(navBars.at(3).props().href).toEqual(config.client.myReferral)
        expect(navBars.at(4).props().href).toEqual(config.client.rateMyRecipes)
      })
    })
  })
})
