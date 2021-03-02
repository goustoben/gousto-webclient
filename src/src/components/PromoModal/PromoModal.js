import PropTypes from 'prop-types'
import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import PromoModalBody from './PromoModalBody'
import css from './PromoModal.css'
import AgeVerify from './AgeVerify'

class PromoModal extends React.Component {
  handleClick = () => {
    const { error, promoApply, justApplied, closeModal } = this.props

    return (error || justApplied) ? closeModal() : promoApply()
  }

  render() {
    const { text, title, error, buttonText, needsAgeVerification, isAgeVerified, pending, trackUTMAndPromoCode } = this.props

    return (
      <ModalPanel closePortal={() => this.handleClick()} closePortalFromButton={() => this.handleClick()} disableOverlay>
        <div className={css.body} data-testing="promoModal">
          <PromoModalBody title={title} text={text} error={error} />
          <span className={css.buttonContainer}>
            {needsAgeVerification && !error ? <AgeVerify /> : null}
            <Button
              className={css.buttonSegment}
              data-testing="promoModalButton"
              disabled={(needsAgeVerification && !isAgeVerified && !error) || pending}
              onClick={() => {
                this.handleClick()
                trackUTMAndPromoCode('clickClaimDiscountPopup')
              }}
              pending={pending}
            >
              {buttonText}
            </Button>
          </span>
        </div>
      </ModalPanel>
    )
  }
}

PromoModal.propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  promoApply: PropTypes.func,
  needsAgeVerification: PropTypes.bool,
  isAgeVerified: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  pending: PropTypes.bool,
  justApplied: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  closeModal: PropTypes.func.isRequired
}

PromoModal.defaultProps = {
  promoApply: () => {},
  needsAgeVerification: false,
  isAgeVerified: false,
  pending: false,
  justApplied: false,
  trackUTMAndPromoCode: () => {},
}

export { PromoModal }
