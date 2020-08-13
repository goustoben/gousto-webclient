import React from 'react'
import { BoxPrices } from 'routes/BoxPrices/BoxPrices'
import BoxPricesList from 'routes/BoxPrices/BoxPricesList'
import Loading from 'Loading'
import { shallow } from 'enzyme'
import boxPricesMock from './__mocks__/boxPrices.json'

describe('Box Prices', () => {
  let wrapper
  let dataProp = {
    loading: true,
    boxPrices: []
  }

  beforeEach(() => {
    wrapper = shallow(<BoxPrices data={dataProp} />)
  })

  describe('when loading prop is true', () => {
    test('should render a loading screen when fetching data', () => {
      expect(wrapper.find(Loading)).toHaveLength(1)
      expect(wrapper.find(BoxPricesList)).toHaveLength(0)
    })
  })

  describe('when loading prop is false', () => {
    beforeEach(() => {
      dataProp = {
        loading: false,
        boxPrices: boxPricesMock
      }
      wrapper.setProps({ data: dataProp })
    })

    test('should render a box prices list', () => {
      expect(wrapper.find(Loading)).toHaveLength(0)
      expect(wrapper.find(BoxPricesList)).toHaveLength(1)
    })
  })

  describe('when isBoxPricesPageRedesignEnabled is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isBoxPricesPageRedesignEnabled: true })
    })

    test('should render boxPriceTitle', () => {
      expect(wrapper.find('.boxPriceTitle')).toBeDefined()
    })

    test('should render Subscription component', () => {
      expect(wrapper.find('Subscription')).toBeDefined()
    })
  })

  describe('when isBoxPricesPageRedesignEnabled is false', () => {
    beforeEach(() => {
      wrapper.setProps({ isBoxPricesPageRedesignEnabled: false })
    })

    test('should render Hero component', () => {
      expect(wrapper.find('Hero')).toBeDefined()
    })

    test('should render BoxPricesContent component', () => {
      expect(wrapper.find('BoxPricesContent')).toBeDefined()
    })
  })
})
