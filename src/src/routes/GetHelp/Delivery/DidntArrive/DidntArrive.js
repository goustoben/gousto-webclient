import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { client } from 'config/routes'
import { LoadingWrapper } from '../../LoadingWrapper'
import { Error } from '../../components/Error'
import { compareTodayToDeliveryDate } from '../../utils/time'
import { BeforeDeliveryDay } from './BeforeDeliveryDay'
import { OnDeliveryDayWithTracking } from './OnDeliveryDayWithTracking'
import { OnDeliveryDayWithoutTracking } from './OnDeliveryDayWithoutTracking'

class DidntArrive extends PureComponent {
  componentDidMount() {
    const {
      accessToken,
      deliveryDate,
      loadOrderById,
      loadTrackingUrl,
      params: { orderId },
      trackingUrl,
    } = this.props

    if (!deliveryDate) {
      loadOrderById({ accessToken, orderId })
    }

    if (!trackingUrl) {
      loadTrackingUrl(orderId)
    }
  }

  render() {
    const {
      deliveryDate,
      deliverySlot,
      isLoadOrderError,
      isOrderLoading,
      isTrackingUrlLoading,
      params: {
        orderId,
        userId,
      },
      trackingUrl,
    } = this.props
    const { deliveryDidntArriveValidation } = client.getHelp

    if (isLoadOrderError) {
      return <Error />
    }

    if (isOrderLoading || isTrackingUrlLoading) {
      return <LoadingWrapper />
    }

    if (deliveryDate) {
      const whenString = compareTodayToDeliveryDate(deliveryDate)
      switch (whenString) {
      case 'before':
        return <BeforeDeliveryDay />
      case 'on':
        return trackingUrl ? (
          <OnDeliveryDayWithTracking
            deliverySlot={deliverySlot}
            trackMyBoxLink={trackingUrl}
          />
        ) : (
          <OnDeliveryDayWithoutTracking deliverySlot={deliverySlot} />
        )
      default:
        browserHistory.push(
          deliveryDidntArriveValidation({ orderId, userId })
        )
      }
    }

    return <div />
  }
}

DidntArrive.propTypes = {
  accessToken: PropTypes.string.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  deliverySlot: PropTypes.shape({
    deliveryStart: PropTypes.string.isRequired,
    deliveryEnd: PropTypes.string.isRequired,
  }).isRequired,
  isLoadOrderError: PropTypes.bool.isRequired,
  isOrderLoading: PropTypes.bool.isRequired,
  isTrackingUrlLoading: PropTypes.bool.isRequired,
  loadOrderById: PropTypes.func.isRequired,
  loadTrackingUrl: PropTypes.func.isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  trackingUrl: PropTypes.string.isRequired,
}

export {
  DidntArrive
}
