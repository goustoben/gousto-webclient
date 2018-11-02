import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { trackClick } from 'utils/getHelp'
import { List } from '../components/List'
import { ItemExpandable } from 'goustouicomponents'
import { IngredientsPresentation } from './Ingredients.presentation'

const propTypes = {
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		button1Copy: PropTypes.string.isRequired,
		button2Copy: PropTypes.string.isRequired,
	}).isRequired,
}

const RecipeList = ({ recipes, selectContactChannel }) => {
	const items = Object.keys(recipes).map((id) => {
		const recipe = recipes[id]

		return (
			<ItemExpandable
				key={recipe.id}
				label={recipe.title}
				trackClick={trackClick(selectContactChannel, recipe.title)}
			>
				<div />
			</ItemExpandable>
		)
	})

	return (
		<List>
			{items}
		</List>
	)
}

const Ingredients = ({ content, recipes, selectContactChannel }) => {
	const buttonLeftUrl = client.getHelp.index
	const buttonRightUrl = `${client.getHelp.index}/${client.getHelp.refund}`

	return (
		<IngredientsPresentation
			content={content}
			buttonLeftUrl={buttonLeftUrl}
			buttonRightUrl={buttonRightUrl}
		>
			<RecipeList
				recipes={recipes}
				selectContactChannel={selectContactChannel}
			/>
		</IngredientsPresentation>
	)
}

Ingredients.propTypes = propTypes

export {
	Ingredients
}
