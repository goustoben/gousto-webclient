import PropTypes from 'prop-types'
import React from 'react'

import CheckoutButton from '../../../Components/CheckoutButton'
import Summary from '../../../Components/Summary'
import SectionContainer from '../SectionContainer'

import BoxDetailsContainer from '../../../Components/BoxDetails'

const BoxDetails = ({ onStepChange, trackClick, trackUTMAndPromoCode }) => (
  <div>
    <Summary showPromocode />
    <SectionContainer>
      <CheckoutButton
        onClick={() => {
          onStepChange()
          trackClick('NextCTA Clicked', { position: 'first' })
          trackUTMAndPromoCode('clickCheckoutSecurely', 'top')
        }}
        stepName="Checkout Securely"
      />
    </SectionContainer>
    <SectionContainer>
      <BoxDetailsContainer />
    </SectionContainer>
    <CheckoutButton
      onClick={() => {
        onStepChange()
        trackUTMAndPromoCode('clickCheckoutSecurely', 'bottom')
        trackClick('NextCTA Clicked', { position: 'second' })
      }}
      stepName="Checkout Securely"
    />
  </div>
)

BoxDetails.propTypes = {
  onStepChange: PropTypes.func.isRequired,
  trackClick: PropTypes.func,
  trackUTMAndPromoCode: PropTypes.func,
}

BoxDetails.defaultProps = {
  trackClick: () => { },
  trackUTMAndPromoCode: () => { },
}

export default BoxDetails
