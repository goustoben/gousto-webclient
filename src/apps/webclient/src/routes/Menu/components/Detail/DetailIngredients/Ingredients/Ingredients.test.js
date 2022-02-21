import React from 'react'

import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { Ingredients } from './Ingredients'
import { Ingredient } from './Ingredient'

describe('<Ingredients />', () => {
  const ingredients = Immutable.fromJS([
    {
      id: '645a774c-589a-4172-9f0b-dd51a3c7e739',
      label: '1 leek',
      name: '1 leek',
    },
    {
      id: '0cdeefe0-26b8-42f2-bced-9e677f809a26',
      label: '2 garlic cloves',
      name: '1 garlic clove',
    },
    {},
  ])
  test('should return a <div>', () => {
    const wrapper = shallow(<Ingredients ingredients={ingredients} />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should return a as many <Ingredient /> children as there are items in the ingredients prop', () => {
    const wrapper = shallow(<Ingredients ingredients={ingredients} />)
    expect(wrapper.find(Ingredient).length).toEqual(ingredients.size)
  })
})
