import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ModalPanel from 'Modal/ModalPanel'
import { ModalTitle, ModalContent, ModalFooter } from 'ModalComponent'
import { Button } from 'goustouicomponents'
import css from './AgeVerification.css'

AgeVerificationPopUp.propTypes = {
  isUnderAge: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onAgeConfirmation: PropTypes.func.isRequired
}
class AgeVerificationPopUp extends PureComponent {

  constructor() {
    super()
    this.state = {
      hasSelectedUnder18: false
    }
  }

  setHasSelectedUnder18 = () => {
    this.setState({
      hasSelectedUnder18: true
    })
  }

  onConfirmation = (isOver18) => {
    const { onAgeConfirmation, onClose } = this.props

    onAgeConfirmation(isOver18)
    isOver18 ? onClose() : this.setHasSelectedUnder18()
  }

  renderFooter = () => {
    const { isUnderAge, onClose} = this.props
    const { hasSelectedUnder18 } = this.state

    if(isUnderAge || hasSelectedUnder18) {
      return (
      <ModalFooter className={css.ageVerificationFooter}>
        <Button fill={false} onClick={() => onClose()}>
          Close
        </Button>
      </ModalFooter>
      )
    }

    return (
    <ModalFooter className={css.ageVerificationFooter}>
      <Button className={css.noAgeVerificationButton} fill={false} onClick={() => this.onConfirmation(false)} >
        No, i&#39;m under 18
      </Button>
      <Button className={css.yesAgeVerificationButton} fill color={'primary'} onClick={() => this.onConfirmation(true)} >
        Yes, I&#39;m over 18
      </Button>
    </ModalFooter>)
  }

  getContent = () => {
    const { isUnderAge } = this.props
    const { hasSelectedUnder18 } = this.state

    return isUnderAge || hasSelectedUnder18 ? 'Sorry, 18 is the minimum legal age required for this item' : 'To add this item to your order, please confirm you are over 18.'
  }

  render() {
    const { onClose } = this.props

    return (
      <ModalPanel closePortal={onClose} className={css.ageVerificationModal} disableOverlay>
          <ModalTitle className={css.ageVerificationTitle}>
            Are you over 18?
          </ModalTitle>
          <ModalContent className={css.ageVerificationContent}>
            {this.getContent()}
          </ModalContent>
            {this.renderFooter()}
      </ModalPanel>

    )
  }
}

export { AgeVerificationPopUp }
