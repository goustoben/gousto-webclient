import { connect } from 'react-redux'
import { storeGetHelpOrderId } from 'actions/getHelp'
import userActions from 'actions/user'
import recipeActions from 'actions/recipes'
import actionTypes from 'actions/actionTypes'
import GetHelp from './GetHelp'

const mapStateToProps = (state, ownProps) => {
  const error = state.error.get(actionTypes.RECIPES_RECEIVE)
    || state.error.get(actionTypes.USER_LOAD_ORDERS)
  const isRequestPending = state.pending.get(actionTypes.RECIPES_RECEIVE)
    || state.pending.get(actionTypes.USER_LOAD_ORDERS)
  const content = {
    title: state.content.get('get-help_default_pageheader_header')
      || 'Get help with your box',
    errorBody: state.content.get('get-help_default_pagecontent_errorbody')
      || 'There was a problem in getting your default. Please contact us below, or try again later.',
    button1: state.content.get('get-help_default_pagecontent_button1')
      || 'Contact Us',
  }

  return {
    didRequestError: error !== null,
    isRequestPending,
    location: ownProps.location,
    order: state.getHelp.get('order').toJS(),
    content,
  }
}

const GetHelpContainer = connect(mapStateToProps, {
  storeGetHelpOrderId,
  userLoadOrder: userActions.userLoadOrder,
  recipesLoadRecipesById: recipeActions.recipesLoadRecipesById,
})(GetHelp)

export default GetHelpContainer
