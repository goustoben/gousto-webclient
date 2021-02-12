import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logger from 'utils/logger'
import { clickClaimDiscountBar } from 'actions/trackingKeys'
import { DiscountBar } from './DiscountBar/DiscountBar'

export class PromoBanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSticky: false,
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
    const header = this.stickyBarRef.current
    let isSticky = false

    if (window.pageYOffset > header.offsetTop) {
      isSticky = true
    }

    this.setState({ isSticky })
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
    const { hide, text } = this.props
    const { isSticky } = this.state

    return (
      <div ref={this.stickyBarRef}>
        <DiscountBar
          applyDiscount={this.applyDiscount}
          isHidden={hide}
          isSticky={isSticky}
          text={text}
        />
      </div>
    )
  }
}

PromoBanner.propTypes = {
  hide: PropTypes.bool,
  text: PropTypes.string,
  promoCode: PropTypes.string,
  trackUTMAndPromoCode: PropTypes.func,
}

PromoBanner.defaultProps = {
  hide: false,
  text: '',
  promoCode: '',
  trackUTMAndPromoCode: () => {},
}
