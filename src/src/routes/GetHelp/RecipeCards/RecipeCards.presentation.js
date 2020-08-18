import React from 'react'
import PropTypes from 'prop-types'
import { GetHelpLayout } from 'layouts/GetHelpLayout'
import { BottomButton } from '../components/BottomButton'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'

const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  buttonLeftUrl: PropTypes.string,
}

const defaultProps = {
  buttonLeftUrl: ''
}

const RecipeCardsPresentation = ({
  children,
  title,
  buttonLeftUrl,
}) => (
  <GetHelpLayout title={title} body="Which recipe had a recipe card issue?">
    {children}
    <BottomFixedContentWrapper>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        Back
      </BottomButton>
    </BottomFixedContentWrapper>
  </GetHelpLayout>
)

RecipeCardsPresentation.defaultProps = defaultProps
RecipeCardsPresentation.propTypes = propTypes

export {
  RecipeCardsPresentation
}
