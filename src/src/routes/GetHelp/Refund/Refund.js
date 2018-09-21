import React, { PropTypes } from 'react'
import { replaceWithValues } from 'utils/text'

import BottomBar from 'BottomBar'
import BottomButton from '../components/BottomButton'

import { client as routes } from 'config/routes'
import GetHelpLayout from 'layouts/GetHelpLayout'

const Refund = ({
	content: {
		title,
		infoBody,
		confirmationBody,
		button1,
		button2
	}, refundAmount
}) => {
	const { index, contact } = routes.getHelp
	const contactUrl = `${index}/${contact}`
	const infoBodyWithAmount = replaceWithValues(infoBody, { refundAmount })
	const button2WithAmount = replaceWithValues(button2, { refundAmount })

	return (
		<GetHelpLayout
			title={title}
			body={infoBodyWithAmount}
			fullWidthContent
		>
			<p>{confirmationBody}</p>
			<BottomBar>
				<BottomButton color="secondary" url={contactUrl} clientRouted>
					{button1}
				</BottomButton>
				<BottomButton color="primary" url={contactUrl} clientRouted>
					{button2WithAmount}
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
