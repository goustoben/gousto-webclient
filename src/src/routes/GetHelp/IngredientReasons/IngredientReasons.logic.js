import React from 'react'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { IngredientReasonsPresentation } from './IngredientReasons.presentation'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
}

const IngredientReasons = ({ content }) => {
  const buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredientIssues}`
  const buttonRightUrl = `${client.getHelp.index}/${client.getHelp.refund}`

  return (
    <IngredientReasonsPresentation
      content={content}
      buttonLeftUrl={buttonLeftUrl}
      buttonRightUrl={buttonRightUrl}
    />
  )
}

IngredientReasons.propTypes = propTypes

export {
  IngredientReasons
}
