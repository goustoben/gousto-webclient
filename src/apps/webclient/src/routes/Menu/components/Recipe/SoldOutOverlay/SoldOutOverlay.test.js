import React from 'react'

import { shallow } from 'enzyme'

import { useBasket } from 'routes/Menu/domains/basket'
import { useStock } from 'routes/Menu/domains/stock'

import * as RecipeContext from '../../../context/recipeContext'
import { SoldOutOverlay } from './SoldOutOverlay'

jest.mock('routes/Menu/domains/stock')
const useStockMock = useStock

jest.mock('routes/Menu/domains/basket')
const useBasketMock = useBasket

describe('<SoldOutOverlay', () => {
  let wrapper
  beforeEach(() => {
    jest.spyOn(RecipeContext, 'useRecipeId').mockImplementation(() => 'recipe ID')

    useBasketMock.mockReturnValue({ numPortions: 2 })
  })

  describe('when a recipe is in stock', () => {
    beforeEach(() => {
      useStockMock.mockImplementation(() => ({
        isRecipeOutOfStock: () => false,
      }))

      wrapper = shallow(<SoldOutOverlay />)
    })

    test('the out of stock text does not render', () => {
      expect(wrapper.isEmptyRender()).toEqual(true)
    })
  })

  describe('when recipe is not in stock', () => {
    beforeEach(() => {
      useStockMock.mockImplementation(() => ({
        isRecipeOutOfStock: () => true,
      }))

      wrapper = shallow(<SoldOutOverlay />)
    })

    test('the overlay with out of stock text renders', () => {
      expect(wrapper.text()).toEqual('This recipe is sold out for your delivery date')
    })
  })
})
