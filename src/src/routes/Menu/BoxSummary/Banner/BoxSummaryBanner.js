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
  showBrowseCTA,
  maxRecipesNum,
  menuRecipesStore,
  recipes,
  errorText,
  openDetails,
}) => {
  if (isMobile) {
    return (
      <BoxSummaryMobileBanner
        date={date}
        deliveryDays={deliveryDays}
        slotId={slotId}
        showBrowseCTA={showBrowseCTA}
        maxRecipesNum={maxRecipesNum}
        menuRecipesStore={menuRecipesStore}
        recipes={recipes}
        errorText={errorText}
        openDetails={openDetails}
      />
    )
  }

  return (
    <BoxSummaryDesktopBanner
      numRecipes={numRecipes}
      expandWarning={expandWarning}
      onExpandClick={onExpandClick}
      showBrowseCTA={showBrowseCTA}
      maxRecipesNum={maxRecipesNum}
      menuRecipesStore={menuRecipesStore}
      recipes={recipes}
      errorText={errorText}
      openDetails={openDetails}
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

BoxSummaryBanner.defaultProps = {
  date: null,
  deliveryDays: [Immutable.Map()],
  slotId: null,
}

export { BoxSummaryBanner }
