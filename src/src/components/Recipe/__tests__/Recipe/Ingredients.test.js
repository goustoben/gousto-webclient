import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'
import Ingredients from 'Recipe/Ingredients'
import Ingredient from 'Recipe/Ingredients/Ingredient.js'
import Immutable from 'immutable'

describe('<Ingredients />', () => {
  test('should return a <div>', () => {
    const wrapper = shallow(<Ingredients />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should return a as many <Ingredient /> children as there are items in the ingredients prop', () => {
    const ingredients = Immutable.fromJS([{}, {}, {}])
    const wrapper = shallow(<Ingredients ingredients={ingredients} />)
    expect(wrapper.find(Ingredient).length).toEqual(ingredients.size)
  })
})
