import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { promoGet } from 'actions/promos'
import { getIsSimplifyBasketBarEnabled } from 'routes/Menu/selectors/features'
import { getPromoCode } from 'selectors/basket'
import { HotjarTrigger } from 'components/HotjarTrigger'
import { actionTypes } from 'actions/actionTypes'
import { boxSummaryBannerPropTypes } from './propTypes'
import { BoxSummaryDesktopBanner } from './Desktop/BoxSummaryDesktopBanner'
import { BoxSummaryMobileBanner } from './Mobile/BoxSummaryMobileBanner'
import { ActionBar } from '../../ActionBar/ActionBar'
import { useIsActionBarRedesignEnabled } from '../../../hooks/useIsActionBarRedesignEnabled'

// Note: the following selectors should be in proper files; as part of
// productionizing isSimplifyBasketBarEnabled they should be moved there.
// Putting them here, locally, is tech debt consciously taken for sake of
// delivery speed.

const getPending = (state) => state.pending

const createGetActionTypeIsPending = (actionType) =>
  createSelector(getPending, (pending) => pending.get(actionType))

const getPromoStore = (state) => state.promoStore

const createGetPromoCodeInformationFromPromoStore = (promoCode) =>
  createSelector(getPromoStore, (promoStore) => promoStore.get(promoCode))

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
  isBoxSummaryOpened,
}) => {
  const isSimplifyBasketBarEnabled = useSelector(getIsSimplifyBasketBarEnabled)

  const dispatch = useDispatch()
  const promoCode = useSelector(getPromoCode)
  const isPromoGetPending = useSelector(createGetActionTypeIsPending(actionTypes.PROMO_GET))
  const promoCodeInformationFromPromoStore = useSelector(
    createGetPromoCodeInformationFromPromoStore(promoCode)
  )

  useEffect(() => {
    if (
      promoCode &&
      isSimplifyBasketBarEnabled &&
      !promoCodeInformationFromPromoStore &&
      !isPromoGetPending
    ) {
      dispatch(promoGet(promoCode))
    }
  }, [
    promoCode,
    isSimplifyBasketBarEnabled,
    promoCodeInformationFromPromoStore,
    isPromoGetPending,
    dispatch,
  ])

  const isActionBarRedesignEnabled = useIsActionBarRedesignEnabled()

  return (
    <section>
      <BoxSummaryMobileBanner
        showBrowseCTA={showBrowseCTA}
        maxRecipesNum={maxRecipesNum}
        menuRecipesStore={menuRecipesStore}
        recipes={recipes}
        errorText={errorText}
        onExpandClick={onExpandClick}
        expandWarning={expandWarning}
        numRecipes={numRecipes}
      />
      <BoxSummaryDesktopBanner
        showBrowseCTA={showBrowseCTA}
        maxRecipesNum={maxRecipesNum}
        menuRecipesStore={menuRecipesStore}
        recipes={recipes}
        errorText={errorText}
        expandWarning={expandWarning}
        onExpandClick={onExpandClick}
        numRecipes={numRecipes}
      />
      <HotjarTrigger name="simplify-basket-bar" shouldInvoke={isSimplifyBasketBarEnabled} />
      {isActionBarRedesignEnabled && <ActionBar variant="separate" />}
    </section>
  )
}

BoxSummaryBanner.propTypes = {
  date: PropTypes.string,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  slotId: PropTypes.string,
  expandWarning: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  numRecipes: PropTypes.number.isRequired,
  isBoxSummaryOpened: PropTypes.bool,

  ...boxSummaryBannerPropTypes,
}

BoxSummaryBanner.defaultProps = {
  date: null,
  deliveryDays: [Immutable.Map()],
  slotId: null,
  isBoxSummaryOpened: false,
}

export { BoxSummaryBanner }
