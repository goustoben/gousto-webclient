import PropTypes from 'prop-types'
import React from 'react'
import {
  clickClaimDiscountPopup,
  clickCloseDiscountPopup,
  clickCloseDiscountFailurePopup,
} from 'actions/trackingKeys'
import { CTA, Modal } from 'goustouicomponents'
import headerImage from 'media/images/discount-modal-header.jpg'
import AgeVerify from './AgeVerify'
import css from './PromoModal.css'

class PromoModal extends React.Component {
  handleClick = (eventType) => () => {
    const { error, promoApply, justApplied, closeModal, trackUTMAndPromoCode } = this.props

    if (error || justApplied) {
      const event = error ? clickCloseDiscountFailurePopup : clickCloseDiscountPopup
      trackUTMAndPromoCode(event)

      return closeModal()
    } else {
      trackUTMAndPromoCode(eventType)

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
    } = this.props

    return (
      <div className={css.hideScroll} data-testing="promoModal">
        <Modal
          isOpen
          variant="floating"
          name="promo-modal"
          description="promo code modal"
          handleClose={this.handleClick(clickCloseDiscountPopup)}
        >
          <div className={css.container} data-testing="promoModal">
            {!error && <img className={css.header} src={headerImage} alt="Enjoy a tasty offer on us" />}
            {error && <h4 className={css.errorSubHeader}>{title}</h4>}
            <div className={css.contentContainer}>
              {!error && <h4 className={css.subHeader}>{title}</h4>}
              {/* eslint-disable-next-line react/no-danger */}
              <p className={css.content} dangerouslySetInnerHTML={{ __html: text }} />
              {needsAgeVerification && !error ? <AgeVerify /> : null}
              <CTA
                size="medium"
                testingSelector="promoModalButton"
                onClick={this.handleClick(clickClaimDiscountPopup)}
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
}

PromoModal.defaultProps = {
  promoApply: () => {},
  needsAgeVerification: false,
  isAgeVerified: false,
  pending: false,
  justApplied: false,
  trackUTMAndPromoCode: () => {},
  error: '',
}

export { PromoModal }
