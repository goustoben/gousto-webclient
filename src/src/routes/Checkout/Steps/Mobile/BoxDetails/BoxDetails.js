import PropTypes from 'prop-types'
import React from 'react'

import CheckoutButton from '../../../Components/CheckoutButton'
import Summary from '../../../Components/Summary'
import SectionContainer from '../SectionContainer'

import BoxDetailsContainer from '../../../Components/BoxDetails'

const BoxDetails = ({ onStepChange }) => (
	<div>
		<Summary showPromocode />
		<SectionContainer>
			<CheckoutButton
			  onClick={onStepChange}
			  stepName="Checkout Securely"
			/>
		</SectionContainer>
		<SectionContainer>
			<BoxDetailsContainer />
		</SectionContainer>
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
