import React, { PropTypes } from 'react'

import BottomBar from 'BottomBar'
import BottomButton from '../components/BottomButton'

import { client as routes } from 'config/routes'
import GetHelpLayout from 'layouts/GetHelpLayout'

const Refund = ({ content: { title }, refundAmount }) => {
	const { index, contact } = routes.getHelp
	const contactUrl = `${index}/${contact}`
	const bodyDescription = `We would like to offer you £${refundAmount} in Gousto credit, 
	which will be applied to your next order.`

	return (
		<GetHelpLayout
			title={title}
			body={bodyDescription}
			fullWidthContent
		>
			<p>Would you like to accept the credit, or contact us for for further assistance?</p>
			<BottomBar>
				<BottomButton color="secondary" url={contactUrl} clientRouted>
					Contact Us
				</BottomButton>
				<BottomButton color="secondary" url={contactUrl} clientRouted>
					{`Accept £${refundAmount} credit`}
				</BottomButton>
			</BottomBar>
		</GetHelpLayout>
	)
}

Refund.propTypes = {
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
	}),
	refundAmount: PropTypes.string.isRequired,
}

Refund.defaultProps = {
	orderIssues: [],
}

export default Refund
