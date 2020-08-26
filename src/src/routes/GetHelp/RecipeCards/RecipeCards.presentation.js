import React from 'react'
import PropTypes from 'prop-types'
import { GetHelpLayout } from '../layouts/GetHelpLayout'

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

const RecipeCardsPresentation = ({
  children,
  title,
}) => (
  <GetHelpLayout title={title} body="Which recipe had a recipe card issue?">
    {children}
  </GetHelpLayout>
)

RecipeCardsPresentation.propTypes = propTypes

export {
  RecipeCardsPresentation
}
