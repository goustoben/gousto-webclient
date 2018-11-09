import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import IngredientsList from 'Recipe/Detail/IngredientsList'

describe('<IngredientsList />', () => {
  let ingredients
  let allergens
  beforeEach(() => {
    ingredients = Immutable.fromJS([
      { name: 'name1', subIngredients: 'subIngredients1', allergens: ['test'] },
      { name: 'name1', subIngredients: 'subIngredients1', allergens: ['test'] },
      { name: 'name1', subIngredients: 'subIngredients1', allergens: ['test'] },
      { name: 'name1', subIngredients: 'subIngredients1', allergens: ['test'] },
    ])
    allergens = Immutable.List(['test'])
  })

  test('should return a <div>', () => {
    const wrapper = shallow(
			<IngredientsList ingredients={ingredients} allergens={allergens} />,
    )
    expect(wrapper.type()).toEqual('div')
  })

  test('should return 4 <dl> for 4 ingredients', () => {
    const wrapper = shallow(
			<IngredientsList ingredients={ingredients} allergens={allergens} />,
    )
    expect(wrapper.find('dl').length).toEqual(ingredients.size)
  })

  test('should return 0 <dl> for 0 ingredients', () => {
    const wrapper = shallow(
			<IngredientsList
			  ingredients={Immutable.List([])}
			  allergens={allergens}
			/>,
    )
    expect(wrapper.find('dl').length).toEqual(0)
  })
})
