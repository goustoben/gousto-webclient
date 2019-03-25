import css from './AgeVerification.css'
import React from 'react'
import Modal, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'

const AgeVerificationPopUp = ({visible, close}) => (
  <Modal visible={visible}>
    <ModalPanel closePortal={close} className={css.ageVerificationModal} disableOverlay>
      <ModalTitle className={css.ageVerificationTitle}>
        Over 18?
      </ModalTitle>
      <ModalContent className={css.ageVerificationContent}>
        To add this item to your order, please confirm you are over 18.
      </ModalContent>
      <ModalFooter position={css.ageVerificationFooter}>
        <Button fill={false} >
          NO, I'M UNDER 18
        </Button>
        <Button fill color={'primary'} >
          YES, I'M OVER 18
        </Button>
      </ModalFooter>
    </ModalPanel>
  </Modal>
)

export { AgeVerificationPopUp }