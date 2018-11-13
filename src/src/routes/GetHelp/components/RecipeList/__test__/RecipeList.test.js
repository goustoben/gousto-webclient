import React from 'react'
import { mount } from 'enzyme'
import { RecipeList } from 'routes/GetHelp/components/RecipeList'

describe('<RecipeList />', () => {
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

  describe('rendering', () => {
    let wrapper

    beforeAll(() => {
      wrapper = mount(
        <RecipeList
          recipes={recipes}
          selectedIngredients={new Map()}
          onChange={() => {}}
        />
      )
    })

    test('recipe list is being rendered', () => {
      expect(wrapper.find('List')).toHaveLength(1)
    })

    test('ingredients are invisible by default', () => {
      expect(wrapper.find('InputCheck')).toHaveLength(0)
    })
  })

  describe('behaviour', () => {
    let wrapper

    beforeEach(() => {
      wrapper = mount(
        <RecipeList
          recipes={recipes}
          selectedIngredients={new Map()}
          onChange={() => {}}
        />
      )
    })

    test('when clicking on a recipe item its ingredients appear/disappear', () => {
      const secondRecipe = wrapper.find('Recipe').at(1)
      secondRecipe.find('Item').simulate('click')
      let ingredients = wrapper.find('InputCheck')

      expect(ingredients).toHaveLength(2)

      secondRecipe.find('Item').simulate('click')
      ingredients = wrapper.find('InputCheck')

      expect(ingredients).toHaveLength(0)
    })
  })
})
