import { connect } from 'react-redux'

import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => ({
  recipes: state.getHelp.get('recipes').toJS(),
  content: {
    title: state.content.get('get-help_ingredients_pageheader_header')
    || 'Get help with your box',
    body: state.content.get('get-help_ingredients_pagecontent_copy')
    || 'Which ingredient(s) had an issue? Select meal to see ingredients.',
    button1Copy: state.content.get('get-help_ingredients_pagecontent_button1copy')
    || 'back',
    button2Copy: state.content.get('get-help_ingredients_pagecontent_button2copy')
    || 'done',
  }
})

const IngredientsContainer = connect(mapStateToProps)(Ingredients)

export {
  IngredientsContainer
}
