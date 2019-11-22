import React from 'react'
import PropTypes from 'prop-types'

import { Button, Segment } from 'goustouicomponents'
import Title from 'BoxSummary/Title'
import Description from 'BoxSummary/Description'

import css from './ExpandBoxSummaryButton.css'

const ExpandBoxSummaryButton = ({ showDetails, pricingPending, numPortions, numRecipes, date, slotId, warning, onClick }) => {
  return (
    <div className={css.bsButton}>
      <Button fill={showDetails} className={css.overflowFix} color="secondary" pending={pricingPending}>
        <Segment fill={showDetails} onClick={onClick} className={css.summaryDesktopSegment} color="secondary">
          <div>
            {numRecipes > 0 ? <span className={css.badge}>{numRecipes}</span> : ''}
            <Title view="desktop" date={date} finalisedSlot={slotId !== ''} />
            <Description
              numPortions={numPortions}
              numRecipes={numRecipes}
              view="desktop"
              deliveryOptions={slotId === ''}
              warning={warning}
            />
          </div>
          <span className={css.iconDesktop} data-testing={'boxSummaryIcon'}>
            <span className={showDetails ? css.arrowDown : css.arrowUp} ></span>
          </span>
        </Segment>
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
  onClick: PropTypes.func.isRequired
}

export { ExpandBoxSummaryButton }
