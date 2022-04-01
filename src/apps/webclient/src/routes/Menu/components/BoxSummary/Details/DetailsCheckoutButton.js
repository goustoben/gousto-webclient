import React from 'react'
import * as trackingKeys from 'actions/trackingKeys'
import { Button } from 'goustouicomponents'
import PropTypes from 'prop-types'
import { CheckoutContainer } from '../BannerButton/Checkout'

const DetailsCheckoutButton = (props) => {
  const {btnClassName, displayCta, ctaText, view, onClick} = props

  return (
    <div className={btnClassName}>
      {
        displayCta ? (
          <Button
            onClick={onClick}
            width="full"
          >
            {ctaText}
          </Button>
        )
          : <CheckoutContainer view={view} section={trackingKeys.boxSummary} hideCounter />
      }
    </div>
  )
}

DetailsCheckoutButton.propTypes = {
  btnClassName: PropTypes.string.isRequired,
  displayCta: PropTypes.bool.isRequired,
  ctaText: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export { DetailsCheckoutButton }
