import React from 'react'

import { shallow } from 'enzyme'
import { Ingredients } from 'routes/Menu/Recipe/Ingredients'
import { Ingredient } from 'routes/Menu/Recipe/Ingredients/Ingredient'
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
