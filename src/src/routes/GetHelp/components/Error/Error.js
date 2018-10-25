import React from 'react'
import PropTypes from 'prop-types'
import GetHelpLayout from 'layouts/GetHelpLayout'
import BottomBar from 'BottomBar'
import { BottomButton } from '../BottomButton'
import { client as routes } from 'config/routes'

const propTypes = {
	children: PropTypes.node.isRequired,
	hasError: PropTypes.bool.isRequired,
}

const Error = ({ hasError, children }) => {
	if (hasError) {
		return (
			<GetHelpLayout
				title="Get help with your box"
				body=""
				fullWidthContent
			>
				<p>{`There was a problem in getting your refund.
				Please contact us below, or try again later.`}</p>
				<BottomBar>
					<BottomButton
						color="secondary"
						url={`${routes.getHelp.index}/${routes.getHelp.contact}`}
						clientRouted
					>
						Contact Us
					</BottomButton>
				</BottomBar>
			</GetHelpLayout>
		)
	}

	return children
}

Error.propTypes = propTypes

export {
	Error
}
