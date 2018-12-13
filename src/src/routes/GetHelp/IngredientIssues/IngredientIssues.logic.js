import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { IngredientIssuesPresentation } from './IngredientIssues.presentation'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

const IngredientIssues = ({ content, ingredients }) => {
  const buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredients}`
  const buttonRightUrl = `${client.getHelp.index}/${client.getHelp.ingredientReasons}`

  return (
    <IngredientIssuesPresentation
      content={content}
      ingredients={ingredients}
      buttonLeftUrl={buttonLeftUrl}
      buttonRightUrl={buttonRightUrl}
    />
  )
}

IngredientIssues.propTypes = propTypes

export {
  IngredientIssues
}
