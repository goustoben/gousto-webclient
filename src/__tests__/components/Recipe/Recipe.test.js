import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import GridRecipe from 'Recipe/GridRecipe'
import SmallRecipe from 'Recipe/SmallRecipe'
import SimpleRecipe from 'Recipe/SimpleRecipe'
import FeaturedRecipe from 'Recipe/FeaturedRecipe'
import FineDineInRecipe from 'Recipe/FineDineInRecipe'

import Recipe from 'Recipe'
import css from 'Recipe/Recipe.css'

describe('Recipe', () => {
	describe('rendering', () => {
		let wrapper
		let recipe
		beforeEach(() => {
			recipe = {
				id: '1',
				title: 'test',
				useWithin: '',
				url: '',
				cookingTime: 1,
				features: Immutable.Map(),
				equipment: Immutable.List(),
				media: Immutable.fromJS(
					[
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
		})

		test('should render a GridRecipe by default', () => {
			wrapper = shallow(<Recipe {...recipe} />)
			expect(wrapper.find(GridRecipe).length).toBe(1)
		})

		describe('views', () => {
			const views = new Map(
				Object.entries({
					grid: GridRecipe,
					featured: FeaturedRecipe,
					gridSmall: SmallRecipe,
					simple: SimpleRecipe,
					fineDineIn: FineDineInRecipe,
				}),
			)

			test('should render a different component based on view', () => {
				for (const [view, component] of views.entries()) {
					wrapper = shallow(<Recipe {...recipe} view={view} />)
					expect(wrapper.find(component).length).toBe(1)
				}
			})

			test('should add a class based on the view type', () => {
				for (const view of views.keys()) {
					wrapper = shallow(<Recipe {...recipe} view={view} />)
					expect(wrapper.hasClass('grid')).toEqual(true)
					expect(wrapper.hasClass(css[view])).toEqual(true)
				}
			})
		})
	})
})
