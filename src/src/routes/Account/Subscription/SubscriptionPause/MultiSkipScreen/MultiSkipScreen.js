import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Modal, ModalHeader, CTA, InputCheck } from 'goustouicomponents'

import css from './MultiSkipScreen.css'

export const MultiSkipScreen = ({
  handleContinueToPause,
  trackContinueToPause,
  handleSkipBoxes,
  newOrders,
  closeModal,
  alreadySkippedBoxesCount
}) => {
  const [selectedOrderIds, setSelectedOrderIds] = useState([])
  const [isSkipBoxesClicked, setSkipBoxesClicked] = useState(false)

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
    handleSkipBoxes({ selectedOrders })
  }

  const isSkipBoxesDisabled = !selectedOrderIds.length || isSkipBoxesClicked

  return (
    <Modal
      isOpen
      name="multi-skip"
      description="Skip multiple boxes"
      handleClose={closeModal}
      variant="floating"
      animated={false}
    >
      <div className={css.headerWrapper}>
        <ModalHeader
          withSeparator
          align="left"
        >
          Taking a short break?
        </ModalHeader>
      </div>

      <div className={css.container}>
        <p className={classnames({ [css.noSkippedBoxesText]: !alreadySkippedBoxesCount })}>
          Skip the boxes you don’t want to be delivered.
        </p>
        {!!alreadySkippedBoxesCount && (
          <p data-testing="multi-skip-subheading" className={css.skippedBoxesText}>
            You&apos;ve already skipped
            {' '}
            <strong>{alreadySkippedBoxesCount}</strong>
            {' '}
            {`box${alreadySkippedBoxesCount > 1 ? 'es' : ''}`}
          </p>
        )}
        <div className={css.tileContainer}>
          {newOrders.map(({ id, canSkip, deliveryDate }) => (
            <InputCheck
              key={id}
              id={id}
              label={deliveryDate}
              disabled={!canSkip}
              type="tile"
              onChange={toggleSkipBox}
            />
          ))}
        </div>

        <div className={css.ctaContainer}>
          <div className={css.skipBoxesCTA}>
            <CTA
              variant="primary"
              onClick={skipBoxes}
              isDisabled={isSkipBoxesDisabled}
              isFullWidth
            >
              Skip boxes
            </CTA>
          </div>
          <div className={css.continueToPauseCTA}>
            <CTA
              variant="secondary"
              onClick={handleContinueToPauseWithTracking}
              isFullWidth
            >
              Continue to pause
            </CTA>

          </div>
        </div>
      </div>
    </Modal>
  )
}

const newOrderShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  isProjected: PropTypes.bool.isRequired,
  canSkip: PropTypes.bool.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  deliveryDayId: PropTypes.string.isRequired
})

MultiSkipScreen.propTypes = {
  newOrders: PropTypes.arrayOf(newOrderShape).isRequired,
  handleSkipBoxes: PropTypes.func.isRequired,
  handleContinueToPause: PropTypes.func.isRequired,
  trackContinueToPause: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  alreadySkippedBoxesCount: PropTypes.number.isRequired
}
