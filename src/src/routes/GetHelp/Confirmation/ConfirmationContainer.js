import { connect } from 'react-redux'

import { selectOrderIssue } from 'actions/getHelp'

import Confirmation from './Confirmation'

const mapStateToProps = (state) => ({
	content: {
		title: state.content.get('get-help_confirmation_pageheader_header')
		|| 'Thank you',
		confirmationBody: state.content.get('get-help_confirmation_pagecontent_confirmationbody')
		|| `Your credit is available now, you can view your balance by visiting 'My Details' using
		the link below. The credit will automatically be applied towards your next order.`,
		button1: state.content.get('get-help_confirmation_pagecontent_contactbtn_button1')
		|| 'View my details',
		button2: state.content.get('get-help_confirmation_pagecontent_contactbtn_button2')
		|| 'Done',
	}
})

const ConfirmationContainer = connect(mapStateToProps, {
	selectOrderIssue,
})(Confirmation)

export default ConfirmationContainer
