import React from 'react'
import PropTypes from 'prop-types'
import Overlay from 'Overlay'
import {CTA, Modal, ModalHeader} from 'goustouicomponents'
import css from './ProgressSoFarModal.css'
import {click3dsUpdateInfo} from "actions/trackingKeys";
import {ProgressSoFar} from "PrgogressSoFar/ProgressSoFar";

export const ProgressSoFarModal = ({ isOpen, toggleModal }) => {
  const cells = [['filled'],['filled'],[],[],[],[],['selected']];

  return (
    <Overlay open={isOpen} from="top">
      <div className={css.disableScroll}>
        <Modal
          name="progress-so-far"
          description="Frequency Incentivisation modal window"
          isOpen={isOpen}
          handleClose={toggleModal()}
          variant="floating"
          animated={true}
        >

          <div className={css.progressSoFarWrapper}>
            <ProgressSoFar />
          </div>

          <div className={css.modalContent}>
            <h3>Fancy 10% off for a month?</h3>
            <p>
              <span className={css.bold}>Order 4 boxes</span> before [end_date] and we’ll give you
              <span className={css.bold}>10% off all your boxes</span>
              that are delivered the following month.
            </p>
            <CTA variant="primary" isFullWidth size="big">Done</CTA>
          </div>
        </Modal>
      </div>
    </Overlay>
  )
}

ProgressSoFarModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
}

ProgressSoFarModal.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
}
