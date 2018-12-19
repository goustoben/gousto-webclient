import { connect } from 'react-redux'

import { fetchIngredientIssues, storeSelectedIngredientIssue } from 'actions/getHelp'
import { IngredientIssues } from './IngredientIssues.logic'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_ingredientissues_pageheader_header')
    || 'Get help with your box',
    body: state.content.get('get-help_ingredientissues_pagecontent_copy')
    || 'Please let us know what was wrong with the ingredient(s)',
    button1Copy: state.content.get('get-help_ingredientissues_pagecontent_button1copy')
    || 'back',
    button2Copy: state.content.get('get-help_ingredientissues_pagecontent_button2copy')
    || 'continue',
  },
  ingredients: state.getHelp.get('selectedIngredients').toJS(),
  issues: state.getHelp.get('ingredientIssues').toJS(),
  subIssues: state.getHelp.get('ingredientSubIssues').toJS(),
})

const IngredientIssuesContainer = connect(mapStateToProps, {
  fetchIngredientIssues,
  storeSelectedIngredientIssue,
})(IngredientIssues)

export {
  IngredientIssuesContainer
}
