import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ItemExpandable } from 'goustouicomponents'
import { List } from '../../components/List'
import { InputCheck } from './InputCheck'

const propTypes = {
	recipes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			title: PropTypes.string,
			ingredients: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.string,
					label: PropTypes.string,
				})
			)
		})
	).isRequired
}

const Recipe = ({ recipe, selectedIngredients, onChange }) => {
	const ingredientList = recipe.ingredients.map((ingredient) => {
		const isChecked = selectedIngredients.get(ingredient.id) || false

		return (
			<InputCheck
				key={ingredient.id}
				id={`${recipe.id}-${ingredient.id}`}
				label={ingredient.label}
				isChecked={isChecked}
				onChange={onChange}
			/>
		)
	})

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
		selectedIngredients: new Map()
	}

	onChangeHandler = ({ id, isChecked }) => {
		const newSelectedIngredients = new Map(this.state.selectedIngredients)

		if (isChecked) {
			newSelectedIngredients.set(id, isChecked)
		} else {
			newSelectedIngredients.delete(id)
		}

		this.setState({
			...this.state,
			selectedIngredients: newSelectedIngredients
		})
	}

	render() {
		const { recipes } = this.props
		const { selectedIngredients } = this.state

		const recipeList = recipes.map((recipe) => (
			<Recipe
				key={recipe.id}
				recipe={recipe}
				selectedIngredients={selectedIngredients}
				onChange={this.onChangeHandler}
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
