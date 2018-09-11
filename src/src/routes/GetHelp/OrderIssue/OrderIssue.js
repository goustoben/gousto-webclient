import React, { PropTypes } from 'react'

import List from '../components/List'
import BottomBar from 'BottomBar'
import BottomButton from '../components/BottomButton'

import { client as routes } from 'config/routes'
import GetHelpLayout from 'layouts/GetHelpLayout'

const OrderIssue = ({ content: { title, body, buttonCopy }, orderIssues, selectOrderIssue }) => (
	<GetHelpLayout title={title} body={body}>
		<List items={orderIssues} trackItemSelected={selectOrderIssue}/>
		<BottomBar>
			<BottomButton color="secondary" url={routes.myGousto} clientRouted={false}>
				{buttonCopy}
			</BottomButton>
		</BottomBar>
	</GetHelpLayout>
)

OrderIssue.propTypes = {
	orderIssues: PropTypes.array,
	content: PropTypes.shape({
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		buttonCopy: PropTypes.string.isRequired,
	}),
	selectOrderIssue: PropTypes.func,
}

OrderIssue.defaultProps = {
	orderIssues: [],
	selectOrderIssue: () => {},
}

export default OrderIssue
