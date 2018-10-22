import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'

import Title from 'Recipe/Title'
import Svg from 'components/Svg'
import AddButton from 'Recipe/AddButton'
import StockBadge from 'Recipe/StockBadge'
import TasteScore from 'Recipe/TasteScore'

import FineDineInRecipe from 'Recipe/FineDineInRecipe'

describe('<FineDineInRecipe />', () => {
	describe('rendering', () => {
		let recipe
		let view
		beforeEach(() => {
			recipe = {
				id: '1',
				title: 'test',
				useWithin: '',
				url: '',
				cookingTime: 1,
				features: Immutable.Map(),
				media: Immutable.fromJS([
						{
							urls: [
								{},
								{},
								{
									src: 'test',
								},
							],
						},
					]
				),
			}
			view = 'grid'
		})

		test('should return a <div>', () => {
			const wrapper = shallow(<FineDineInRecipe {...recipe} view={view} />)
			expect(wrapper.type()).toBe('div')
		})

		test('should contain one Title component', () => {
			const wrapper = shallow(<FineDineInRecipe {...recipe} view={view} />)

			expect(wrapper.find(Title).length).toEqual(1)
		})

		test('should contain one Svg component', () => {
			const wrapper = shallow(<FineDineInRecipe {...recipe} view={view} />)

			expect(wrapper.find(Svg).length).toEqual(1)
		})

		test('should contain one AddButton component', () => {
			const wrapper = shallow(<FineDineInRecipe {...recipe} view={view} />)

			expect(wrapper.find(AddButton).length).toEqual(1)
		})

		test('should contain one StockBadge component', () => {
			const wrapper = shallow(<FineDineInRecipe {...recipe} view={view} />)

			expect(wrapper.find(StockBadge).length).toEqual(1)
		})

		test('should contain a TasteScore component', () => {
			const wrapper = shallow(<FineDineInRecipe {...recipe} tasteScore={95} view={view} />)

			expect(wrapper.find(TasteScore)).toHaveLength(1)
			expect(wrapper.find(TasteScore).prop('score')).toEqual(95)
		})
	})
})
