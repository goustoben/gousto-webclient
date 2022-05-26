import React from 'react'

import { shallow } from 'enzyme'

import numPersonsToBoxDescriptors from 'routes/BoxPrices/__tests__/__mocks__/numPersonsToBoxDescriptors.json'

import { PricePerNRecipesTable } from '../PricePerNRecipesTable'

describe('PricePerNRecipesTable', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PricePerNRecipesTable isLoadingPrices boxDescriptors={null} />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('Loader').exists()).toBe(true)
  })

  describe('when the price have loaded', () => {
    beforeEach(() => {
      wrapper.setProps({
        isLoadingPrices: false,
        boxDescriptors: numPersonsToBoxDescriptors[2],
      })
    })

    test('then it should render the prices', () => {
      const cells = wrapper.find('.cell')
      expect(cells).toHaveLength(3)

      expect(cells.at(0).find('.nRecipesLine').text()).toBe('2 recipes')
      expect(cells.at(0).find('.priceLine').text()).toBe('£12.50')
      expect(cells.at(0).find('.priceBeforeDiscountLine').text()).toBe('£24.99')

      expect(cells.at(1).find('.nRecipesLine').text()).toBe('3 recipes')
      expect(cells.at(1).find('.priceLine').text()).toBe('£15.00')
      expect(cells.at(1).find('.priceBeforeDiscountLine').text()).toBe('£29.99')

      expect(cells.at(2).find('.nRecipesLine').text()).toBe('4 recipes')
      expect(cells.at(2).find('.priceLine').text()).toBe('£17.50')
      expect(cells.at(2).find('.priceBeforeDiscountLine').text()).toBe('£34.99')
    })
  })
})
