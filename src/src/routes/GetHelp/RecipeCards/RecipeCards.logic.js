import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { Item } from 'goustouicomponents'
import { windowOpen } from 'utils/window'
import { client } from 'config/routes'
import { recipePropType } from '../getHelpPropTypes'
import { RecipeCardsPresentation } from './RecipeCards.presentation'

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
      {recipes.map(({ id, title: recipeTitle, url }) => (
        <Item
          key={id}
          label={recipeTitle}
          trackClick={() => trackRecipeCardClick(id)}
          onClick={() => {
            if (url.length) {
              windowOpen(url)
            } else {
              browserHistory.push(`${buttonLeftUrl}/${client.getHelp.contact}`)
            }
          }}
        />
      ))}
    </RecipeCardsPresentation>
  )
}

RecipeCards.propTypes = propTypes

export {
  RecipeCards
}
