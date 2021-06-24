import React from 'react'
import { BoxPrices } from 'routes/BoxPrices/BoxPrices'
import { BoxPricesList } from 'routes/BoxPrices/BoxPricesList'
import Loading from 'Loading'
import { shallow } from 'enzyme'
import numPersonsToBoxDescriptors from './__mocks__/numPersonsToBoxDescriptors.json'

describe('Box Prices', () => {
  let wrapper

  const store = {
    dispatch: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<BoxPrices loading />, {
      context: {
        store,
      },
    })
  })

  describe('when loading is true', () => {
    test('should render a loading screen when fetching data', () => {
      expect(wrapper.find(Loading)).toHaveLength(1)
      expect(wrapper.find(BoxPricesList)).toHaveLength(0)
    })
  })

  describe('when loading is false', () => {
    beforeEach(() => {
      wrapper.setProps({
        loading: false,
        numPersonsToBoxDescriptors,
      })
    })

    test('should render a box prices list', () => {
      expect(wrapper.find(Loading)).toHaveLength(0)
      expect(wrapper.find(BoxPricesList)).toHaveLength(1)
    })
  })
})
