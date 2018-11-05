import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { List } from '../components/List'
import { ItemExpandable } from 'goustouicomponents'
import { IngredientsPresentation } from './Ingredients.presentation'

import css from './InputCheck'

const propTypes = {
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		button1Copy: PropTypes.string.isRequired,
		button2Copy: PropTypes.string.isRequired,
	}).isRequired,
}

const InputCheck = ({ id, label, onChange }) => (
	<div className={css.inputCheckContainer}>
		<input
			id="inputCheck"
			type="checkbox"
			onChange={() => {
				onChange(id)
			}}
		/>
		<div className={css.inputCheckMask}></div>
		<label className={css.inputCheckLabel} htmlFor="inputCheck">
			{label}
		</label>
	</div>
)

const RecipeList = ({ recipes }) => {
	const changeFn = (id) => {
		console.log('>>>', id)
	}
	const items = Object.keys(recipes).map((id) => {
		const recipe = recipes[id]
		const ingredients = recipe.ingredients.map((ingredient) => (
			<InputCheck
				key={ingredient.id}
				id={ingredient.id}
				label={ingredient.label}
				onChange={changeFn}
			/>
		))

		return (
			<ItemExpandable
				key={recipe.id}
				label={recipe.title}
			>
				{ingredients}
			</ItemExpandable>
		)
	})

	return (
		<List>
			{items}
		</List>
	)
}

const Ingredients = ({ content, recipes }) => {
	const buttonLeftUrl = client.getHelp.index
	const buttonRightUrl = `${client.getHelp.index}/${client.getHelp.refund}`

	return (
		<IngredientsPresentation
			content={content}
			buttonLeftUrl={buttonLeftUrl}
			buttonRightUrl={buttonRightUrl}
		>
			<div>
				<RecipeList recipes={recipes} />
			</div>
		</IngredientsPresentation>
	)
}

Ingredients.propTypes = propTypes

export {
	Ingredients
}
