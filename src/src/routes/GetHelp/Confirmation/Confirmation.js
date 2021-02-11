import PropTypes from 'prop-types'
import React from 'react'
import { BottomFixedContent, CTA, Heading, Alert } from 'goustouicomponents'
import { client as routes } from 'config/routes'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import css from './Confirmation.css'

const propTypes = {
  trackConfirmationCTA: PropTypes.func.isRequired,
}

const Confirmation = ({ trackConfirmationCTA }) => (
  <GetHelpLayout2 headingText="Thanks for your feedback">
    <Heading size="fontStyleM" type="h2">
      We really appreciate you letting us know about this issue.
    </Heading>
    <Alert type="info">We&apos;ve added the credit to your account. You can view it using the link below but please allow some time for it to appear on your account.</Alert>
    <p className={css.content}>
      The credit will be automatically taken off your next order. It won&apos;t show the deduction on your Gousto account but it should show on your bank statement.
    </p>
    <BottomFixedContent>
      <CTA
        testingSelector="doneCTA"
        isFullWidth
        size="small"
        onClick={() => {
          trackConfirmationCTA()
          window.location.assign(routes.myGousto)
        }}
      >
        Done
      </CTA>
    </BottomFixedContent>
  </GetHelpLayout2>
)

Confirmation.propTypes = propTypes

export {
  Confirmation
}
