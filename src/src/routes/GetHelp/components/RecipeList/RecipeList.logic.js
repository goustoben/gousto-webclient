import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ItemExpandable } from 'goustouicomponents'
import { List } from '../../components/List'

import css from './InputCheck'

const propTypes = {
	recipes: PropTypes.object.isRequired
}

const InputCheck = ({ id, label, isChecked, onClick }) => (
	<div className={css.inputCheckContainer} onClick={() => onClick(id)}>
		<input
			id="inputCheck"
			type="checkbox"
			checked={isChecked}
		/>
		<div className={css.inputCheckMask}></div>
		<label className={css.inputCheckLabel} htmlFor="inputCheck">
			{label}
		</label>
	</div>
)

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
		itemsChecked: []
	}

	onClickHandler = (id) => {
		console.log('onClickHandler', id)
	}

	render() {
		const { recipes } = this.props
		const recipeList = Object.keys(recipes).map((id) => {
			const recipe = recipes[id]

			return (
				<Recipe
					key={recipe.id}
					recipe={recipe}
					onClick={this.onClickHandler}
				/>
			)
		})

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
