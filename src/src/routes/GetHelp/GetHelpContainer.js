import { connect } from 'react-redux'
import { storeGetHelpOrderId, validateLatestOrder } from 'actions/getHelp'
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
    || error.get(actionTypes.GET_HELP_VALIDATE_ORDER)

  return validState(errorRequest) ? errorRequest : null
}

const getPending = ({ pending }) => {
  const pendingRequest = pending.get(actionTypes.RECIPES_RECEIVE)
    || pending.get(actionTypes.USER_LOAD_ORDERS)
    || pending.get(actionTypes.GET_HELP_VALIDATE_ORDER)

  return validState(pendingRequest) ? pendingRequest : true
}

const skipErrorByRoute = ({ pathname }) => ([
  `${routes.getHelp.index}/${routes.getHelp.contact}`,
  `${routes.getHelp.index}/${routes.getHelp.confirmation}`,
].includes(pathname))

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps

  const order = state.getHelp.get('order').toJS()

  const error = getError(state)

  const pending = getPending(state)

  const skipErrorPage = skipErrorByRoute(location)

  const orderId = (location && location.query && location.query.orderId)
    ? location.query.orderId
    : (order.id || '')

  const didRequestError = (skipErrorPage)
    ? false
    : (!orderId || error !== null)

  const isRequestPending = (!orderId || skipErrorPage)
    ? false
    : pending

  return {
    didRequestError,
    isRequestPending,
    orderId,
    order,
    location: ownProps.location,
    content: getContent(state),
    user: {
      id: state.user.get('id'),
      accessToken: state.auth.get('accessToken'),
    },
  }
}

const GetHelpContainer = connect(mapStateToProps, {
  storeGetHelpOrderId,
  validateLatestOrder,
  userLoadOrder: userActions.userLoadOrder,
  recipesLoadRecipesById: recipeActions.recipesLoadRecipesById,
})(GetHelp)

export default GetHelpContainer
