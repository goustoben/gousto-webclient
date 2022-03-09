import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import * as trackingKeys from 'actions/trackingKeys'
import { isMobile } from 'utils/view'
import { getIsSimplifyBasketBarEnabled } from 'selectors/features'
import { CheckoutContainer } from './Checkout'
import css from './BannerButton.css'

const BannerButton = ({ view, fullWidth, toggleBasketView }) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)
  const isMobileView = isMobile(view)
  const classes = [
    { [css.buttoncontainer]: isMobileView },
    { [css.buttoncontainerFull]: fullWidth && isMobileView },
    { [css.coButton]: !isMobileView && !isSimplifyBasketBarEnabled },
    { [css.containerIsSimplifyBasketBarEnabled]: isSimplifyBasketBarEnabled },
  ]

  // CheckoutCounter should change background color when the button is hovered.
  // While a css-only solution is possible in theory (`.button:hover
  // .counter`), we cannot refer to class names defined in other css module
  // files.
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <div
      className={classNames(...classes)}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
    >
      <CheckoutContainer
        view={view}
        section={trackingKeys.menu}
        toggleBasketView={toggleBasketView}
        isButtonHovered={isButtonHovered}
        shouldRenderCounter
      />
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
