import { connect } from 'react-redux'

import { selectOrderIssue } from 'actions/getHelp'

import Refund from './Refund'

const mapStateToProps = (state) => ({
	refundAmount: '7.50',
	content: {
		title: state.content.get('get-help_refund_pageheader_header')
		|| 'Get help with your box',
		confirmationBody: state.content.get('get-help_refund_pagecontent_copy')
		|| 'Would you like to accept the credit, or contact us for further assistance?',
		contactCopy: state.content.get('get-help_refund_pagecontent_contactbtn_copy')
		|| 'Contact Us',
	}
})

const RefundContainer = connect(mapStateToProps, {
	selectOrderIssue,
})(Refund)

export default RefundContainer
