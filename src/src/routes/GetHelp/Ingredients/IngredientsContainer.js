import { connect } from 'react-redux'
import {
  validateSelectedIngredients,
  storeSelectedIngredients,
} from 'actions/getHelp'
import { getOrderValidationPendingState, getIsOrderValidationError } from 'selectors/getHelp'
import {
  trackDeselectIngredient,
  trackSelectIngredient,
  validateLatestOrder,
} from '../actions/getHelp'
import { getIneligibleIngredientUuids } from '../selectors/selectors'
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
  ineligibleIngredientUuids: getIneligibleIngredientUuids(state),
  isOrderValidationError: getIsOrderValidationError(state),
  isValidateOrderLoading: getOrderValidationPendingState(state),
  order: state.getHelp.get('order').toJS(),
  recipes: state.getHelp.get('recipes').toJS(),
  user: {
    id: state.user.get('id'),
    accessToken: state.auth.get('accessToken'),
  },
})

const IngredientsContainer = connect(mapStateToProps, {
  storeSelectedIngredients,
  trackDeselectIngredient,
  trackSelectIngredient,
  validateLatestOrder,
  validateSelectedIngredients,
})(Ingredients)

export {
  IngredientsContainer
}
