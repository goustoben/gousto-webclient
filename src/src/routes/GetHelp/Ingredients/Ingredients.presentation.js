import React from 'react'
import PropTypes from 'prop-types'
import BottomButton from '../components/BottomButton'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'

const propTypes = {
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		button1Copy: PropTypes.string.isRequired,
		button2Copy: PropTypes.string.isRequired,
	}).isRequired,
	buttonLeftUrl: PropTypes.string,
	buttonRightUrl: PropTypes.string,
}

const IngredientsPresentation = ({
	content: {
		title,
		body,
		button1Copy,
		button2Copy,
	},
	buttonLeftUrl,
	buttonRightUrl,
}) => (
	<GetHelpLayout title={title} body={body}>
		<BottomBar>
			<BottomButton color="secondary" url={buttonLeftUrl} clientRouted>
				{button1Copy}
			</BottomButton>
			<BottomButton
				color="primary"
				url={buttonRightUrl}
				clientRouted
			>
				{button2Copy}
			</BottomButton>
		</BottomBar>
	</GetHelpLayout>
)

IngredientsPresentation.propTypes = propTypes

export {
	IngredientsPresentation
}
