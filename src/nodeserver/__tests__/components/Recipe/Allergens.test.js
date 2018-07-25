import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import Allergens from 'Recipe/Detail/Allergens'

describe('<IngredientsList />', () => {
	let allergens
	beforeEach(() => {
		allergens = Immutable.List(['test'])
	})

	test('should return a <div>', () => {
		const wrapper = shallow(<Allergens allergens={allergens} />)
		expect(wrapper.type()).toEqual('div')
	})

	test('should return 1 <dl> for at least 1 allergen', () => {
		const wrapper = shallow(<Allergens allergens={allergens} />)
		expect(wrapper.find('dl').length).toEqual(1)
	})

	test('should return 0 <dl> for no allegen', () => {
		const wrapper = shallow(<Allergens allergens={Immutable.List([])} />)
		expect(wrapper.find('dl').length).toEqual(0)
	})
})
