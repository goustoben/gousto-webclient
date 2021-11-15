import { connect } from 'react-redux'

import { IngredientIssues } from './IngredientIssues.logic'
import { getSelectedIngredients } from '../selectors/selectors'
import { trackIngredientIssues } from "actions/getHelp/trackIngredientIssues"
import { storeSelectedIngredientIssue } from "actions/getHelp/storeSelectedIngredientIssue"
import { fetchIngredientIssues } from "actions/getHelp/fetchIngredientIssues"

const mapStateToProps = (state) => {
  const { getHelp } = state
  const ingredients = getSelectedIngredients(state)
  const issues = getHelp.get('ingredientIssues').toJS()
  const subIssues = getHelp.get('ingredientSubIssues').toJS()

  return {
    content: {
      title: state.content.get('get-help_ingredientissues_pageheader_header')
      || 'Get help with your box',
      body: state.content.get('get-help_ingredientissues_pagecontent_copy')
      || 'Please let us know what was wrong with the ingredient(s)',
      button1Copy: state.content.get('get-help_ingredientissues_pagecontent_button1copy')
      || 'Continue',
    },
    ingredients,
    issues,
    subIssues,
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
