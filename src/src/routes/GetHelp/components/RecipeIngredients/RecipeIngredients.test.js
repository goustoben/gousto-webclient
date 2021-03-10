import React from 'react'
import { shallow } from 'enzyme'
import { RecipeIngredients } from '.'

describe('the RecipeIngredients component', () => {
  let wrapper

  const TEST_INGREDIENTS = [
    { uuid: '1', label: 'First ingredient' },
    { uuid: '2', label: 'Second ingredient' },
    { uuid: '3', label: 'Third ingredient' },
  ]

  const TEST_RECIPE = {
    id: '1',
    title: 'First test recipe',
    ingredients: TEST_INGREDIENTS,
  }

  const NO_INELIGIBLE_INGREDIENTS = []
  const INELIGIBLE_INGREDIENT_UUIDS = ['2', '3']

  const testProps = {
    ineligibleIngredientUuids: NO_INELIGIBLE_INGREDIENTS,
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

  describe('when ineligible ingredients uuids are not passed', () => {
    test('an Alert is not rendered', () => {
      expect(wrapper.find('Alert').exists()).toBe(false)
    })

    test('all of the ingredients have disabled prop set to false', () => {
      const enabledFields = wrapper.find('InputCheck').findWhere(el => el.prop('disabled') === false)
      expect(enabledFields.length).toBe(TEST_INGREDIENTS.length)
    })
  })

  describe('when ineligible ingredients uuids are passed', () => {
    beforeEach(() => {
      wrapper.setProps({ ineligibleIngredientUuids: INELIGIBLE_INGREDIENT_UUIDS })
    })

    test('an Alert is rendered', () => {
      expect(wrapper.find('Alert').exists()).toBe(true)
    })

    test('ineligible ingredients have disabled prop set to true', () => {
      const disabledFields = wrapper.find('InputCheck').findWhere(el => el.prop('disabled') === true)
      disabledFields.forEach((disabledField, index) => {
        const [, ingredientUuid] = disabledField.prop('id').split('&')
        expect(ingredientUuid).toBe(INELIGIBLE_INGREDIENT_UUIDS[index])
      })
    })

    test('correct number of eligible ingredients have disabled prop set to false', () => {
      const enabledFields = wrapper.find('InputCheck').findWhere(el => el.prop('disabled') === false)
      const [, ingredientUuid] = enabledFields.prop('id').split('&')
      expect(ingredientUuid).toBe('1')
    })
  })

  describe('when ingredients have been selected', () => {
    beforeEach(() => {
      const TEST_SELECTED_INGREDIENTS = new Map([ ['1&1', true] ])
      wrapper.setProps({ selectedIngredients: TEST_SELECTED_INGREDIENTS })
    })

    test('only selected ingredients are showed as checked', () => {
      const ingredient = wrapper.find('InputCheck')
      expect(ingredient.at(0).prop('defaultValue')).toBe(true)
      expect(ingredient.at(1).prop('defaultValue')).toBe(false)
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
