import React from 'react'
import PropTypes from 'prop-types'

import { Modal, ModalHeader, CTA } from 'goustouicomponents'

import css from './MultiSkipResultScreen.css'
import cssCommon from '../MultiSkip.common.css'

const SuccessMsg = ({ skippedBoxesCount }) => (
  <p data-testing="multi-skip-success-message">
    You&apos;ve skipped
    {' '}
    <strong>
      {skippedBoxesCount}
      {' '}
      {`delivery day${skippedBoxesCount > 1 ? 's' : ''}`}
      .
    </strong>
  </p>
)

const NextDeliveryMsg = ({ date }) => (
  <p
    data-testing="multi-skip-next-delivery-message"
    className={css.nextDelivery}
  >
    We&apos;ll deliver your next box on
    {' '}
    <strong>
      {date}
      .
    </strong>
  </p>
)

const FailureMsg = () => (
  <p data-testing="multi-skip-failure-message">
    Sorry about that. Please try again.
  </p>
)

export const MultiSkipResultScreen = ({
  closeModal,
  nextDeliveryDate,
  isSuccess,
  skippedBoxesCount,
}) => (
  <Modal
    isOpen
    name="multi-skip"
    description="Skip multiple boxes"
    variant="floating"
    animated={false}
    hideCloseIcon
  >
    <div className={cssCommon.headerWrapper}>
      <ModalHeader
        withSeparator
        align="left"
      >
        {isSuccess
          ? 'Skip successful'
          : 'Oops, something went wrong'}
      </ModalHeader>
    </div>

    <div className={cssCommon.container}>
      {isSuccess
        ? <SuccessMsg skippedBoxesCount={skippedBoxesCount} />
        : <FailureMsg />}

      {isSuccess && nextDeliveryDate && <NextDeliveryMsg date={nextDeliveryDate} />}

      <div className={css.ctaContainer}>
        <CTA
          variant="primary"
          onClick={closeModal}
          isFullWidth
          testingSelector="multi-skip-result-cta"
        >
          Done
        </CTA>
      </div>
    </div>
  </Modal>
)

SuccessMsg.propTypes = {
  skippedBoxesCount: PropTypes.number.isRequired
}

NextDeliveryMsg.propTypes = {
  date: PropTypes.string.isRequired
}

MultiSkipResultScreen.propTypes = {
  closeModal: PropTypes.func.isRequired,
  nextDeliveryDate: PropTypes.string,
  isSuccess: PropTypes.bool.isRequired,
  skippedBoxesCount: PropTypes.number,
}

MultiSkipResultScreen.defaultProps = {
  skippedBoxesCount: null,
  nextDeliveryDate: null
}
