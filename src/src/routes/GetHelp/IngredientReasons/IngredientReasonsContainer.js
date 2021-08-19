import { connect } from 'react-redux'
import { storeIngredientIssueDescriptions } from 'actions/getHelp'
import { trackIngredientReasonsConfirmed } from '../actions/getHelp'
import { IngredientReasons } from './IngredientReasons.logic'
import { getSelectedIngredients } from '../selectors/selectors'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_ingredientreasons_pageheader_header')
      || 'Get help with your box',
    body: state.content.get('get-help_ingredientreasons_pagecontent_copy')
      || 'Please tell us a bit more about your problem ingredients.',
    secondBody: state.content.get('get-help_ingredientreasons_pagecontent_aftercopy')
      || 'For example, please tell us how the damage ocurred, or the specific issue with the quality.',
    button1Copy: state.content.get('get-help_ingredientreasons_pagecontent_button1copy')
      || 'Submit details',
  },
  ingredientsAndIssues: getSelectedIngredients(state),
})

const IngredientReasonsContainer = connect(
  mapStateToProps, {
    trackIngredientReasonsConfirmed,
    storeIngredientIssueDescriptions,
  })(IngredientReasons)

export {
  IngredientReasonsContainer
}
