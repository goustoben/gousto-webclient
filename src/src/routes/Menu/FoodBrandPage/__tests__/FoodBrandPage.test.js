import React from 'react'
import { shallow } from 'enzyme'

import { RecipeGrid } from 'routes/Menu/RecipeGrid'
import { FoodBrandPage } from '../FoodBrandPage'

global.scrollTo = jest.fn()

jest.mock('utils/DOMhelper', () => ({
  getElementHeight: () => ({
    elementHeight: '50px',
  })
}))

describe('Food Brand Page', () => {
  let wrapper
  describe('Presentation', () => {
    const removeFoodBrandMock = jest.fn()
    beforeEach(() => {
      wrapper = shallow(
        <FoodBrandPage
          name={'Takeaway Night'}
          description={'Super yummy food'}
          borderColor={'blue'}
          browser={'desktop'}
          removeFoodBrand={removeFoodBrandMock}
        />
      )
    })
    test('should render food brand page with title', () => {
      expect(wrapper.find('h1').text()).toBe('Takeaway Night')
    })
    test('should render food brand page with description', () => {
      expect(wrapper.find('.foodBrandDescription').text()).toBe('Super yummy food')
    })
    test('should render food brand page with back button', () => {
      expect(wrapper.find('.backButton').length).toBe(1)
    })
    test('should render food brand page with colour border', () => {
      expect(wrapper.find('.border').at(0).prop('style')).toEqual({"background": "blue", "top": {"elementHeight": "50px"}})
    })
    test('should call removeFoodBrand when click on back button', () => {
      wrapper.find('.backButton').simulate('click')

      expect(removeFoodBrandMock).toHaveBeenCalledTimes(1)
    })
    test('should render Recipes in the RecipGrid component', () => {
      expect(wrapper.find(RecipeGrid)).toHaveLength(1)
    })
  })
})
