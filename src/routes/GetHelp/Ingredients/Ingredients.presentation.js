import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { BottomButton } from '../components/BottomButton'

const propTypes = {
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
  buttonLeftUrl: PropTypes.string,
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
    <BottomBar>
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
    </BottomBar>
  </GetHelpLayout>
)

IngredientsPresentation.propTypes = propTypes

export {
  IngredientsPresentation
}
