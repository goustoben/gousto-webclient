import { connect } from 'react-redux'

import { selectOrderIssue } from 'actions/getHelp'

import Refund from './Refund'

const mapStateToProps = (state) => {
	const { auth, getHelp } = state
	const order = getHelp.get('order').toJS()
	const recipes = state.recipes.toJS()

	const selectedItems = Object.keys(recipes).reduce((acc, id) => {
		const recipe = recipes[id]

		acc.push({
			recipeId: recipe.id,
			ingredients: [{
				id: recipe.ingredients[0].id,
				issueId: 1
			}],
		})

		return acc
	}, [])


	return {
		user: {
			id: auth.get('id'),
			accessToken: auth.get('accessToken'),
		},
		order,
		selectedItems,
		content: {
			title: state.content.get('get-help_refund_pageheader_header')
			|| 'Get help with your box',
			infoBody: state.content.get('get-help_refund_pagecontent_infobody')
			|| `We would like to offer you £{{refundAmount}} in Gousto credit,
			which will be applied to your next order.`,
			confirmationBody: state.content.get('get-help_refund_pagecontent_confirmationbody')
			|| 'Would you like to accept the credit, or contact us for further assistance?',
			errorBody: state.content.get('get-help_refund_pagecontent_errorbody')
			|| 'There was a problem in getting your refund. Please contact us below, or try again later.',
			button1: state.content.get('get-help_refund_pagecontent_button1')
			|| 'Contact Us',
			button2: state.content.get('get-help_refund_pagecontent_button2')
			|| 'Accept £{{refundAmount}} credit',
		}
	}
}

const RefundContainer = connect(mapStateToProps, {
	selectOrderIssue,
})(Refund)

export default RefundContainer
