import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Title from 'Recipe/Title'
import Svg from 'components/Svg'
import AddButton from 'Recipe/AddButton'
import StockBadge from 'Recipe/StockBadge'

import FineDineInRecipe from 'Recipe/FineDineInRecipe'

describe('<FineDineInRecipe />', () => {
	describe('rendering', () => {
		let recipe
		let view
		beforeEach(() => {
			recipe = Immutable.fromJS({
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
			view = 'grid'
		})

		test('should return a <div>', () => {
			const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)
			expect(wrapper.type()).toBe('div')
		})

		test('should contain one Title component', () => {
			const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

			expect(wrapper.find(Title).length).toEqual(1)
		})

		test('should contain one Svg component', () => {
			const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

			expect(wrapper.find(Svg).length).toEqual(1)
		})

		test('should contain one AddButton component', () => {
			const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

			expect(wrapper.find(AddButton).length).toEqual(1)
		})

		test('should contain one StockBadge component', () => {
			const wrapper = shallow(<FineDineInRecipe recipe={recipe} view={view} />)

			expect(wrapper.find(StockBadge).length).toEqual(1)
		})
	})
})
