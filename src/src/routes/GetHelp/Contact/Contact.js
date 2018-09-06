import React, { PropTypes } from 'react'

import List from '../components/List'
import BottomButton from '../components/BottomButton'
import { BottomBar } from 'BottomBar'
import { client as routes } from 'config/routes'

import GetHelpLayout from 'layouts/GetHelpLayout'

const Contact = ({ contactChannels, content: { title, body, button1Copy, button2Copy } }) => (
	<GetHelpLayout title={title} body={body}>
		<List items={contactChannels} />
		<BottomBar>
			<BottomButton color="secondary" url={routes.getHelp.index} clientRouted>
				{button1Copy}
			</BottomButton>
			<BottomButton color="primary" url={routes.myGousto} clientRouted={false}>
				{button2Copy}
			</BottomButton>
		</BottomBar>
	</GetHelpLayout>
)

Contact.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	),
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		button1Copy: PropTypes.string.isRequired,
		button2Copy: PropTypes.string.isRequired,
	})
}

export default Contact
