import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import { GetHelpLayout } from 'layouts/GetHelpLayout'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'
import { BottomButton } from '../components/BottomButton'

const propTypes = {
  buttonLeftUrl: PropTypes.string,
  children: PropTypes.node.isRequired,
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  cssButton: PropTypes.string.isRequired,
  cannotContinue: PropTypes.bool.isRequired,
  continueClick: PropTypes.func.isRequired,
}
const defaultProps = {
  buttonLeftUrl: '',
}

const IngredientsPresentation = ({
  children,
  content: {
    title,
    body,
    button1Copy,
    button2Copy,
  },
  cssButton,
  cannotContinue,
  continueClick,
  buttonLeftUrl,
}) => (
  <GetHelpLayout title={title} body={body}>
    {children}
    <BottomFixedContentWrapper>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        {button1Copy}
      </BottomButton>
      <Button
        className={cssButton}
        color="primary"
        disabled={cannotContinue}
        onClick={(continueClick)}
      >
        {button2Copy}
      </Button>
    </BottomFixedContentWrapper>
  </GetHelpLayout>
)

IngredientsPresentation.defaultProps = defaultProps
IngredientsPresentation.propTypes = propTypes

export {
  IngredientsPresentation
}
