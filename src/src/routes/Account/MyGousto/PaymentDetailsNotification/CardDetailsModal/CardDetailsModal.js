import React from 'react'
import PropTypes from 'prop-types'
import Overlay from 'Overlay'
import { Modal, ModalHeader } from 'goustouicomponents'
import { click3dsModalClose } from 'actions/trackingKeys'
import css from './CardDetailsModal.module.css'

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
            We need you to
            {' '}
            <span className={css.bold}>re-enter your current card details due</span>
            {' '}
            to a European regulation for electronic payment services, called Payments Service Directive 2 (PSD2) .
          </p>
          <p>PSD2 is an evolution of existing regulation for payments and enhances customer protection and security.</p>
          <p>
            You may see a small charge to confirm your card, however your
            {' '}
            <span className={css.bold}>bank will refund it back within 10 working days</span>
            .
          </p>
          <p>
            You have to
            {' '}
            <span className={css.bold}>re-enter your card details before 14 September 2021</span>
            , otherwise we may be unable to take payment and send your Gousto box. You only have to do this once.
          </p>
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
