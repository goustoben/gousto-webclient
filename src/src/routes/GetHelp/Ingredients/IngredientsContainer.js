import { connect } from 'react-redux'
import {
  validateLatestOrder,
  validateSelectedIngredients,
  storeSelectedIngredients,
  trackUserCannotGetCompensation,
} from 'actions/getHelp'
import { getOrderValidationPendingState, getDaysSinceLastCompensation } from 'selectors/getHelp'
import { Ingredients } from './Ingredients.logic'

const mapStateToProps = (state) => ({
  content: {
    title: state.content.get('get-help_contact_pageheader_header')
      || 'Get help with your box',
    body: state.content.get('get-help_contact_pagecontent_copy')
      || 'Which ingredient(s) had an issue? Select meal to see ingredients.',
    button1Copy: state.content.get('get-help_orderissues_pagecontent_button1copy')
      || 'Continue',
  },
  daysSinceLastCompensation: getDaysSinceLastCompensation(state),
  isValidateOrderLoading: getOrderValidationPendingState(state),
  order: state.getHelp.get('order').toJS(),
  recipes: state.getHelp.get('recipes').toJS(),
  user: {
    id: state.user.get('id'),
    accessToken: state.auth.get('accessToken'),
  },
})

const IngredientsContainer = connect(mapStateToProps, {
  validateLatestOrder,
  storeSelectedIngredients,
  validateSelectedIngredients,
  trackUserCannotGetCompensation,
})(Ingredients)

export {
  IngredientsContainer
}
