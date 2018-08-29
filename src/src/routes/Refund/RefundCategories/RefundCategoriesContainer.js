import { connect } from 'react-redux'

// import actionTypes from 'actions/actionTypes'
import RefundCategories from './RefundCategories'

const mapStateToProps = (state) => ({
	categories: [
		{ slug: 'ingredients', name: 'Ingredients (missing, damaged, etc)', url: '/help' },
		{ slug: 'recipe_card', name: 'Recipe cards', url: '/help' },
		{ slug: 'delivery', name: 'Delivery', url: '/help' },
		{ slug: 'other', name: 'Other', url: '/help' }
	],
	content: {
		title: state.content.get('gethelpOrderissuesPageheaderHeader')
		|| 'Get help with your box',
		body: state.content.get('gethelpOrderissuesPagecontentCopy')
		|| 'What part of your order had an issue?',
	}
})

const RefundCategoriesContainer = connect(mapStateToProps, {})(RefundCategories)

export default RefundCategoriesContainer
