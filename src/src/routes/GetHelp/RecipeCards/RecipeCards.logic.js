import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { RecipeCardsPresentation } from './RecipeCards.presentation'

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
  ),
  title: PropTypes.string.isRequired,
}

const RecipeCards = ({ title }) => {
  const buttonLeftUrl = client.getHelp.index

  return (
    <RecipeCardsPresentation
      title={title}
      buttonLeftUrl={buttonLeftUrl}
    >
      <div />
    </RecipeCardsPresentation>
  )
}

RecipeCards.propTypes = propTypes

export {
  RecipeCards
}
