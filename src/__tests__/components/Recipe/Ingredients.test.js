import React from 'react'

import { shallow } from 'enzyme'
import Ingredients from 'Recipe/Ingredients'
import Ingredient from 'Recipe/Ingredients/Ingredient.js'
import Immutable from 'immutable'

describe('<Ingredients />', () => {
	test('should return a <div>', () => {
		const wrapper = shallow(<Ingredients ingredients={Immutable.List()} />)
		expect(wrapper.type()).toEqual('div')
	})

	test('should return a as many <Ingredient /> children as there are items in the ingredients prop', () => {
		const ingredients = Immutable.fromJS([{ id: '1' }, { id: '2' }, { id: '3' }])
		const wrapper = shallow(<Ingredients ingredients={ingredients} />)
		expect(wrapper.find(Ingredient).length).toEqual(ingredients.size)
	})
})
