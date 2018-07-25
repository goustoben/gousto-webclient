import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import { trackRecipeOrderDisplayed } from 'actions/tracking'

import Recipe from 'containers/menu/Recipe'

jest.mock(
	'containers/menu/Recipe',
	() => jest.fn()
		.mockReturnValue(<div className="recipe">Recipe</div>)
)

jest.mock('config', () => ({
	basket: {
		maxRecipesNum: 4,
		minRecipesNum: 2,

		portions: {
			default: 2,
			allowed: [2, 4],
		},

		minRecipes: 2,

		offsetDays: 3,
	},
	menu: {
		stockThreshold: 0,
	},
}))

jest.mock('actions/tracking', () => ({
	trackRecipeOrderDisplayed: jest.fn()
		.mockReturnValue('trackRecipeOrderDisplayed return value'),
}))

import RecipeList from 'routes/Menu/RecipeList/RecipeList'

describe('RecipeList', () => {
	const context = {
		store: {
			dispatch: jest.fn(),
		},
	}

	let wrapper

	beforeEach(() => {
		context.store.dispatch.mockClear()
		trackRecipeOrderDisplayed.mockClear()
	})

	test('should display a list of recipes', () => {
		const remainingRecipes = Immutable.fromJS([
			{ id: '1', availability: [], title: 'recipe1', isRecommended: false },
			{ id: '2', availability: [], title: 'recipe2', isRecommended: false },
			{
				id: '3',
				availability: [],
				title: 'recipe3',
				boxType: 'vegetarian',
				dietType: 'Vegetarian',
				isRecommended: false,
			},
		])

		const menuCurrentCollectionId = '10'

		wrapper = shallow(
			<RecipeList
				cutoffDate="2016-06-26"
				numPortions={2}
				menuCurrentCollectionId={menuCurrentCollectionId}
				features={Immutable.Map({})}
				filteredRecipeIds={Immutable.List(['1', '2', '3'])}
				remainingRecipes={remainingRecipes}
			/>,
			{ context },
		)

		expect(wrapper.find(Recipe).length).toEqual(3)
	})

	test('should display a list of recipes in the order: featuredRecipes, remainingRecipes, outOfStockRecipes', () => {
		const featuredRecipes = Immutable.fromJS([{ id: 3 }])
		const remainingRecipes = Immutable.fromJS([{ id: 1 }, { id: 5 }])
		const outOfStockRecipes = Immutable.fromJS([{ id: 2 }, { id: 4 }])

		const correctOrder = [3, 1, 5, 2, 4]

		Recipe.mockReturnValue((props) => <div {...props} />)

		wrapper = shallow(
			<RecipeList
				featuredRecipes={featuredRecipes}
				remainingRecipes={remainingRecipes}
				outOfStockRecipes={outOfStockRecipes}
			/>,
			{ context },
		)

		expect(wrapper.find(Recipe)).toHaveLength(5)
		wrapper.find(Recipe).forEach((recipe, index) => {
			expect(recipe.prop('id')).toEqual(correctOrder[index])
		})
	})

	test('should dispatch trackRecipeOrderDisplayed with original and final sorting order', () => {
		const recipesStore = Immutable.fromJS({
			1: { id: '1', availability: [], title: 'recipe1' },
			2: { id: '2', availability: [], title: 'recipe2' },
			3: {
				id: '3',
				availability: [
					{ featured: true, from: '2016-06-25', until: '2016-06-27' },
				],
				title: 'recipe3',
			},
		})
		const featuredRecipes = Immutable.fromJS([
			{
				id: '3',
				availability: [
					{ featured: true, from: '2016-06-25', until: '2016-06-27' },
				],
				title: 'recipe3',
			},
		])
		const remainingRecipes = Immutable.fromJS([
			{ id: '1', availability: [], title: 'recipe1' },
		])
		const recipes = Immutable.List(['1', '2', '3'])
		const currentCollectionId = '77'


		wrapper = shallow(
			<RecipeList
				cutoffDate="2016-06-26"
				numPortions={2}
				basketRecipes={Immutable.Map({})}
				recipesStore={recipesStore}
				features={Immutable.Map({})}
				currentCollectionId={currentCollectionId}
				filteredRecipeIds={recipes}
				remainingRecipes={remainingRecipes}
				featuredRecipes={featuredRecipes}
			/>,
			{ context },
		)

		expect(context.store.dispatch).toHaveBeenCalledTimes(1)
		expect(context.store.dispatch).toHaveBeenCalledWith(
			'trackRecipeOrderDisplayed return value',
		)
		expect(trackRecipeOrderDisplayed).toHaveBeenCalledTimes(1)
		expect(trackRecipeOrderDisplayed).toHaveBeenCalledWith(
			['1', '2', '3'],
			['3', '1'],
			'77',
		)
	})
})
