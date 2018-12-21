import { connect } from 'react-redux'

import {
  fetchIngredientIssues,
  storeSelectedIngredientIssue,
  trackIngredientIssues
} from 'actions/getHelp'
import { IngredientIssues } from './IngredientIssues.logic'

const mapStateToProps = (state) => {
  const { getHelp } = state
  const ingredients = getHelp.get('selectedIngredients').toJS()
  const issues = getHelp.get('ingredientIssues').toJS()
  const subIssues = getHelp.get('ingredientSubIssues').toJS()
  const selectedIngredients = getHelp.get('selectedIngredients').toJS()

  return {
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
    ingredients,
    issues,
    subIssues,
    selectedIngredients,
  }
}

const IngredientIssuesContainer = connect(mapStateToProps, {
  fetchIngredientIssues,
  storeSelectedIngredientIssue,
  trackIngredientIssues,
})(IngredientIssues)

export {
  IngredientIssuesContainer
}
