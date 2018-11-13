import React from 'react'
import { mount } from 'enzyme'

import { Ingredients } from 'routes/GetHelp/Ingredients/Ingredients.logic'

describe('<Ingredients />', () => {
  const content = {
    title: 'test title',
    body: 'text...',
    button1Copy: 'Back',
    button2Copy: 'Done',
  }
  const recipes = [
    { id: '1', title: 'test 1', ingredients: [{ id: '1', label: 'test' }] },
    {
      id: '2',
      title: 'test 2',
      ingredients: [{ id: '2', label: 'test' }, { id: '2222', label: 'test2' }]
    },
    { id: '3', title: 'test 3', ingredients: [{ id: '3', label: 'test' }] },
    { id: '4', title: 'test 4', ingredients: [{ id: '4', label: 'test' }] },
  ]
  const user = {
    id: 'user-id',
    accessToken: 'user-access-token',
  }
  const order = {
    id: 'order-id',
  }
  let wrapper
  let getHelpLayout

  describe('rendering', () => {
    beforeAll(() => {
      wrapper = mount(
        <Ingredients
          order={order}
          user={user}
          recipes={recipes}
          content={content}
          validateSelectedIngredients={() => {}}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('layout is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')

      expect(getHelpLayout).toHaveLength(1)
      expect(BottomBar).toHaveLength(1)
      expect(BottomBar.find('Button')).toHaveLength(2)
    })

    test('header is rendering correctly', () => {
      expect(getHelpLayout.prop('title')).toBe(content.title)
    })

    test('body description is redering correctly', () => {
      expect(getHelpLayout.prop('body')).toBe(content.body)
    })

    test('bottom bar buttons is rendering correctly', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const buttons = BottomBar.find('Button')

      expect(buttons.at(0).text()).toContain(content.button1Copy)
      expect(buttons.at(1).text()).toContain(content.button2Copy)
    })

    test('the Back button links to the correct url', () => {
      const Button1 = getHelpLayout.find('BottomBar').find('BottomButton')

      expect(Button1.prop('url')).toBe('/get-help')
    })

    test('the Continue button is disable by default', () => {
      const BottomBar = getHelpLayout.find('BottomBar')
      const ContinueButton = BottomBar.find('Button').at(1)

      expect(ContinueButton.prop('disabled')).toBe(true)
    })

    test('recipes are being displayed', () => {
      const items = getHelpLayout.find('Item')

      expect(items).toHaveLength(4)

      expect(items.at(0).text()).toBe('test 1')
      expect(items.at(1).text()).toBe('test 2')
      expect(items.at(2).text()).toBe('test 3')
      expect(items.at(3).text()).toBe('test 4')
    })

    test('recipe list is being rendered', () => {
      expect(getHelpLayout.find('RecipeList')).toHaveLength(1)
      expect(getHelpLayout.find('RecipeList').prop('recipes')).toBe(recipes)
    })
  })

  describe('behaviour', () => {
    beforeEach(() => {
      wrapper = mount(
        <Ingredients
          order={order}
          user={user}
          recipes={recipes}
          content={content}
          validateSelectedIngredients={() => {}}
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
    })

    test('ingredients are unselected by default', () => {
      const secondRecipe = getHelpLayout.find('Recipe').at(1)
      secondRecipe.find('Item').simulate('click')
      const ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')

      expect(ingredientsCheckboxes).toHaveLength(2)
      expect(ingredientsCheckboxes.at(0).prop('checked')).toBeFalsy()
      expect(ingredientsCheckboxes.at(1).prop('checked')).toBeFalsy()
    })

    test('ingredients retain the selection state when thy are collapsed and then expanded', () => {
      const secondRecipe = wrapper.find('Recipe').at(1)
      secondRecipe.find('Item').simulate('click')
      let ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')
      ingredientsCheckboxes.at(1).simulate('change')

      expect(ingredientsCheckboxes.at(1).prop('checked')).toBeTruthy()

      secondRecipe.find('Item').simulate('click')
      secondRecipe.find('Item').simulate('click')
      ingredientsCheckboxes = wrapper.find('input[type="checkbox"]')

      expect(ingredientsCheckboxes.at(1).prop('checked')).toBeTruthy()
    })

    test('the Continue button is enabled only when one or more ingredients are selected', () => {
      const recipe = getHelpLayout.find('ItemExpandable').at(0)
      recipe.find('Item').simulate('click')
      const ingredientCheckbox = recipe.find('input[type="checkbox"]')
      ingredientCheckbox.simulate('change')
      const BottomBar = getHelpLayout.find('BottomBar')
      const ContinueButton = BottomBar.find('Button').at(1)

      expect(ContinueButton.prop('disabled')).toBe(false)

      ingredientCheckbox.simulate('change')

      expect(ContinueButton.prop('disabled')).toBe(true)
    })
  })
})
