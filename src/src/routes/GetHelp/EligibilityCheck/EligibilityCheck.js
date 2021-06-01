import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { browserHistory } from 'react-router'
import { client as clientRoutes, zendesk } from 'config/routes'
import { redirect } from 'utils/window'
import {
  findNewestOrder,
  isOrderEligibleForSelfRefundResolution
} from 'utils/order'
import { addUserIdToUrl } from 'utils/url'
import { LoadingWrapper } from '../LoadingWrapper'

const propTypes = {
  getUserOrders: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loadOrderAndRecipesByIds: PropTypes.func.isRequired,
  orders: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.mapContains({
      id: PropTypes.string,
      deliverySlot: PropTypes.shape({
        deliveryEnd: PropTypes.string,
        deliveryStart: PropTypes.string,
      }),
      deliveryDate: PropTypes.string,
    })
  ),
  userId: PropTypes.string.isRequired,
  storeGetHelpOrder: PropTypes.func.isRequired,
}

const defaultProps = {
  orders: Immutable.Map(),
}

class EligibilityCheck extends PureComponent {
  componentDidMount() {
    const { isAuthenticated, orders, getUserOrders } = this.props

    if (isAuthenticated && orders.size < 1) {
      getUserOrders()
    } else {
      this.checkOrderAndRedirect()
    }
  }

  componentDidUpdate() {
    this.checkOrderAndRedirect()
  }

  checkOrderAndRedirect = () => {
    const { loadOrderAndRecipesByIds, orders, storeGetHelpOrder, userId } = this.props
    const newestOrder = findNewestOrder(orders, false)
    const isOrderEligible = isOrderEligibleForSelfRefundResolution(newestOrder)
    if (isOrderEligible) {
      const orderId = newestOrder.get('id')
      storeGetHelpOrder({
        id: orderId,
        recipeIds: newestOrder.get('recipeIds'),
        recipeDetailedItems: newestOrder.get('recipeDetailedItems'),
        deliverySlot: newestOrder.get('deliverySlot'),
        deliveryDate: newestOrder.get('deliveryDate'),
      })
      loadOrderAndRecipesByIds(orderId)
      browserHistory.push(`${clientRoutes.getHelp.index}?orderId=${orderId}`)
    } else {
      redirect(
        addUserIdToUrl(zendesk.faqs, userId)
      )
    }
  }

  render() {
    return (
      <LoadingWrapper />
    )
  }
}

EligibilityCheck.defaultProps = defaultProps
EligibilityCheck.propTypes = propTypes

export {
  EligibilityCheck
}
