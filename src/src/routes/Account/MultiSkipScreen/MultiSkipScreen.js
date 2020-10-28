import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Modal, ModalHeader, CTA, InputCheck } from 'goustouicomponents'

import css from './MultiSkipScreen.css'
import cssCommon from './MultiSkip.common.css'

export const MultiSkipScreen = ({
  alreadySkippedBoxesCount,
  closeModal,
  handleContinueToPause,
  isSkipBoxesDisabled,
  newOrders,
  handleSkipBoxes,
  toggleSkipBox
}) => (
  <Modal
    isOpen
    name="multi-skip"
    description="Skip multiple boxes"
    handleClose={closeModal}
    variant="floating"
    animated={false}
  >
    <div className={cssCommon.headerWrapper}>
      <ModalHeader
        withSeparator
        align="left"
      >
        Taking a short break?
      </ModalHeader>
    </div>

    <div className={cssCommon.container}>
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
            onClick={handleSkipBoxes}
            isDisabled={isSkipBoxesDisabled}
            isFullWidth
            testingSelector="multi-skip-skip-boxes"
          >
            Skip boxes
          </CTA>
        </div>
        <div className={css.continueToPauseCTA}>
          <CTA
            variant="secondary"
            onClick={handleContinueToPause}
            isFullWidth
            testingSelector="multi-skip-continue-to-pause"
          >
            Continue to pause
          </CTA>
        </div>
      </div>
    </div>
  </Modal>
)

const newOrderShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  isProjected: PropTypes.bool.isRequired,
  canSkip: PropTypes.bool.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  deliveryDayId: PropTypes.string.isRequired
})

MultiSkipScreen.propTypes = {
  alreadySkippedBoxesCount: PropTypes.number.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleContinueToPause: PropTypes.func.isRequired,
  isSkipBoxesDisabled: PropTypes.bool.isRequired,
  newOrders: PropTypes.arrayOf(newOrderShape).isRequired,
  handleSkipBoxes: PropTypes.func.isRequired,
  toggleSkipBox: PropTypes.func.isRequired,
}
