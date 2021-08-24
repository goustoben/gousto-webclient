import React from 'react'
import { mount } from 'enzyme'
import { IngredientsList } from '../IngredientsList'

jest.mock('../Ingredient', () => ({
  Ingredient: () => <div />
}))

const INGREDIENTS = [{
  ingredientUuid: '3c07d126-f655-437c-aa1d-c38dbbae0398',
  label: '8ml soy sauce',
  srcSet: 'ingredient-soy-image-url 50w',
},
{ ingredientUuid: 'd93301c4-2563-4b9d-b829-991800ca87b4',
  label: '40g Cornish clotted cream',
  srcSet: 'ingredient-cornish-image-url 50w'
}]

describe('IngredientsList', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<IngredientsList ingredients={INGREDIENTS} />)
  })

  test('renders 2 Ingredient components', () => {
    expect(wrapper.find('Ingredient')).toHaveLength(2)
  })
})
