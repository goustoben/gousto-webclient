import React from 'react'
import PropTypes from 'prop-types'
import Overlay from 'Overlay'
import { Modal, ModalHeader } from 'goustouicomponents'
import { click3dsModalClose } from 'actions/trackingKeys'
import css from './CardDetailsModal.css'

export const CardDetailsModal = ({ isOpen, toggleModal }) => (
  <Overlay open={isOpen} from="top">
    <div className={css.disableScroll}>
      <Modal
        name="update-card-details"
        description="additional info about 3DS regulation"
        isOpen={isOpen}
        handleClose={toggleModal(click3dsModalClose)}
        variant="floating"
        animated={false}
      >
        <ModalHeader withSeparator align="left">Update card details</ModalHeader>
        <div className={css.modalContent}>
          <p>
            We need you to re-enter your current card details due to a European regulation for electronic payment services, called
            {' '}
            <span className={css.bold}>Payments Service Directive 2 (PSD2)</span>
            .
          </p>
          <p>PSD2 is an evolution of existing regulation for payments and enhances customer protection and security.</p>
          <p>
            In order to benefit from this, you need to
            {' '}
            <span className={css.bold}>re-enter your card details before 14 September 2021</span>
            .
          </p>
          <p>You only have to do this once. If you do not re-enter your card details by this date, we may be unable to take payment and send your Gousto box.</p>
        </div>
      </Modal>
    </div>
  </Overlay>
)

CardDetailsModal.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
}

CardDetailsModal.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
}
