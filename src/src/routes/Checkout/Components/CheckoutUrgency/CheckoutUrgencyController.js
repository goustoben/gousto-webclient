import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { checkoutUrgencyStatuses } from 'routes/Checkout/checkoutUrgencyConfig'
import { useInterval } from 'react-use'
import {
  checkoutUrgencyInitialModalDisplayed,
  checkoutUrgencyExpiredModalDisplayed,
} from 'actions/trackingKeys'
import { CheckoutUrgencyContext } from './CheckoutUrgencyContext'

export const CheckoutUrgencyController = ({
  currentStatus,
  checkoutUrgencySetCurrentStatus,
  startSeconds,
  modalSeconds,
  submitting,
  children,
  trackCheckoutUrgencyAction,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(null)

  useEffect(() => {
    if (currentStatus === 'running') {
      setRemainingSeconds(startSeconds)
    }
  }, [currentStatus, startSeconds, checkoutUrgencySetCurrentStatus])

  const handleTick = () => {
    const newValue = remainingSeconds - 1

    setRemainingSeconds(newValue)

    if (newValue === modalSeconds) {
      trackCheckoutUrgencyAction(checkoutUrgencyInitialModalDisplayed, {
        time_remaining: modalSeconds / 60,
      })
      checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.runningAndModalOpen)
    } else if (newValue === 0) {
      trackCheckoutUrgencyAction(checkoutUrgencyExpiredModalDisplayed)
      checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.finishedAndModalOpen)
    }
  }

  const isRunning =
    !submitting &&
    (currentStatus === checkoutUrgencyStatuses.running ||
      currentStatus === checkoutUrgencyStatuses.runningAndModalOpen)

  useInterval(handleTick, isRunning ? 1000 : null)

  return (
    <CheckoutUrgencyContext.Provider value={remainingSeconds}>
      {children}
    </CheckoutUrgencyContext.Provider>
  )
}

CheckoutUrgencyController.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  checkoutUrgencySetCurrentStatus: PropTypes.func.isRequired,
  startSeconds: PropTypes.number.isRequired,
  modalSeconds: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  submitting: PropTypes.bool,
  trackCheckoutUrgencyAction: PropTypes.func.isRequired,
}

CheckoutUrgencyController.defaultProps = {
  submitting: false,
}
