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
  isBoxSummaryOpened,
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
      isBoxSummaryOpened={isBoxSummaryOpened}
      onExpandClick={onExpandClick}
      expandWarning={expandWarning}
      numRecipes={numRecipes}
    />
    <BoxSummaryDesktopBanner
      numRecipes={numRecipes}
      expandWarning={expandWarning}
      showBrowseCTA={showBrowseCTA}
      maxRecipesNum={maxRecipesNum}
      menuRecipesStore={menuRecipesStore}
      recipes={recipes}
      errorText={errorText}
      onExpandClick={onExpandClick}
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
  isBoxSummaryOpened: PropTypes.bool,

  ...boxSummaryBannerPropTypes
}

BoxSummaryBanner.defaultProps = {
  date: null,
  deliveryDays: [Immutable.Map()],
  slotId: null,
  isBoxSummaryOpened: false,
}

export { BoxSummaryBanner }
