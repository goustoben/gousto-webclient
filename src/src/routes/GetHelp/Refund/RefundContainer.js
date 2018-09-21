import { connect } from 'react-redux'

import { selectOrderIssue } from 'actions/getHelp'

import Refund from './Refund'

const mapStateToProps = (state) => ({
	refundAmount: '57.50',
	content: {
		title: state.content.get('get-help_refund_pageheader_header')
		|| 'Get help with your box',
		infoBody: state.content.get('get-help_refund_pagecontent_infobody')
		|| `We would like to offer you £{{refundAmount}} in Gousto credit,
		which will be applied to your next order.`,
		confirmationBody: state.content.get('get-help_refund_pagecontent_confirmationbody')
		|| 'Would you like to accept the credit, or contact us for further assistance?',
		button1: state.content.get('get-help_refund_pagecontent_contactbtn_button1')
		|| 'Contact Us',
		button2: state.content.get('get-help_refund_pagecontent_contactbtn_button2')
		|| 'Accept £{{refundAmount}} credit',
	}
})

const RefundContainer = connect(mapStateToProps, {
	selectOrderIssue,
})(Refund)

export default RefundContainer
