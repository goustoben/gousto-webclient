import { connect } from 'react-redux'
import {
  loadOrderById,
  loadRecipesById,
  storeGetHelpOrderId,
  validateLatestOrder
} from 'actions/getHelp'
import { client as routes } from 'config/routes'
import { actionTypes } from 'actions/actionTypes'
import { GetHelp } from './GetHelp'

const getContent = ({ content }) => ({
  title: content.get('get-help_default_pageheader_header')
    || 'Get help with your box',
  errorBody: content.get('get-help_default_pagecontent_errorbody')
    || 'There was a problem in getting your order information. Please contact us below, or try again later.',
  button1: content.get('get-help_default_pagecontent_button1')
    || 'Contact Us',
})

const getError = ({ error }) => {
  const errorRequest = error.get(actionTypes.RECIPES_RECEIVE, null)
    || error.get(actionTypes.GET_HELP_LOAD_ORDERS_BY_ID, null)

  return errorRequest
}

const getPending = ({ pending }) => {
  const pendingRequest = pending.get(actionTypes.RECIPES_RECEIVE, false)
    || pending.get(actionTypes.GET_HELP_LOAD_ORDERS_BY_ID, false)

  return pendingRequest
}

const skipErrorByRoute = ({ pathname }) => ([
  `${routes.getHelp.index}/${routes.getHelp.contact}`,
  `${routes.getHelp.index}/${routes.getHelp.confirmation}`,
  `${routes.getHelp.index}/${routes.getHelp.delivery}`,
  `${routes.getHelp.index}/${routes.getHelp.eligibilityCheck}`,
  `${routes.getHelp.index}/${routes.getHelp.eligibilityCheck}/${routes.getHelp.ingredientIssues}`,
  `${routes.getHelp.index}/${routes.getHelp.delivery}/${routes.getHelp.dontKnowWhen}`,
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
  loadOrderById,
  loadRecipesById,
})(GetHelp)

export {
  GetHelpContainer
}
