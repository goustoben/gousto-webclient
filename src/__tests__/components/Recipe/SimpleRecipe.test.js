import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Title from 'Recipe/Title'
import Image from 'Recipe/Image'
import Rating from 'Recipe/Rating'
import AddButton from 'Recipe/AddButton'

import SimpleRecipe from 'Recipe/SimpleRecipe'

describe('<SimpleRecipe />', () => {
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
		wrapper = shallow(<SimpleRecipe recipe={recipe} />)
	})

	test('should contain one Image component', () => {
		expect(wrapper.find(Image).length).toEqual(1)
	})

	test('should contain one simple Title component', () => {
		expect(wrapper.find(Title).length).toEqual(1)
		expect(wrapper.find(Title).prop('view')).toBe('simple')
	})

	test('should contain one simple Rating component', () => {
		expect(wrapper.find(Rating).length).toEqual(1)
		expect(wrapper.find(Rating).prop('view')).toBe('simple')
	})

	test('should not contain any AddButton components', () => {
		expect(wrapper.find(AddButton).length).toEqual(0)
	})
})
