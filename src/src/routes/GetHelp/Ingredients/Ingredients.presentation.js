import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import { GetHelpLayout } from '../layouts/GetHelpLayout'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'

const propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
  }).isRequired,
  cssButton: PropTypes.string.isRequired,
  cannotContinue: PropTypes.bool.isRequired,
  continueClick: PropTypes.func.isRequired,
}

const IngredientsPresentation = ({
  children,
  content: {
    title,
    body,
    button1Copy,
  },
  cssButton,
  cannotContinue,
  continueClick,
}) => (
  <GetHelpLayout title={title} body={body}>
    {children}
    <BottomFixedContentWrapper>
      <Button
        className={cssButton}
        color="primary"
        disabled={cannotContinue}
        onClick={(continueClick)}
      >
        {button1Copy}
      </Button>
    </BottomFixedContentWrapper>
  </GetHelpLayout>
)

IngredientsPresentation.propTypes = propTypes

export {
  IngredientsPresentation
}
