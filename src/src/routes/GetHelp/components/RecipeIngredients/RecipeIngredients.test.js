import React from 'react'
import { shallow } from 'enzyme'
import { RecipeIngredients } from '.'

describe('the RecipeWithIngredients componennt', () => {
  let wrapper

  const TEST_INGREDIENTS = [
    { id: '1', label: 'First ingredient' },
    { id: '2', label: 'Second ingredient' },
    { id: '3', label: 'Third ingredient' },
  ]

  const TEST_RECIPE = {
    id: '1',
    title: 'First test recipe',
    ingredients: TEST_INGREDIENTS,
  }

  const testProps = {
    recipe: TEST_RECIPE,
    selectedIngredients: new Map(),
    onChange: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(
      <RecipeIngredients {...testProps} />
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('renders a list of ingredients for the given recipe',() => {
    expect(wrapper.find('InputCheck').length).toBe(TEST_INGREDIENTS.length)
  })

  describe('when ingredients have been selected', () => {
    beforeEach(() => {
      const TEST_SELECTED_INGREDIENTS = new Map([ ['1-1', true] ])
      wrapper.setProps({ selectedIngredients: TEST_SELECTED_INGREDIENTS })
    })

    test('only selected ingredients are showed as checked', () => {
      const ingredient = wrapper.find('InputCheck')
      expect(ingredient.at(0).prop('isChecked')).toBe(true)
      expect(ingredient.at(1).prop('isChecked')).toBe(false)
    })
  })

  describe('selecting ingredients', () => {
    beforeEach(() => {
      wrapper.find('InputCheck').first().prop('onChange')()
    })

    test('onChange handler is called', () => {
      expect(testProps.onChange).toHaveBeenCalledTimes(1)
    })
  })
})
