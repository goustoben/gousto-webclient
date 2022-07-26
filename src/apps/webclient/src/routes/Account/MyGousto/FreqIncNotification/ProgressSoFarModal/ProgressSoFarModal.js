import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Overlay from 'Overlay'
import moment from 'moment'
import {CTA, Modal, ModalHeader} from 'goustouicomponents'
import {ProgressSoFar} from 'PrgogressSoFar/ProgressSoFar'
import css from './ProgressSoFarModal.css'

export const ProgressSoFarModal = ({ isOpen, toggleModal, frequencyProgress }) => {
  const { target, progress, promotionAmount, endOfSecondMonth } = frequencyProgress?.toJS() || {}
  const endOfSecondMonthFormatted = moment(endOfSecondMonth, "YYYY-MM-DD").format("Do MMMM YYYY")

  return (
    <Overlay open={isOpen} from="top">
      <div className={css.disableScroll}>
        <Modal
          name="progress-so-far"
          description="Frequency Incentivisation modal window"
          isOpen={isOpen}
          handleClose={toggleModal()}
          variant="floating"
          animated
        >
          <div className={css.progressSoFarWrapper}>
            <ProgressSoFar total={target} completed={progress} discount={promotionAmount} />
          </div>

          <div className={css.modalContent}>
            <h3>Fancy {promotionAmount} off for a month?</h3>
            <p>
              <span className={css.bold}>Order {target - progress} boxes</span> before {endOfSecondMonthFormatted} and we’ll give you
              <span className={css.bold}> {promotionAmount} off all your boxes </span>
              that are delivered the following month.
            </p>
            <CTA variant="primary" onClick={toggleModal()} isFullWidth size="big">Done</CTA>
          </div>
        </Modal>
      </div>
    </Overlay>
  )
}

ProgressSoFarModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  frequencyProgress: PropTypes.instanceOf(Immutable.Map)
}

ProgressSoFarModal.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
  frequencyProgress: Immutable.Map()
}
