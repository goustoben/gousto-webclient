import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { MultiSkipScreen } from './MultiSkipScreen'
import { MultiSkipResultScreen } from './MultiSkipResultScreen'

export const MultiSkipScreenLogic = ({
  handleContinueToPause,
  trackContinueToPause,
  handleSkipBoxes,
  newOrders,
  closeModal,
  alreadySkippedBoxesCount,
  nextDeliveryDate,
  isMultiSkipSuccess,
  isMultiSkipError,
  multiSkippedBoxesCount,
  trackViewMultiSkip,
  userId,
}) => {
  const [selectedOrderIds, setSelectedOrderIds] = useState([])
  const [isSkipBoxesClicked, setSkipBoxesClicked] = useState(false)

  useEffect(trackViewMultiSkip, [trackViewMultiSkip])

  const toggleSkipBox = (id, shouldSkip) => {
    setSelectedOrderIds(shouldSkip
      ? [...selectedOrderIds, id]
      : selectedOrderIds.filter(orderId => id !== orderId))
  }

  const handleContinueToPauseWithTracking = () => {
    trackContinueToPause()
    handleContinueToPause()
  }

  const selectedOrders = newOrders.filter(({ id }) => selectedOrderIds.includes(id))

  const skipBoxes = () => {
    setSkipBoxesClicked(true)
    handleSkipBoxes({ selectedOrders }, userId)
  }

  const isSkipBoxesDisabled = !selectedOrderIds.length || isSkipBoxesClicked

  return isMultiSkipSuccess || isMultiSkipError
    ? (
      <MultiSkipResultScreen
        closeModal={closeModal}
        nextDeliveryDate={nextDeliveryDate}
        isSuccess={isMultiSkipSuccess}
        skippedBoxesCount={multiSkippedBoxesCount}
      />
    )
    : (
      <MultiSkipScreen
        alreadySkippedBoxesCount={alreadySkippedBoxesCount}
        closeModal={closeModal}
        handleContinueToPause={handleContinueToPauseWithTracking}
        handleSkipBoxes={skipBoxes}
        isSkipBoxesDisabled={isSkipBoxesDisabled}
        newOrders={newOrders}
        toggleSkipBox={toggleSkipBox}
      />
    )
}

const newOrderShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  isProjected: PropTypes.bool.isRequired,
  canSkip: PropTypes.bool.isRequired,
  deliveryDay: PropTypes.string.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  deliveryDayId: PropTypes.string.isRequired
})

MultiSkipScreenLogic.propTypes = {
  newOrders: PropTypes.arrayOf(newOrderShape).isRequired,
  handleSkipBoxes: PropTypes.func.isRequired,
  handleContinueToPause: PropTypes.func.isRequired,
  trackContinueToPause: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  alreadySkippedBoxesCount: PropTypes.number.isRequired,
  nextDeliveryDate: PropTypes.string,
  isMultiSkipSuccess: PropTypes.bool.isRequired,
  isMultiSkipError: PropTypes.bool.isRequired,
  multiSkippedBoxesCount: PropTypes.number,
  trackViewMultiSkip: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

MultiSkipScreenLogic.defaultProps = {
  multiSkippedBoxesCount: null,
  nextDeliveryDate: null,
}
