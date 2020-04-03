import React from 'react'
import PropTypes from 'prop-types'

import Banner from 'Banner'
import logger from 'utils/logger'

export class PromoBanner extends React.Component {
  async applyPromoCode(promoCode) {
    const { promoChange, promoToggleModalVisibility, redirect, canApplyPromo } = this.props || {}

    let error
    if (canApplyPromo) {
      try {
        await promoChange(promoCode)
      } catch (err) {
        error = err
        logger.warning(`error fetching promo code ${promoCode} - ${err.message}`, err)
      }
      if (!error) {
        redirect('/signup/box-size', false)
        promoToggleModalVisibility(true)
      }
    }
  }

  render() {
    const { promoCode, hide, text, linkText, trackUTMAndPromoCode } = this.props

    return (
      <Banner
        hide={hide}
        text={text}
        linkText={linkText}
        onClick={() => {
          this.applyPromoCode(promoCode)
          trackUTMAndPromoCode('clickClaimDiscountBar')
        }}
      />
    )
  }
}

PromoBanner.propTypes = {
  hide: PropTypes.bool,
  text: PropTypes.string,
  linkText: PropTypes.string,
  promoCode: PropTypes.string,
  trackUTMAndPromoCode: PropTypes.func,
}

PromoBanner.defaultProps = {
  hide: false,
  text: '',
  linkText: '',
  promoCode: '',
  trackUTMAndPromoCode: () => {},
}
