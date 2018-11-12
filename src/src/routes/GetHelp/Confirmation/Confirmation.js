import React, { PropTypes } from 'react'

import BottomBar from 'BottomBar'
import { BottomButton } from '../components/BottomButton'

import GetHelpLayout from 'layouts/GetHelpLayout'

import { client as routes } from 'config/routes'

const Confirmation = ({ content }) => (
	<GetHelpLayout title={content.title} body={content.confirmationBody}>
		<BottomBar>
			<BottomButton color="secondary" url={routes.myDetails} clientRouted={false}>
				{content.button1}
			</BottomButton>
			<BottomButton color="primary" url={routes.myGousto} clientRouted={false}>
				{content.button2}
			</BottomButton>
		</BottomBar>
	</GetHelpLayout>
)

Confirmation.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    button1: PropTypes.string.isRequired,
    button2: PropTypes.string.isRequired,
    confirmationBody: PropTypes.string.isRequired,
  }),
}

export default Confirmation
