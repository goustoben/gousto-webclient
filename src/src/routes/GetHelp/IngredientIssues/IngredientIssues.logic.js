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
}

const IngredientIssues = ({ content }) => {
  const buttonLeftUrl = `${client.getHelp.index}/${client.getHelp.ingredients}`
  const buttonRightUrl = `${client.getHelp.index}/${client.getHelp.refund}`

  return (
    <IngredientIssuesPresentation
      content={content}
      buttonLeftUrl={buttonLeftUrl}
      buttonRightUrl={buttonRightUrl}
    >
      <div>Coming in the next ticket</div>
    </IngredientIssuesPresentation>
  )
}

IngredientIssues.propTypes = propTypes

export {
  IngredientIssues
}
