import { connect } from 'react-redux'

import ContactUs from './ContactUs'

const mapStateToProps = (state) => ({
	categories: [
		{ slug: 'chat', name: 'Start live chat' },
		{ slug: 'email', name: 'Contact us by email' },
		{ slug: 'delivery', name: 'Delivery' },
		{ slug: 'other', name: 'Other' }
	],
	content: {
		title: state.content.get('gethelpContactUsPageheaderHeader')
		|| 'Contact us',
		body: state.content.get('gethelpContactUsPagecontentCopy')
		|| 'Please get in touch so one of our customer care agents can help resolve your issue.',
	}
})

const ContactUsContainer = connect(mapStateToProps, {})(ContactUs)

export default ContactUsContainer
