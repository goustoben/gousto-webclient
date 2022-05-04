import React from 'react'
import PropTypes from 'prop-types'
import { MOBILE_VIEW } from 'utils/view'

import { Button, ButtonColorVariant } from '@gousto-internal/citrus-react'
import { PriceAndDiscountTip } from '../PriceAndDiscountTip'

import css from './ExpandBoxSummaryButton.css'

const ExpandBoxSummaryButton = ({ showDetails, numRecipes, onClick, showBrowseCTA }) => {
  if (showBrowseCTA) {
    return null
  }

  return (
    <div className={css.buttonContainer}>
      <Button
        height={48}
        colorVariant={ButtonColorVariant.Secondary}
        onClick={onClick}
        data-testing="expandBoxSummaryButton"
      >
        <PriceAndDiscountTip numRecipes={numRecipes} />
        <span className={css.iconDesktop} data-testing="boxSummaryIcon">
          <span
            className={showDetails ? css.arrowDown : css.arrowUp}
            data-testing="boxSummaryArrow"
          />
        </span>
      </Button>
    </div>
  )
}

ExpandBoxSummaryButton.propTypes = {
  showDetails: PropTypes.bool.isRequired,
  numRecipes: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  showBrowseCTA: PropTypes.bool.isRequired,
}

export { ExpandBoxSummaryButton }
