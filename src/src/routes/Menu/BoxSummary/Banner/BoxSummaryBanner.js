import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { boxSummaryBannerPropTypes } from './propTypes'
import { BoxSummaryDesktopBanner } from './Desktop/BoxSummaryDesktopBanner'
import { BoxSummaryMobileBanner } from './Mobile/BoxSummaryMobileBanner'

const BoxSummaryBanner = ({
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
}) => (
  <section>
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
  </section>
)

BoxSummaryBanner.propTypes = {
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
