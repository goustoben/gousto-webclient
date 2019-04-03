import PropTypes from 'prop-types'
import React from 'react'
import Modal, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import css from './AgeVerification.css'

const AgeVerificationPopUp = ({isVisible, onClose, ageVerified}) => {
  return (
    <Modal visible={isVisible}>
      <ModalPanel closePortal={onClose} className={css.ageVerificationModal} disableOverlay>
        <ModalTitle className={css.ageVerificationTitle}>
          Over 18?
        </ModalTitle>
        <ModalContent className={css.ageVerificationContent}>
          To add this item to your order, please confirm you are over 18.
        </ModalContent>
          {ageVerified ? (
            <ModalFooter className={css.ageVerificationFooter}>
              <Button fill={false}>
                Close
              </Button>
            </ModalFooter>
          ) : (
            <ModalFooter className={css.ageVerificationFooter}>
              <Button className={css.noAgeVerificationButton} fill={false} >
                No, i&#8242;m under 18
              </Button>
              <Button className={css.yesAgeVerificationButton} fill color={'primary'} >
                Yes, I&#8242;m over 18
              </Button>
            </ModalFooter>
          )}
      </ModalPanel>
    </Modal>
  )
}

AgeVerificationPopUp.defaultProps = {
  ageVerified: false,
}

AgeVerificationPopUp.propTypes = {
  ageVerified: PropTypes.bool,
}

export { AgeVerificationPopUp }
