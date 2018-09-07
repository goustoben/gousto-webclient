import React, { PropTypes } from 'react'

import List from '../components/List'
import BottomButton from '../components/BottomButton'
import { BottomBar } from 'BottomBar'
import { client as routes } from 'config/routes'

import GetHelpLayout from 'layouts/GetHelpLayout'

const Contact = ({ content: { title, body, button1Copy, button2Copy }, contactChannels, selectContactChannel }) => (
	<GetHelpLayout title={title} body={body}>
		<List items={contactChannels} trackItemSelected={selectContactChannel} />
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
	contactChannels: PropTypes.arrayOf(
		PropTypes.shape({
			slug: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			clientRouted: PropTypes.bool,
		})
	),
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		button1Copy: PropTypes.string.isRequired,
		button2Copy: PropTypes.string.isRequired,
	}),
	selectContactChannel: PropTypes.func,
}

Contact.defaultProps = {
	contactChannels: [],
	selectContactChannel: () => {},
}

export default Contact
