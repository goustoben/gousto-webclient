import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { MOBILE_VIEW } from 'utils/view'

import { Button, ButtonColorVariant } from '@gousto-internal/citrus-react'
import { PriceAndDiscountTip } from '../PriceAndDiscountTip'

import css from './ExpandBoxSummaryButton.css'

const ExpandBoxSummaryButton = ({
  showDetails,
  pricingPending,
  numPortions,
  numRecipes,
  date,
  slotId,
  warning,
  onClick,
  view,
}) => {
  return view === MOBILE_VIEW ? (
    <PriceAndDiscountTip
      numPortions={numPortions}
      numRecipes={numRecipes}
      date={date}
      slotId={slotId}
      warning={warning}
    />
  ) : (
    <div className={css.buttonContainer}>
      <Button
        height={48}
        colorVariant={ButtonColorVariant.Secondary}
        onClick={onClick}
        data-testing="expandBoxSummaryButton"
      >
        <PriceAndDiscountTip
          showDetails={showDetails}
          pricingPending={pricingPending}
          numPortions={numPortions}
          numRecipes={numRecipes}
          date={date}
          slotId={slotId}
          warning={warning}
          view={view}
        />
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
  pricingPending: PropTypes.bool.isRequired,
  numPortions: PropTypes.number.isRequired,
  numRecipes: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  slotId: PropTypes.string.isRequired,
  warning: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
}

export { ExpandBoxSummaryButton }
