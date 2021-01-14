import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import { IngredientsList } from 'routes/Menu/Recipe/Detail/IngredientsList'
import { splitSentences } from 'routes/Menu/Recipe/Detail/IngredientsList/IngredientsList'

describe('splitSentences', () => {
  test('should return an array of words and character', () => {
    const array = splitSentences('May contain peanut, (nuts) and sesame. Also may contain tasty-ness!')

    expect(array).toEqual( [
      'May',
      ' ',
      'contain',
      ' ',
      'peanut',
      ',',
      ' ',
      '(',
      'nuts',
      ')',
      ' ',
      'and',
      ' ',
      'sesame',
      '.',
      ' ',
      'Also',
      ' ',
      'may',
      ' ',
      'contain',
      ' ',
      'tasty',
      '-',
      'ness',
      '!'
    ])
  })
})

describe('<IngredientsList />', () => {
  let ingredients
  let allergens
  beforeEach(() => {
    ingredients = Immutable.fromJS([
      { name: 'name1', subIngredients: 'subIngredients1', allergens: ['test'] },
      { name: 'name2', subIngredients: 'subIngredients1', allergens: ['test'] },
      { name: 'name3', subIngredients: 'subIngredients1', allergens: ['test'] },
      { name: 'name4', subIngredients: 'subIngredients1', allergens: ['test'] },
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
