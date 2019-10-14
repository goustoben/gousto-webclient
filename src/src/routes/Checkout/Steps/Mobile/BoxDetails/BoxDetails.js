import PropTypes from 'prop-types'
import React from 'react'

import CheckoutButton from '../../../Components/CheckoutButton'
import Summary from '../../../Components/Summary'
import SectionContainer from '../SectionContainer'

import BoxDetailsContainer from '../../../Components/BoxDetails'

const BoxDetails = ({ onStepChange, trackClick }) => (
  <div>
    <Summary showPromocode />
    <SectionContainer>
      <CheckoutButton
        onClick={() => {onStepChange(), trackClick('first')}}
        stepName="Checkout Securely"
      />
    </SectionContainer>
    <SectionContainer>
      <BoxDetailsContainer />
    </SectionContainer>
    <CheckoutButton
      onClick={() => {onStepChange(), trackClick('second')}}
      stepName="Checkout Securely"
    />
  </div>
)

BoxDetails.propTypes = {
  onStepChange: PropTypes.func.isRequired,
  trackClick: PropTypes.func
}

BoxDetails.defaultProps = {
  trackClick: () => {}
}

export default BoxDetails
