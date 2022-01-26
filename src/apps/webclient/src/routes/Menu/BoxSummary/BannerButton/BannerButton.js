import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import * as trackingKeys from 'actions/trackingKeys'
import { isMobile } from 'utils/view'
import { CheckoutContainer } from './Checkout'
import css from './BannerButton.css'

const BannerButton = ({ view, fullWidth, toggleBasketView }) => {
  const isMobileView = isMobile(view)
  const classes = [
    { [css.buttoncontainer]: isMobileView },
    { [css.buttoncontainerFull]: fullWidth && isMobileView },
    { [css.coButton]: !isMobileView },
  ]

  return (
    <div className={classnames(...classes)}>
      <CheckoutContainer view={view} section={trackingKeys.menu} toggleBasketView={toggleBasketView} />
    </div>
  )
}

BannerButton.propTypes = {
  view: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  toggleBasketView: PropTypes.func,
}

BannerButton.defaultProps = {
  fullWidth: false,
  toggleBasketView: () => {},
}

export { BannerButton }
