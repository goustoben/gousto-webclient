import React, { Component } from 'react'

import PropTypes from 'prop-types'

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
    const { applyPromoCodeAndShowModal, redirect, trackUTMAndPromoCode } = this.props
    applyPromoCodeAndShowModal()
    redirect('/signup/box-size')
    trackUTMAndPromoCode(clickClaimDiscountBar)
  }

  render() {
    const { isLoading, canApplyPromo, text } = this.props
    const { isSticky } = this.state

    return (
      <div ref={this.stickyBarRef}>
        {isLoading ? null : (
          <DiscountBar
            applyDiscount={this.applyDiscount}
            isHidden={!canApplyPromo}
            isSticky={isSticky}
            text={text}
          />
        )}
      </div>
    )
  }
}

PromoBanner.propTypes = {
  canApplyPromo: PropTypes.bool,
  text: PropTypes.string,
  trackUTMAndPromoCode: PropTypes.func,
  applyPromoCodeAndShowModal: PropTypes.func,
  redirect: PropTypes.func,
  isLoading: PropTypes.bool,
}

PromoBanner.defaultProps = {
  canApplyPromo: true,
  text: '',
  trackUTMAndPromoCode: () => {},
  applyPromoCodeAndShowModal: () => {},
  redirect: () => {},
  isLoading: false,
}
