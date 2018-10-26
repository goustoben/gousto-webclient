import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Image from 'Recipe/Image'
import Title from 'Recipe/Title'
import ChefQuote from 'Recipe/ChefQuote'
import TasteScore from 'Recipe/TasteScore'
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

	test('should contain one TasteScore component', () => {
		wrapper = shallow(<FeaturedRecipe tasteScore={99} />)

		expect(wrapper.find(TasteScore)).toHaveLength(1)
		expect(wrapper.find(TasteScore).prop('score')).toEqual(99)
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
