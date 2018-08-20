import { connect } from 'react-redux'

// import actionTypes from 'actions/actionTypes'
import RefundCategories from './RefundCategories'

const mapStateToProps = () => ({
	categories: [
		{ name: 'Ingredients (missing, damaged, etc)', url: '/help' },
		{ name: 'Recipe cards', url: '/help' },
		{ name: 'Delivery', url: '/help' },
		{ name: 'Other', url: '/help' }
	],
	content: {
		title: 'Get help with your box',
		body: 'What part of your order had an issue?'
	}
})

const RefundCategoriesContainer = connect(mapStateToProps, {})(RefundCategories)

export default RefundCategoriesContainer
