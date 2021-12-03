import PropTypes from 'prop-types'
import React from 'react'
import { browserHistory } from 'react-router'
import {
  clickClaimDiscountPopup,
  clickCloseDiscountPopup,
  clickCloseDiscountFailurePopup,
  clickGodClaimDiscountPopup,
  clickCloseGodDiscountPopup,
} from 'actions/trackingKeys'
import { CTA, Modal } from 'goustouicomponents'
import headerImage from 'media/images/discount-modal-header.jpg'
import { AgeVerifyContainer } from './AgeVerify'
import css from './PromoModal.module.css'

class PromoModal extends React.Component {
  handleClick = (type) => () => {
    const {
      error,
      promoApply,
      justApplied,
      closeModal,
      trackUTMAndPromoCode,
      basketPromoCodeChange,
      isGoustoOnDemandError,
      isGoustoOnDemandEnabled,
      percentageOff,
      promoResetGoustoOnDemandFlow,
    } = this.props

    if (isGoustoOnDemandError) {
      promoResetGoustoOnDemandFlow()

      return browserHistory.push('/')
    }

    if (error || justApplied) {
      const event = error ? clickCloseDiscountFailurePopup : clickCloseDiscountPopup
      trackUTMAndPromoCode(isGoustoOnDemandEnabled ? clickCloseGodDiscountPopup : event)
      if (!justApplied) {
        basketPromoCodeChange('')
      }

      return closeModal()
    } else {
      const closeModalEvent = isGoustoOnDemandEnabled ? clickCloseGodDiscountPopup : clickCloseDiscountPopup
      const claimDiscountEvent = isGoustoOnDemandEnabled ? clickGodClaimDiscountPopup : clickClaimDiscountPopup
      const eventType = type === 'close' ? closeModalEvent : claimDiscountEvent
      trackUTMAndPromoCode(eventType, isGoustoOnDemandEnabled ? { discount_amount: percentageOff } : null)

      return promoApply()
    }
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
      isGoustoOnDemandError,
    } = this.props

    return (
      <div className={css.hideScroll} data-testing="promoModal">
        <Modal
          isOpen
          variant="floating"
          name="promo-modal"
          description="promo code modal"
          handleClose={this.handleClick('close')}
        >
          <div className={css.container} data-testing="promoModal">
            {!error && !isGoustoOnDemandError && <img className={css.header} src={headerImage} alt="Enjoy a tasty offer on us" />}
            {(error || isGoustoOnDemandError) && <h4 className={css.errorSubHeader}>{title}</h4>}
            <div className={css.contentContainer}>
              {!error && !isGoustoOnDemandError && <h4 className={css.subHeader}>{title}</h4>}
              {/* eslint-disable-next-line react/no-danger */}
              <p className={css.content} dangerouslySetInnerHTML={{ __html: text }} />
              {needsAgeVerification && !error ? <AgeVerifyContainer /> : null}
              <CTA
                size="medium"
                testingSelector="promoModalButton"
                onClick={this.handleClick('claimDiscount')}
                variant="primary"
                isFullWidth
                disabled={(needsAgeVerification && !isAgeVerified && !error) || pending}
              >
                {buttonText}
              </CTA>
            </div>
          </div>
        </Modal>
      </div>
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
  isGoustoOnDemandError: PropTypes.bool,
  isGoustoOnDemandEnabled: PropTypes.bool,
  basketPromoCodeChange: PropTypes.func,
  percentageOff: PropTypes.string,
  promoResetGoustoOnDemandFlow: PropTypes.func,
}

PromoModal.defaultProps = {
  promoApply: () => {},
  needsAgeVerification: false,
  isAgeVerified: false,
  pending: false,
  justApplied: false,
  trackUTMAndPromoCode: () => {},
  error: '',
  isGoustoOnDemandError: false,
  isGoustoOnDemandEnabled: false,
  basketPromoCodeChange: () => {},
  percentageOff: '',
  promoResetGoustoOnDemandFlow: () => {},
}

export { PromoModal }
