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
					title: PropTypes.string,
				})
			)
		})
	).isRequired
}

const Recipe = ({ recipe, onChange }) => {
	const ingredientList = recipe.ingredients.map((ingredient) => (
		<InputCheck
			key={ingredient.id}
			id={ingredient.id}
			label={ingredient.label}
			isChecked={false}
			onChange={onChange}
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

	onChangeHandler = ({ id, isChecked }) => {
		const { selectedIngredients } = this.state

		if (isChecked) {
			selectedIngredients.push({ id, isChecked })
		}

		this.setState({
			selectedIngredients: selectedIngredients.filter((ingredient) => (
				(ingredient.id === id) ? isChecked : ingredient.isChecked
			))
		})
	}

	render() {
		const { recipes } = this.props

		const recipeList = recipes.map((recipe) => (
			<Recipe
				key={recipe.id}
				recipe={recipe}
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
