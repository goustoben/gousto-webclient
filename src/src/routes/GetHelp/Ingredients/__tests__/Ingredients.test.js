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
    { id: '2', title: 'test 2', ingredients: [{ id: '2', label: 'test' }] },
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
          recipes={recipes}
          content={content}
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
      const Button1 = BottomBar.find('BottomButton').at(0)
      const Button2 = BottomBar.find('BottomButton').at(1)

      expect(Button1.text()).toContain(content.button1Copy)
      expect(Button2.text()).toContain(content.button2Copy)
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
        />
      )
      getHelpLayout = wrapper.find('GetHelpLayout')
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
