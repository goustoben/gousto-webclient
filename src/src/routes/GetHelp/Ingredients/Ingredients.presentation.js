import React from 'react'
import BottomButton from '../components/BottomButton'
import BottomBar from 'BottomBar'
import GetHelpLayout from 'layouts/GetHelpLayout'

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

export {
	IngredientsPresentation
}
