import React from 'react'
import PropTypes from 'prop-types'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'
import { BottomButton } from '../components/BottomButton'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    secondBody: PropTypes.string.isRequired,
    button1Copy: PropTypes.string.isRequired,
    button2Copy: PropTypes.string.isRequired,
  }).isRequired,
  buttonLeftUrl: PropTypes.string.isRequired,
  buttonRightUrl: PropTypes.string.isRequired,
}

const IngredientReasonsPresentation = ({
  content: {
    title,
    body,
    secondBody,
    button1Copy,
    button2Copy,
  },
  buttonLeftUrl,
  buttonRightUrl
}) => (
  <GetHelpLayout title={title} body={body}>
    <p>{secondBody}</p>
    <BottomBar>
      <BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
        {button1Copy}
      </BottomButton>
      <BottomButton color="primary" url={buttonRightUrl} clientRouted>
        {button2Copy}
      </BottomButton>
    </BottomBar>
  </GetHelpLayout>
)

IngredientReasonsPresentation.propTypes = propTypes

export {
  IngredientReasonsPresentation
}
