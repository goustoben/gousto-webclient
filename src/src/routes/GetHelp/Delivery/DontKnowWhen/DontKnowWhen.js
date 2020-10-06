import React, { PureComponent } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import moment from 'moment'
import { client } from 'config/routes'
import { LoadingWrapper } from '../../LoadingWrapper'
import { Error } from '../../components/Error'
import { BeforeDeliveryDay } from './BeforeDeliveryDay'
import { OnDeliveryDayWithTracking } from './OnDeliveryDayWithTracking'
import { OnDeliveryDayWithoutTracking } from './OnDeliveryDayWithoutTracking'

class DontKnowWhen extends PureComponent {
  static compareTodayToDeliveryDate(deliveryDate) {
    const precision = 'day'
    if (moment(new Date()).isBefore(deliveryDate, precision)) {
      return 'before'
    }

    if (moment(new Date()).isSame(deliveryDate, precision)) {
      return 'on'
    }

    return 'after'
  }

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
      const whenString = DontKnowWhen.compareTodayToDeliveryDate(deliveryDate)
      switch (whenString) {
      case 'before':
        return <BeforeDeliveryDay />
      case 'on':
        if (trackingUrl) {
          return (
            <OnDeliveryDayWithTracking
              deliverySlot={deliverySlot}
              trackMyBoxLink={trackingUrl}
            />
          )
        }

        return <OnDeliveryDayWithoutTracking deliverySlot={deliverySlot} />
      default:
        browserHistory.push(
          deliveryDidntArriveValidation({ orderId, userId })
        )
      }
    }

    return <div />
  }
}

DontKnowWhen.propTypes = {
  accessToken: PropTypes.string.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  deliverySlot: PropTypes.shape({
    deliveryStart: PropTypes.string.isRequired,
    deliveryEnd: PropTypes.string.isRequired,
  }).isRequired,
  isLoadOrderError: PropTypes.bool,
  isOrderLoading: PropTypes.bool,
  isTrackingUrlLoading: PropTypes.bool,
  loadOrderById: PropTypes.func.isRequired,
  loadTrackingUrl: PropTypes.func.isRequired,
  params: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  trackingUrl: PropTypes.string.isRequired,
}

DontKnowWhen.defaultProps = {
  isLoadOrderError: false,
  isOrderLoading: false,
  isTrackingUrlLoading: false,
}

export {
  DontKnowWhen
}
