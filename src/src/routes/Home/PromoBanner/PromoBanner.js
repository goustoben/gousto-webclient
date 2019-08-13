import React from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import Banner from 'Banner'
import home from 'config/home'
import logger from 'utils/logger'

class PromoBanner extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    basketPromoCode: PropTypes.string,
    promoCode: PropTypes.string,
    promoCurrent: PropTypes.string,
    browser: PropTypes.string,
  }

  static canApplyPromo(isAuthenticated, criteria) {
    switch (criteria) {
    case 'loggedIn': return isAuthenticated === true
    case 'loggedOut': return isAuthenticated === false
    case 'any': return true
    default: return false
    }
  }

  state = {
    scroll: 0,
    top: 0
  }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.setState({
        query: queryString.parse(window.location.search),
      })
    }
  }

  componentDidMount() {
    const header = document.querySelector('header')
    this.setState({top: header.offsetHeight})

    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)

    if (this.intervals) {
      clearInterval(this.intervals)
      this.intervals = null
    }
  }

  onScroll = () => {
    this.setState({scroll: window.scrollY})
  }

  async applyPromoCode(promoCode) {
    const { isAuthenticated, promoChange, promoToggleModalVisibility, redirect } = this.props || {}
    const { query } = this.state

    let error
    if (!(query.promo_code && query.promo_code.length > 0) && promoCode && PromoBanner.canApplyPromo(isAuthenticated, home.promo.applyIf)) {
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
    const { isAuthenticated, basketPromoCode, promoCurrent, promoCode, browser } = this.props
    const { query, scroll, top } = this.state
    const promoBannerCode = promoCode || home.promo.code.toUpperCase()
    const hasBasketPromo = basketPromoCode && basketPromoCode.length > 0
    const hasQueryStringPromo = query && query.promo_code && query.promo_code.length > 0
    const hasCurrentPromo = promoCurrent && promoCurrent.length > 0

    const hide = isAuthenticated || hasBasketPromo || hasQueryStringPromo || hasCurrentPromo || !promoBannerCode
    const fixed = scroll > top
    const isMobile = browser === 'mobile'
    const fixedText = isMobile ? home.promo.banner.shortText : home.promo.banner.text

    return (
      <Banner
        text={home.promo.banner.text}
        linkText={home.promo.banner.linkText}
        onClick={() => this.applyPromoCode(promoBannerCode)}
        hide={hide}
        fixed={fixed}
        fixedText={fixedText}
      />
    )
  }
}

export default PromoBanner
