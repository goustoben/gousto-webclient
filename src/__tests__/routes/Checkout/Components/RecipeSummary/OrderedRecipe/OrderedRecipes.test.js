import React from 'react'
import { shallow } from 'enzyme'
import OrderedRecipes from 'routes/Checkout/Components/RecipeSummary/OrderedRecipe/OrderedRecipe'
import Immutable from 'immutable'

describe('OrderedRecipe', () => {
  describe('render', () => {
    test('should not render Fine Dine In span when range is not equal fine_dine_in', () => {
      const wrapper = shallow(<OrderedRecipes />)

      expect(wrapper.text()).not.toContain('Fine Dine In')
    })

    test('should render Fine Dine In span when range is equal fine_dine_in', () => {
      
      const wrapper = shallow(<OrderedRecipes range={'fine-dine-in'} />)

      expect(wrapper.text()).toContain('Fine Dine In')
    })
  })
})
