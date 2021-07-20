import PropTypes from 'prop-types'
import React from 'react'
import ModalPanel from 'Modal/ModalPanel'
import { Button } from 'goustouicomponents'
import PromoModalBody from './PromoModalBody'
import { PromoModalRedesign } from './PromoModalRedesign'
import AgeVerify from './AgeVerify'
import { promoCodes } from './promoCodeValues'
import css from './PromoModal.css'

class PromoModal extends React.Component {
  handleClick = () => {
    const { error, promoApply, justApplied, closeModal } = this.props

    return (error || justApplied) ? closeModal() : promoApply()
  }

  render() {
    const {
      text,
      title,
      error,
      buttonText,
      needsAgeVerification,
      isAgeVerified,
      pending,
      trackUTMAndPromoCode,
      isNewPromoCodeModalEnabled,
      promoCode,
    } = this.props

    if (isNewPromoCodeModalEnabled && promoCodes.includes(promoCode)) {
      return (
        <PromoModalRedesign
          onClick={this.handleClick}
          trackUTMAndPromoCode={trackUTMAndPromoCode}
        />
      )
    }

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
  error: PropTypes.string,
  promoApply: PropTypes.func,
  needsAgeVerification: PropTypes.bool,
  isAgeVerified: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  pending: PropTypes.bool,
  justApplied: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
  isNewPromoCodeModalEnabled: PropTypes.bool,
  promoCode: PropTypes.string,
}

PromoModal.defaultProps = {
  promoApply: () => {},
  needsAgeVerification: false,
  isAgeVerified: false,
  pending: false,
  justApplied: false,
  trackUTMAndPromoCode: () => {},
  isNewPromoCodeModalEnabled: false,
  promoCode: '',
  error: '',
}

export { PromoModal }
