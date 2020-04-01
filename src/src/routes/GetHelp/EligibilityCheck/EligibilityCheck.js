import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { browserHistory } from 'react-router'
import { client as clientRoutes } from 'config/routes'
import { redirect } from 'utils/window'
import {
  findNewestOrder,
  isOrderEligibleForSelfRefundResolution
} from 'utils/order'
import { addUserIdToHelpUrl } from 'utils/url'
import Loading from 'Loading'
import css from './EligibilityCheck.css'

const propTypes = {
  getUserOrders: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
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
  storeGetHelpOrderId: PropTypes.func.isRequired,
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
    const { isAuthenticated, userId, orders, storeGetHelpOrderId } = this.props
    const newestOrder = findNewestOrder(orders, false)
    const isOrderEligible = isOrderEligibleForSelfRefundResolution(newestOrder)

    if (isOrderEligible) {
      storeGetHelpOrderId(newestOrder.get('id'))
      browserHistory.push(`${clientRoutes.getHelp.index}?orderId=${newestOrder.get('id')}`)
    } else {
      redirect(
        addUserIdToHelpUrl(isAuthenticated, userId)
      )
    }
  }

  render() {
    return (
      <div className={css.loading__container}>
        <div className={css.loading__item}>
          <Loading className={css.loading__image} />
        </div>
      </div>
    )
  }
}

EligibilityCheck.defaultProps = defaultProps
EligibilityCheck.propTypes = propTypes

export {
  EligibilityCheck
}
