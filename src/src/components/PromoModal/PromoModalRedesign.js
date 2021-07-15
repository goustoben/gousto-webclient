import PropTypes from 'prop-types'
import React from 'react'
import { Modal, CTA } from 'goustouicomponents'
import { clickClaimDiscountPopup, clickCloseDiscountPopup } from 'actions/trackingKeys'
import headerImage from 'media/images/discount-modal-header.jpg'
import css from './PromoModal.css'

export const PromoModalRedesign = ({ onClick, trackUTMAndPromoCode }) => {
  const handleClick = (eventType) => () => {
    trackUTMAndPromoCode(eventType)
    onClick()
  }

  return (
    <div className={css.hideScroll}>
      <Modal
        isOpen
        variant="floating"
        name="promo-modal"
        description="promo code modal"
        handleClose={handleClick(clickCloseDiscountPopup)}
      >
        <div className={css.container} data-testing="promoModal">
          <img className={css.header} src={headerImage} alt="Enjoy a tasty offer on us" />
          <div className={css.contentContainer}>
            <h4 className={css.subHeader}>Join today and get 50% off your first box!</h4>
            <p className={css.firstMonthDiscount}>
              Like your first box?
              {' '}
              <span className={css.bold}>Get 30% off all other boxes you order in your first month.</span>
            </p>
            <p className={css.appliedDiscount}>Your discount will be automatically applied at checkout.</p>
            <CTA
              size="medium"
              data-testing="promoModalButton"
              onClick={handleClick(clickClaimDiscountPopup)}
              variant="primary"
              isFullWidth
            >
              Claim my discount
            </CTA>
          </div>
        </div>
      </Modal>
    </div>
  )
}

PromoModalRedesign.propTypes = {
  onClick: PropTypes.func.isRequired,
  trackUTMAndPromoCode: PropTypes.func.isRequired,
}
