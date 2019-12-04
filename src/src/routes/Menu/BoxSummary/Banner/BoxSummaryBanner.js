import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { boxSummaryBannerPropTypes } from './propTypes'
import { BoxSummaryDesktopBanner } from './Desktop/BoxSummaryDesktopBanner'
import { BoxSummaryMobileBanner } from './Mobile/BoxSummaryMobileBanner'

const BoxSummaryBanner = ({
  isMobile,

  date,
  deliveryDays,
  slotId,

  numRecipes,
  expandWarning,
  onExpandClick,

  ...genericProps
}) => {
  if (isMobile) {
    return (
      <BoxSummaryMobileBanner
        date={date}
        deliveryDays={deliveryDays}
        slotId={slotId}
        {...genericProps}
      />
    )
  }

  return (
    <BoxSummaryDesktopBanner
      numRecipes={numRecipes}
      expandWarning={expandWarning}
      onExpandClick={onExpandClick}
      {...genericProps}
    />
  )
}

BoxSummaryBanner.propTypes = {
  isMobile: PropTypes.bool.isRequired,

  date: PropTypes.string,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  slotId: PropTypes.string,

  expandWarning: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  numRecipes: PropTypes.number.isRequired,

  ...boxSummaryBannerPropTypes
}

export { BoxSummaryBanner }
