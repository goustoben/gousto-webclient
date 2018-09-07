import { connect } from 'react-redux'

import { selectContactChannel } from 'actions/getHelp'
import { zendesk } from 'config/routes'

import Contact from './Contact'
import PhoneContent from './PhoneContent'

const mapStateToProps = (state) => ({
	contactChannels: [
		{ slug: 'email', name: 'Contact us by email', url: zendesk.link, clientRouted: false },
		{ slug: 'phone', name: 'Contact us by phone', expandableContent: PhoneContent },
	],
	content: {
		title: state.content.get('get-help_contact_pageheader_header')
		|| 'Contact us',
		body: state.content.get('get-help_contact_pagecontent_copy')
		|| 'Please get in touch so one of our customer care agents can help resolve your issue.',
		button1Copy: state.content.get('get-help_orderissues_pagecontent_button1copy')
		|| 'back',
		button2Copy: state.content.get('get-help_orderissues_pagecontent_button2copy')
		|| 'done',
	}
})

const ContactContainer = connect(mapStateToProps, {
	selectContactChannel,
})(Contact)

export default ContactContainer
