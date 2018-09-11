import React, { PropTypes } from 'react'

import List from '../components/List'
import Item from '../components/Item'
import ItemLink from '../components/ItemLink'
import ItemExecutable from '../components/ItemExecutable'
import ItemExpandable from '../components/ItemExpandable'
import PhoneContent from './PhoneContent'
import BottomButton from '../components/BottomButton'
import BottomBar from 'BottomBar'

import { client, zendesk } from 'config/routes'

import GetHelpLayout from 'layouts/GetHelpLayout'

const trackClick = (selectContactChannel, channel) => () => selectContactChannel(channel)

const openLiveChat = () => {
	window.$zopim.livechat.window.show()
}

const Contact = ({
	content: {
		title,
		body,
		button1Copy,
		button2Copy,
		chatItem,
		emailItem,
		phoneItem,
	},
	selectContactChannel
}) => (
	<GetHelpLayout title={title} body={body}>
		<List>
			<Item trackClick={trackClick(selectContactChannel, 'chat')} isHiddenOnMobile>
				<ItemExecutable
					label={chatItem}
					onClick={openLiveChat}
				/>
			</Item>
			<Item trackClick={trackClick(selectContactChannel, 'email')}>
				<ItemLink
					label={emailItem}
					to={zendesk.link}
					clientRouted={false}
				/>
			</Item>
			<Item trackClick={trackClick(selectContactChannel, 'phone')}>
				<ItemExpandable label={phoneItem}>
					<PhoneContent />
				</ItemExpandable>
			</Item>
		</List>
		<BottomBar>
			<BottomButton color="secondary" url={client.getHelp.index} clientRouted>
				{button1Copy}
			</BottomButton>
			<BottomButton color="primary" url={client.myGousto} clientRouted={false}>
				{button2Copy}
			</BottomButton>
		</BottomBar>
	</GetHelpLayout>
)

Contact.propTypes = {
	contactChannels: PropTypes.array,
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
