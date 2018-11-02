import { connect } from 'react-redux'

import { Ingredients } from './Ingredients.logic'
import { selectContactChannel } from 'actions/getHelp'

const mapStateToProps = (state) => ({
	recipes: state.recipes.toJS(),
	content: {
		title: state.content.get('get-help_contact_pageheader_header')
		|| 'Get help with your box',
		body: state.content.get('get-help_contact_pagecontent_copy')
		|| 'Which ingredient(s) had an issue? Select meal to see ingredients.',
		button1Copy: state.content.get('get-help_orderissues_pagecontent_button1copy')
		|| 'back',
		button2Copy: state.content.get('get-help_orderissues_pagecontent_button2copy')
		|| 'done',
	}
})

const IngredientsContainer = connect(mapStateToProps, {
	selectContactChannel
})(Ingredients)

export {
	IngredientsContainer
}
