import React, { PropTypes } from 'react'
import config from 'config/home'
import Guide from 'Guide'

const HowItWorks = ({ steps, header, description }) => (
	<div>
		<Guide steps={steps} header={header} description={description} />
	</div>
)

HowItWorks.propTypes = {
	header: PropTypes.string,
	description: PropTypes.string,
	steps: PropTypes.array,
}

HowItWorks.defaultProps = {
	steps: config.howItWorks.steps,
}

export default HowItWorks
