import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { MOBILE_VIEW } from 'utils/view'
import { getIsSimplifyBasketBarEnabled } from 'selectors/features'

import { Button, Segment } from 'goustouicomponents'
import { Title } from '../../Title'
import { Description } from '../../Description'

import css from './ExpandBoxSummaryButton.css'

const Contents = ({ numPortions, numRecipes, date, slotId, warning }) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)

  return (
    <div className={classNames({ [css.buttonTextWrapper]: isSimplifyBasketBarEnabled })}>
      {isSimplifyBasketBarEnabled ? (
        <>
          <Title
           view="desktop"
           numRecipes={numRecipes}
           date={date}
           finalisedSlot={slotId !== ''}
          />
          <Description
            view="desktop"
            numPortions={numPortions}
            numRecipes={numRecipes}
            deliveryOptions={slotId === ''}
            warning={warning}
          />
        </>
      ) : (
        <>
          {numRecipes > 0 ? <span className={css.badge}>{numRecipes}</span> : ''}
          <Title
            view="desktop"
            date={date}
            finalisedSlot={slotId !== ''}
            numRecipes={numRecipes}
          />
          <Description
            numPortions={numPortions}
            numRecipes={numRecipes}
            view="desktop"
            deliveryOptions={slotId === ''}
            warning={warning}
          />
        </>
      )}
    </div>
  )
}

Contents.propTypes = {
  numPortions: PropTypes.number.isRequired,
  numRecipes: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  slotId: PropTypes.string.isRequired,
  warning: PropTypes.bool.isRequired,
}

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
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)

  return isSimplifyBasketBarEnabled && view === MOBILE_VIEW ? (
    <Contents
      numPortions={numPortions}
      numRecipes={numRecipes}
      date={date}
      slotId={slotId}
      warning={warning}
    />
  ) : (
    <div className={css.bsButton}>
      <Button
        fill={showDetails}
        className={css.overflowFix}
        color="secondary"
        pending={!isSimplifyBasketBarEnabled && pricingPending}
        data-testing="expandBoxSummaryButton"
      >
        <Segment
          fill={showDetails}
          onClick={onClick}
          className={
            isSimplifyBasketBarEnabled
              ? css.summaryDesktopSegmentVariant
              : css.summaryDesktopSegment
          }
          color="secondary"
        >
          <Contents
            showDetails={showDetails}
            pricingPending={pricingPending}
            numPortions={numPortions}
            numRecipes={numRecipes}
            date={date}
            slotId={slotId}
            warning={warning}
            onClick={onClick}
            view={view}
          />
          <span
            className={classNames(css.iconDesktop, {
              [css.isSimplifyBasketBarEnabled]: isSimplifyBasketBarEnabled,
            })}
            data-testing="boxSummaryIcon"
          >
            <span
              className={showDetails ? css.arrowDown : css.arrowUp}
              data-testing="boxSummaryArrow"
            />
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
  onClick: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
}

export { ExpandBoxSummaryButton }
