import React from 'react'

import { shallow } from 'enzyme'

import * as RecipeContext from '../../../context/recipeContext'
import * as BasketHook from '../../../domains/basket'
import { SoldOutOverlay } from './SoldOutOverlay'

describe('<SoldOutOverlay', () => {
  let wrapper
  beforeEach(() => jest.spyOn(RecipeContext, 'useRecipeId').mockImplementation(() => 'recipe ID'))

  describe('when a recipe has is in stock', () => {
    beforeEach(() => {
      jest.spyOn(BasketHook, 'useStock').mockImplementation(() => ({
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
      jest.spyOn(BasketHook, 'useStock').mockImplementation(() => ({
        isRecipeOutOfStock: () => true,
      }))

      wrapper = shallow(<SoldOutOverlay />)
    })

    test('the overlay with out of stock text renders', () => {
      expect(wrapper.text()).toEqual('This recipe is sold out for your delivery date')
    })
  })
})
