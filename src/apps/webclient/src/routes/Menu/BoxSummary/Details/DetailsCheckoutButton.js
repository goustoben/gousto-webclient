import React from 'react'
import * as trackingKeys from 'actions/trackingKeys'
import { Button } from 'goustouicomponents'
import PropTypes from 'prop-types'
import { CheckoutContainer } from '../BannerButton/Checkout'
import { useBasketRequiredFeatureEnabled } from '../../hooks/useBasketRequiredFeatureEnabled'

const DetailsCheckoutButton = (props) => {
  const isBasketRequiredFeatureEnabled = useBasketRequiredFeatureEnabled()
  const {btnClassName, displayCta, ctaText, view, onClick} = props

  return (
    isBasketRequiredFeatureEnabled ? null : (
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
            : <CheckoutContainer view={view} section={trackingKeys.boxSummary} />
        }
      </div>
    )
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
