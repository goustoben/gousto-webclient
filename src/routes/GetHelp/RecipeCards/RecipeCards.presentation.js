import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { BottomButton } from '../components/BottomButton'

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonLeftUrl: PropTypes.string,
}

const RecipeCardsPresentation = ({
  children,
  title,
  buttonLeftUrl,
}) => (
  <GetHelpLayout title={title} body='Which recipe had a recipe card issue?'>
    {children}
    <BottomBar>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        Back
      </BottomButton>
    </BottomBar>
  </GetHelpLayout>
)

RecipeCardsPresentation.propTypes = propTypes

export {
  RecipeCardsPresentation
}
