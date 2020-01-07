import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { recipePropType } from '../getHelpPropTypes'
import { RecipeCardsPresentation } from './RecipeCards.presentation'
import { RecipeCardContent } from './RecipeCardContent'
import { RecipeList } from '../components/RecipeList'

const propTypes = {
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  title: PropTypes.string.isRequired,
  trackRecipeCardClick: PropTypes.func.isRequired,
}

const RecipeCards = ({ recipes, title, trackRecipeCardClick }) => {
  const buttonLeftUrl = client.getHelp.index

  return (
    <RecipeCardsPresentation
      title={title}
      buttonLeftUrl={buttonLeftUrl}
    >
      <RecipeList recipes={recipes}>
        <RecipeCardContent trackRecipeCardClick={trackRecipeCardClick} />
      </RecipeList>
    </RecipeCardsPresentation>
  )
}

RecipeCards.propTypes = propTypes

export {
  RecipeCards
}
