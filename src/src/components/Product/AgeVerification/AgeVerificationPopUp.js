import React from 'react'
import Modal, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import css from './AgeVerification.css'

const AgeVerificationPopUp = ({isVisible, onClose}) => (
  <Modal visible={isVisible}>
    <ModalPanel closePortal={onClose} className={css.ageVerificationModal} disableOverlay>
      <ModalTitle className={css.ageVerificationTitle}>
        Over 18?
      </ModalTitle>
      <ModalContent>
        To add this item to your order, please confirm you are over 18.
      </ModalContent>
      <ModalFooter className={css.ageVerificationFooter}>
        <Button fill={false} >
          No, i&#39;m under 18
        </Button>
        <Button fill color={'primary'} >
          Yes, I&#39;m over 18
        </Button>
      </ModalFooter>
    </ModalPanel>
  </Modal>
)

export { AgeVerificationPopUp }
