import React, { PureComponent } from 'react'

import actions from 'actions'
import PropTypes from 'prop-types'
import { ReactReduxContext } from 'react-redux'

import { actionTypes } from 'actions/actionTypes'
import { boxSummaryDeliveryDaysLoad } from 'actions/boxSummary'
import routesConfig from 'config/routes'
import { Checkout } from 'routes/Checkout/Checkout.tsx'
import { useBasket } from 'routes/Menu/domains/basket'
import { loadMenuServiceDataIfDeepLinked } from 'routes/Menu/fetchData/menuService'
import logger from 'utils/logger'
import { getPreviewOrderErrorName } from 'utils/order'

/**
 * Class container allowing static method fetchData to preload necessary info during SSR for Checkout.
 * Main purposes are:
 * - Preload delivery days.
 * - Preload preview order (previewOrderId is used for payment)
 */
class CheckoutFetchData extends PureComponent {
  static fetchData = async ({ store, addRecipe }) => {
    // defensive code to ensure menu load days works below for deeplinks
    await store.dispatch(loadMenuServiceDataIfDeepLinked(false, addRecipe))

    if (
      !store.getState().boxSummaryDeliveryDays ||
      (typeof store.getState().boxSummaryDeliveryDays === 'object' &&
        store.getState().boxSummaryDeliveryDays.size === 0)
    ) {
      await store.dispatch(actions.menuLoadDays())
      await store.dispatch(boxSummaryDeliveryDaysLoad())
    }

    try {
      await store.dispatch(actions.checkoutCreatePreviewOrder())
    } catch (e) {
      // error is handled below
    }

    // If the preview order didn't create successfully, then we redirect the user
    // back to the menu saying that he's basket is expired.
    const previewOrderError = store
      .getState()
      .error.get(actionTypes.BASKET_PREVIEW_ORDER_CHANGE, false)
    const errorName = getPreviewOrderErrorName(previewOrderError)

    if (previewOrderError || !store.getState().basket.get('previewOrderId')) {
      logger.warning(
        `Preview order id failed to create, persistent basket might be expired, error: ${errorName}`,
      )

      return store.dispatch(
        actions.redirect(`${routesConfig.client.menu}?from=newcheckout&error=${errorName}`, true),
      )
    }

    if (!store.getState().menuCutoffUntil) {
      await store.dispatch(actions.menuLoadDays())
    }

    return null
  }

  componentDidMount() {
    const { store } = this.context
    const { query = {}, params = {}, addRecipe } = this.props
    CheckoutFetchData.fetchData({ store, query, params, addRecipe })
  }

  /* eslint-disable react/jsx-props-no-spreading */
  render = () => <Checkout {...this.props} />
}

CheckoutFetchData.propTypes = {
  query: PropTypes.shape({
    steps: PropTypes.string,
  }),
  params: PropTypes.shape({
    stepName: PropTypes.string,
  }),
  addRecipe: PropTypes.func,
}

CheckoutFetchData.defaultProps = {
  query: {},
  params: {},
  addRecipe: () => {},
}

CheckoutFetchData.contextType = ReactReduxContext

/**
 * Function container allows use of React API that is allowed only within function. E.g.: hooks.
 */
const CheckoutFunctionContainer = (props) => {
  const { addRecipe } = useBasket()

  return <CheckoutFetchData {...props} addRecipe={addRecipe} />
}

export const CheckoutContainer = CheckoutFunctionContainer
