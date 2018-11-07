import { connect } from 'react-redux'

import { Ingredients } from './Ingredients.logic'

const reduceRecipes = (recipes) => (
	Object.keys(recipes).map((recipeId) => {
		const recipe = recipes[recipeId]
		const { id, title } = recipe
		const ingredients = recipe.ingredients.map(
			({ id: ingredientId, label: ingredientLabel }) => (
				{ id: ingredientId, label: ingredientLabel }
			)
		)

		return { id, title, ingredients }
	})
)


const mapStateToProps = (state) => ({
	recipes: reduceRecipes(state.recipes.toJS()),
	content: {
		title: state.content.get('get-help_contact_pageheader_header')
		|| 'Get help with your box',
		body: state.content.get('get-help_contact_pagecontent_copy')
		|| 'Which ingredient(s) had an issue? Select meal to see ingredients.',
		button1Copy: state.content.get('get-help_orderissues_pagecontent_button1copy')
		|| 'back',
		button2Copy: state.content.get('get-help_orderissues_pagecontent_button2copy')
		|| 'done',
	}
})

const IngredientsContainer = connect(mapStateToProps)(Ingredients)

export {
	IngredientsContainer
}
