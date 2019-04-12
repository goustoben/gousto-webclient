import PropTypes from 'prop-types'
import React from 'react'

import CheckoutButton from '../../../Components/CheckoutButton'

import BoxDetailsContainer from '../../../Components/BoxDetails'

const BoxDetails = ({ onStepChange }) => (
  <div>
    <BoxDetailsContainer />
    <CheckoutButton
      onClick={onStepChange}
      stepName="Checkout Securely"
    />
  </div>
)

BoxDetails.propTypes = {
  onStepChange: PropTypes.func.isRequired,
}

export default BoxDetails
