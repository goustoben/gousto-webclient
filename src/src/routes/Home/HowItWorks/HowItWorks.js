import PropTypes from 'prop-types'
import React from 'react'
import config from 'config/home'
import Guide from 'Guide'

const HowItWorks = ({ steps, header, description, variant }) => (
	<div>
		<Guide steps={steps(variant)} header={header} description={description} />
	</div>
)

HowItWorks.propTypes = {
	header: PropTypes.string,
	description: PropTypes.string,
	steps: PropTypes.func,
	variant: PropTypes.string,
}

HowItWorks.defaultProps = {
	steps: config.howItWorks.steps,
	variant: 'default',
}

export default HowItWorks
