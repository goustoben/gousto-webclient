import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Image from 'Recipe/Image'
import Title from 'Recipe/Title'
import ChefQuote from 'Recipe/ChefQuote'
import EquipmentRequired from 'Recipe/EquipmentRequired'

import FeaturedRecipe from 'Recipe/FeaturedRecipe'

describe('<FeaturedRecipe />', () => {
	let wrapper
	let recipe = Immutable.fromJS({
		id: 1,
		title: 'test',
		rating: {
			count: 1,
			average: 4,
		},
		url: '',
		cookingTime: 1,
		cookingTimeFamily: 1,
		shelfLifeDays: '',
		media: {
			images: [
				{
					urls: [
						{},
						{},
						{
							src: 'test',
						},
					],
				},
			],
		},
	})

	beforeEach(() => {
		wrapper = shallow(<FeaturedRecipe recipe={recipe} />)
	})

	test('should have a 1 EquipmentRequired with view "notice"', () => {
		const component = wrapper.find(EquipmentRequired)
		expect(component.length).toBe(1)
		expect(component.prop('view')).toBe('notice')
	})

	test('should contain one ChefQuote component', () => {
		expect(wrapper.find(ChefQuote).length).toBe(1)
	})

	test('should have a featured image', () => {
		expect(wrapper.find(Image).prop('view')).toBe('featured')
	})

	test('should have a featured title', () => {
		expect(wrapper.find(Title).prop('view')).toBe('featured')
	})
})
