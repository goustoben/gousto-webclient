import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Heading } from 'goustouicomponents'

const propTypes = {
  userCredit: PropTypes.string.isRequired
}

const UserCreditMessagePresentation = ({ userCredit }) => (
  <Alert type="success" hasIcon={false}>
    <Heading type='h3'>
      {`Credit £${userCredit}`}
    </Heading>
    <p>
      Any credit on your account will be automatically deducted from your next payment.
    </p>
  </Alert>
)

UserCreditMessagePresentation.propTypes = propTypes

export {
  UserCreditMessagePresentation
}
