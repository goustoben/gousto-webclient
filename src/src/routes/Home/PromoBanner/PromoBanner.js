import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logger from 'utils/logger'
import Banner from 'Banner'
import { clickClaimDiscountBar } from 'actions/trackingKeys'
import { DiscountBar } from '../DiscountBar/DiscountBar'

export class PromoBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSticky: false
    }
    this.stickyBarRef = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  onScroll = () => {
    const { isHomePageRedesignEnabled } = this.props

    if (isHomePageRedesignEnabled) {
      const header = this.stickyBarRef.current
      let isSticky = false

      if (window.pageYOffset > header.offsetTop) {
        isSticky = true
      }

      this.setState({ isSticky })
    }
  }

  applyDiscount = () => {
    const { promoCode, trackUTMAndPromoCode } = this.props
    this.applyPromoCode(promoCode)
    trackUTMAndPromoCode(clickClaimDiscountBar)
  }

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
    const { hide, text, linkText, isHomePageRedesignEnabled } = this.props
    const { isSticky } = this.state

    if (isHomePageRedesignEnabled) {
      return (
        <div ref={this.stickyBarRef}>
          <DiscountBar
            applyDiscount={this.applyDiscount}
            isHidden={hide}
            isSticky={isSticky}
          />
        </div>
      )
    }

    return (
      <Banner
        hide={hide}
        text={text}
        linkText={linkText}
        onClick={this.applyDiscount}
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
  isHomePageRedesignEnabled: PropTypes.bool,
}

PromoBanner.defaultProps = {
  hide: false,
  text: '',
  linkText: '',
  promoCode: '',
  trackUTMAndPromoCode: () => {},
  isHomePageRedesignEnabled: false,
}
