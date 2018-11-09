import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { IngredientsPresentation } from './Ingredients.presentation'
import { RecipeList } from '../components/RecipeList'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
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
			<RecipeList recipes={recipes}/>
		</IngredientsPresentation>
  )
}

Ingredients.propTypes = propTypes

export {
  Ingredients
}
