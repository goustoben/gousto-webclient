import { connect } from 'react-redux'
import { client as routes } from 'config/routes'
import { getUserId } from 'selectors/user'
import { getOrder } from './selectors/selectors'
import { actionTypes } from './actions/actionTypes'
import { GetHelp } from './GetHelp'
import { storeGetHelpOrderId } from "actions/getHelp/storeGetHelpOrderId"
import { loadOrderById } from "routes/GetHelp/actions/getHelp/loadOrderById"
import { loadOrderAndRecipesByIds } from "routes/GetHelp/actions/getHelp/loadOrderAndRecipesByIds"
import { validateLatestOrder } from "routes/GetHelp/actions/getHelp/validateLatestOrder"

const getContent = ({ content }) => ({
  title: content.get('get-help_default_pageheader_header')
    || 'Get help with your box',
  errorBody: content.get('get-help_default_pagecontent_errorbody')
    || 'There was a problem in getting your order information. Please contact us below, or try again later.',
  button1: content.get('get-help_default_pagecontent_button1')
    || 'Contact Us',
})

const skipErrorByRoute = ({ pathname, userId, orderId }) => {
  const {
    confirmation,
    contact,
    delivery,
    deliveryDidntArrive,
    deliveryDidntArriveValidation,
    deliveryDontKnowWhen,
    index,
  } = routes.getHelp

  const isPathnameInExceptionList = [
    `${index}/${contact}`,
    `${index}/${confirmation}`,
    delivery({ userId, orderId }),
    deliveryDidntArrive({ userId, orderId }),
    deliveryDidntArriveValidation({ userId, orderId }),
    deliveryDontKnowWhen({ userId, orderId }),
  ].includes(pathname)

  return isPathnameInExceptionList
}

const mapStateToProps = (state, ownProps) => {
  const { location, params } = ownProps

  const userId = getUserId(state)

  const order = getOrder(state)

  const error = state.error.get(actionTypes.GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS, null)

  const orderId = (location && location.query && location.query.orderId)
    ? location.query.orderId
    : (order.id || params.orderId || '')

  const skipErrorPage = skipErrorByRoute({ pathname: location.pathname, userId, orderId })

  const didRequestError = (skipErrorPage)
    ? false
    : (!orderId || error !== null)

  const isRequestPending = (!orderId || skipErrorPage)
    ? false
    : state.pending.get(actionTypes.GET_HELP_LOAD_ORDER_AND_RECIPES_BY_IDS, false)

  return {
    didRequestError,
    isRequestPending,
    orderId,
    order,
    location: ownProps.location,
    content: getContent(state),
    user: {
      id: userId,
      accessToken: state.auth.get('accessToken'),
    },
  }
}

const GetHelpContainer = connect(mapStateToProps, {
  storeGetHelpOrderId,
  validateLatestOrder,
  loadOrderById,
  loadOrderAndRecipesByIds,
})(GetHelp)

export {
  GetHelpContainer
}
