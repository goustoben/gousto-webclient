import React from 'react'
import { shallow } from 'enzyme'
import { SimplifiedMenuRecipesPage } from './SimplifiedMenuRecipesPage'
import Loading from '../../Loading'
import { SimplifiedRecipeListContainer } from '../SimplifiedRecipeList'

jest.mock('../../Loading')

jest.mock('../SimplifiedRecipeList')

describe('Given SimplifiedMenuRecipesPage', () => {
  describe('When the page is loading', () => {
    test('then the recipe list should appear faded', () => {
      const showLoading = true
      const stateRecipeCount = 4
      const wrapper = shallow(
        <SimplifiedMenuRecipesPage
          showLoading={showLoading}
          stateRecipeCount={stateRecipeCount}
        />,
      )
      expect(wrapper.find(Loading).exists()).toBeTruthy()
      expect(wrapper.find(Loading).prop('loading')).toBe(true)
      expect(wrapper.find('[data-testing="menuRecipes"]').length).toBe(1)
      expect(wrapper.find('[data-testing="menuRecipes"]').hasClass('fadeOut')).toEqual(true)
    })
  })

  describe('When the page has loaded', () => {
    test('then the recipe list should not be faded', () => {
      const showLoading = false
      const stateRecipeCount = 4
      const wrapper = shallow(
        <SimplifiedMenuRecipesPage
          showLoading={showLoading}
          stateRecipeCount={stateRecipeCount}
        />,
      )
      expect(wrapper.find(Loading).exists()).toBeTruthy()
      expect(wrapper.find(Loading).prop('loading')).toBe(false)
      expect(wrapper.find('[data-testing="menuRecipes"]').hasClass('willFade')).toEqual(true)
    })
  })

  describe('When the menu recipe count is more than 0', () => {
    test('then the recipe list will be rendered', () => {
      const showLoading = true
      const stateRecipeCount = 20
      const wrapper = shallow(
        <SimplifiedMenuRecipesPage
          showLoading={showLoading}
          stateRecipeCount={stateRecipeCount}
        />,
      )
      expect(wrapper.find(SimplifiedRecipeListContainer).exists()).toBeTruthy()
    })
  })

  describe('When the menu recipe count is 0', () => {
    test('then the recipe list will not be rendered', () => {
      const showLoading = true
      const stateRecipeCount = 0
      const wrapper = shallow(
        <SimplifiedMenuRecipesPage
          showLoading={showLoading}
          stateRecipeCount={stateRecipeCount}
        />,
      )
      expect(wrapper.find(SimplifiedRecipeListContainer).exists()).toBeFalsy()
    })
  })
})
