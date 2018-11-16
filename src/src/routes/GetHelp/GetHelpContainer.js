import { connect } from 'react-redux'
import { storeGetHelpOrderId } from 'actions/getHelp'
import { client as routes } from 'config/routes'
import userActions from 'actions/user'
import recipeActions from 'actions/recipes'
import actionTypes from 'actions/actionTypes'
import GetHelp from './GetHelp'

const getContent = ({ content }) => ({
  title: content.get('get-help_default_pageheader_header')
    || 'Get help with your box',
  errorBody: content.get('get-help_default_pagecontent_errorbody')
    || 'There was a problem in getting your default. Please contact us below, or try again later.',
  button1: content.get('get-help_default_pagecontent_button1')
    || 'Contact Us',
})

const validState = (state) => (typeof state !== 'undefined')

const getError = ({ error }) => {
  const errorRequest = error.get(actionTypes.RECIPES_RECEIVE)
    || error.get(actionTypes.USER_LOAD_ORDERS)

  return validState(errorRequest) ? errorRequest : null
}

const getPending = ({ pending }) => {
  const pendingRequest = pending.get(actionTypes.RECIPES_RECEIVE)
    || pending.get(actionTypes.USER_LOAD_ORDERS)

  return validState(pendingRequest) ? pendingRequest : true
}

const skipErrorByRoute = ({ pathname }) => ([
  `${routes.getHelp.index}/${routes.getHelp.contact}`,
  `${routes.getHelp.index}/${routes.getHelp.confirmation}`,
].includes(pathname))

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps

  const error = getError(state)

  const pending = getPending(state)

  const skipErrorPage = skipErrorByRoute(location)

  const orderId = (location && location.query && location.query.orderId)
    ? location.query.orderId
    : ''

  const didRequestError = (skipErrorPage)
    ? false
    : (!orderId || error)

  const isRequestPending = (!orderId || skipErrorPage)
    ? false
    : pending

  return {
    didRequestError,
    isRequestPending,
    orderId,
    location: ownProps.location,
    order: state.getHelp.get('order').toJS(),
    content: getContent(state),
  }
}

const GetHelpContainer = connect(mapStateToProps, {
  storeGetHelpOrderId,
  userLoadOrder: userActions.userLoadOrder,
  recipesLoadRecipesById: recipeActions.recipesLoadRecipesById,
})(GetHelp)

export default GetHelpContainer
