import PropTypes from 'prop-types'
import React from 'react'

import { GetHelpLayout } from 'layouts/GetHelpLayout'

import { client as routes } from 'config/routes'
import { BottomFixedContentWrapper } from '../components/BottomFixedContentWrapper'
import { BottomButton } from '../components/BottomButton'

const propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    button1: PropTypes.string.isRequired,
    button2: PropTypes.string.isRequired,
    confirmationBody: PropTypes.string.isRequired,
  }),
  trackConfirmationCTA: PropTypes.func.isRequired,
}
const defaultProps = {
  content: {}
}

const Confirmation = ({ content, trackConfirmationCTA }) => (
  <GetHelpLayout title={content.title} body={content.confirmationBody}>
    <BottomFixedContentWrapper>
      <BottomButton color="secondary" url={routes.myDetails} clientRouted={false}>
        {content.button1}
      </BottomButton>
      <BottomButton
        clientRouted={false}
        color="primary"
        onClick={trackConfirmationCTA}
        url={routes.myGousto}
      >
        {content.button2}
      </BottomButton>
    </BottomFixedContentWrapper>
  </GetHelpLayout>
)

Confirmation.defaultProps = defaultProps
Confirmation.propTypes = propTypes

export {
  Confirmation
}
