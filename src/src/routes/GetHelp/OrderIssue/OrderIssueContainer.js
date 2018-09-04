import { connect } from 'react-redux'

import OrderIssue from './OrderIssue'

const mapStateToProps = (state) => ({
	categories: [
		{ slug: 'ingredients', name: 'Ingredients (missing, damaged, etc)', url: '/get-help/contact', clientRouted: true },
		{ slug: 'recipe_card', name: 'Recipe cards', url: '/get-help/contact', clientRouted: true },
		{ slug: 'delivery', name: 'Delivery', url: '/get-help/contact', clientRouted: true },
		{ slug: 'other', name: 'Other', url: '/get-help/contact', clientRouted: true }
	],
	content: {
		title: state.content.get('gethelpOrderissuesPageheaderHeader')
		|| 'Get help with your box',
		body: state.content.get('gethelpOrderissuesPagecontentCopy')
		|| 'What part of your order had an issue?',
	}
})

const OrderIssueContainer = connect(mapStateToProps, {})(OrderIssue)

export default OrderIssueContainer
