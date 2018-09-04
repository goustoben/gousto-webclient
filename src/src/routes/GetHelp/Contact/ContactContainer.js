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
		title: state.content.get('gethelpContactPageheaderHeader')
		|| 'Contact us',
		body: state.content.get('gethelpContactPagecontentCopy')
		|| 'Please get in touch so one of our customer care agents can help resolve your issue.',
	}
})

const ContactContainer = connect(mapStateToProps, {})(Contact)

export default ContactContainer
