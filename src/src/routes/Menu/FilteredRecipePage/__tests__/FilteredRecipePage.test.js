import React from 'react'
import { shallow } from 'enzyme'

import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { FilteredRecipePage } from '../FilteredRecipePage'

global.scrollTo = jest.fn()

jest.mock('utils/DOMhelper', () => ({
  getElementHeight: () => ({
    elementHeight: '50px',
  })
}))

describe('Filtered Recipe Page', () => {
  let wrapper
  describe('Presentation', () => {
    const removeRecipeFilterMock = jest.fn()
    beforeEach(() => {
      wrapper = shallow(
        <FilteredRecipePage
          name={'Takeaway Night'}
          description={'Super yummy food'}
          borderColor={'blue'}
          browser={'desktop'}
          removeRecipeFilter={removeRecipeFilterMock}
        />
      )
    })
    test('should render filtered recipe page with title', () => {
      expect(wrapper.find('h1').text()).toBe('Takeaway Night')
    })
    test('should render filtered recipe page with description', () => {
      expect(wrapper.find('.filteredRecipePageDescription').text()).toBe('Super yummy food')
    })
    test('should render filtered recipe page with back button', () => {
      expect(wrapper.find('.backButton').length).toBe(1)
    })
    test('should render filtered recipe page with colour border', () => {
      expect(wrapper.find('.border').at(0).prop('style')).toEqual({"background": "blue", "top": {"elementHeight": "50px"}})
    })
    test('should call removeRecipeFilter when click on back button', () => {
      wrapper.find('.backButton').simulate('click')

      expect(removeRecipeFilterMock).toHaveBeenCalledTimes(1)
    })
    test('should render Recipes in the RecipGrid component', () => {
      expect(wrapper.find(RecipeGrid)).toHaveLength(1)
    })
  })
})
