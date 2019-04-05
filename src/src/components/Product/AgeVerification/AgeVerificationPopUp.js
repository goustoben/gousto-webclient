import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Modal, { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import css from './AgeVerification.css'
class AgeVerificationPopUp extends PureComponent {

  renderFooter = () => {
    const { onAgeConfirmation, isOver18 } = this.props

    if(isOver18) {
      return (
      <ModalFooter className={css.ageVerificationFooter}>
        <Button fill={false}>
          Close
        </Button>
      </ModalFooter>
      )
    }

    return (
    <ModalFooter className={css.ageVerificationFooter}>
      <Button className={css.noAgeVerificationButton} fill={false} onClick={() => onAgeConfirmation(false)} >
        No, i&#8242;m under 18
      </Button>
      <Button className={css.yesAgeVerificationButton} fill color={'primary'} onClick={() => onAgeConfirmation(true)} >
        Yes, I&#8242;m over 18
      </Button>
    </ModalFooter>)
  }

  getContent = () => {
    const { isOver18 } = this.props

    return isOver18 ? 'Sorry, 18 is the minimum legal age required for this item' : ' To add this item to your order, please confirm you are over 18.'
  }

  render() {
    const {isVisible, onClose} = this.props

    return (
    <Modal visible={isVisible}>
      <ModalPanel closePortal={onClose} className={css.ageVerificationModal} disableOverlay>
        <ModalTitle className={css.ageVerificationTitle}>
          Over 18?
        </ModalTitle>
        <ModalContent className={css.ageVerificationContent}>
          {this.getContent()}
        </ModalContent>
          {this.renderFooter()}
      </ModalPanel>
    </Modal>
    )
  }
}

AgeVerificationPopUp.propTypes = {
  isVisible: PropTypes.bool,
  isOver18: PropTypes.bool,
  onClose: PropTypes.func,
  onAgeConfirmation: PropTypes.func
}

export { AgeVerificationPopUp }
