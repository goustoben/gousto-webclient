import { shallow } from 'enzyme'
import React from 'react'

import Immutable from 'immutable' // eslint-disable-line no-caps

import RecipeList from 'BoxSummary/RecipeList/RecipeList'
import RecipeHolder from 'BoxSummary/RecipeHolder'

describe('RecipeList', () => {
	let menuRecipesStore
	let recipes

	beforeEach(() => {
		menuRecipesStore = Immutable.fromJS({
			1: { id: 'store1' },
			2: { id: 'store2' },
			3: { id: 'store3' },
			4: { id: 'store4' },
		})
		recipes = Immutable.fromJS({ 1: 1, 2: 1, 3: 1, 4: 1 })
	})

	test('should return a div', () => {
		const wrapper = shallow(<RecipeList />)
		expect(wrapper.type()).toEqual('div')
	})

	test('should return 1 span when view is desktop', () => {
		const wrapper = shallow(<RecipeList />)
		expect(wrapper.find('span').length).toEqual(1)
	})

	test('should return 4 RecipeHolder', () => {
		const wrapper = shallow(
			<RecipeList recipes={recipes} menuRecipesStore={menuRecipesStore} />,
		)

		expect(wrapper.find(RecipeHolder).length).toEqual(4)
		wrapper.find(RecipeHolder).forEach((node, index) => {
			expect(node.prop('recipe')).toEqual(Immutable.Map({ id: `store${index + 1}` }))
		})
	})

	test('should return X RecipeHolder when max recipes specified', () => {
		const wrapper = shallow(
			<RecipeList
				maxRecipesNum={3}
				recipes={recipes}
				menuRecipesStore={menuRecipesStore}
			/>,
		)
		expect(wrapper.find(RecipeHolder).length).toEqual(3)
		expect(
			wrapper
				.find(RecipeHolder)
				.last()
				.prop('recipe'),
		).toBeInstanceOf(Immutable.Map)
	})

	test('should call detailsVisibilityChange once clicked', () => {
		const detailsVisibilityChangeSpy = jest.fn()
		const wrapper = shallow(
			<RecipeList
				recipes={Immutable.Map({ 101: {} })}
				detailVisibilityChange={detailsVisibilityChangeSpy}
			/>,
		)
		wrapper.find(RecipeHolder).first().simulate('click')
		expect(detailsVisibilityChangeSpy).toHaveBeenCalled()
	})
})
