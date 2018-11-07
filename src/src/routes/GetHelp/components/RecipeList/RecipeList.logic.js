import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ItemExpandable } from 'goustouicomponents'
import { List } from '../../components/List'

import css from './InputCheck'

const propTypes = {
	recipes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			ingredients: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					title: PropTypes.string,
				})
			)
		})
	).isRequired
}

const InputCheck = ({ id, label, isChecked, onClick }) => {
	console.log('InputCheck', isChecked)

	return (
		<div className={css.inputCheckContainer} onClick={() => onClick(id)}>
			<input
				id="inputCheck"
				type="checkbox"
			/>
			<div className={css.inputCheckMask}></div>
			<label className={css.inputCheckLabel} htmlFor="inputCheck">
				{label}
			</label>
		</div>
	)
}

const Recipe = ({ recipe, onClick }) => {
	const ingredientList = recipe.ingredients.map((ingredient) => (
			<InputCheck
				key={ingredient.id}
				id={ingredient.id}
				label={ingredient.label}
				isChecked={false}
				onClick={onClick}
			/>
		))

	return (
		<ItemExpandable
			key={recipe.id}
			label={recipe.title}
		>
			{ingredientList}
		</ItemExpandable>
	)
}

class RecipeList extends PureComponent {
	state = {
		selectedIngredients: []
	}

	onClickHandler = (id) => {
		console.log(id)
	}

	render() {
		const { recipes } = this.props

		const recipeList = recipes.map((recipe) => (
			<Recipe
				key={recipe.id}
				recipe={recipe}
				onClick={this.onClickHandler}
			/>
		))

		return (
			<List>
				{recipeList}
			</List>
		)
	}
}

RecipeList.propTypes = propTypes

export {
	RecipeList
}
