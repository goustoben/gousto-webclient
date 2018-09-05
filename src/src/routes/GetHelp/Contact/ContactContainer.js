import { connect } from 'react-redux'

import Contact from './Contact'

const mapStateToProps = (state) => ({
	categories: [
		{ slug: 'chat', name: 'Start live chat' },
		{ slug: 'email', name: 'Contact us by email' },
		{ slug: 'delivery', name: 'Delivery' },
		{ slug: 'other', name: 'Other' }
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

const ContactContainer = connect(mapStateToProps, {})(Contact)

export default ContactContainer
