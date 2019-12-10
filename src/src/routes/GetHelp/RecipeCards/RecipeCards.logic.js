import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import { Item } from 'goustouicomponents'
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
      ),
      url: PropTypes.string,
    })
  ),
  title: PropTypes.string.isRequired,
}

const RecipeCards = ({ title, recipes }) => {
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
          onClick={() => {
            if (url.length) {
              window.open(url, '_blank', 'noopener noreferrer')
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
