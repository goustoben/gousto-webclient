import React from 'react'

import { Button } from 'goustouicomponents'
import PropTypes from 'prop-types'

import * as trackingKeys from 'actions/trackingKeys'

import { CheckoutButton } from '../Banner/CheckoutButton'

const DetailsCheckoutButton = (props) => {
  const { btnClassName, displayCta, ctaText, view, onClick } = props

  return (
    <div className={btnClassName}>
      {displayCta ? (
        <Button onClick={onClick} width="full">
          {ctaText}
        </Button>
      ) : (
        <CheckoutButton view={view} section={trackingKeys.boxSummary} hideCounter isFullWidth />
      )}
    </div>
  )
}

DetailsCheckoutButton.propTypes = {
  btnClassName: PropTypes.string.isRequired,
  displayCta: PropTypes.bool.isRequired,
  ctaText: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { DetailsCheckoutButton }
