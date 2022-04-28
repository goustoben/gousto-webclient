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
import { ActionBar } from '../../ActionBar/ActionBar'
import { useIsActionBarRedesignEnabled } from '../../../hooks/useIsActionBarRedesignEnabled'

import { useMedia } from 'react-use'
import { DESKTOP_VIEW, MOBILE_VIEW } from 'utils/view'
import css from './BoxSummaryBanner.css'
import classNames from 'classnames'
import { ExpandBoxSummaryButtonContainer } from './ExpandBoxSummaryButton/ExpandBoxSummaryButtonContainer'
import { Tooltip } from 'goustouicomponents'
import { BannerButtonContainer } from '../BannerButton'
import { BrowseCTAContainer } from '../BrowseCTA'
import { BrowseCTAButtonContainer } from '../BrowseCTAButton'
import { OpenBoxButton } from './OpenBoxButton'

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
  const isActionBarRedesignEnabled = useIsActionBarRedesignEnabled()

  const dispatch = useDispatch()
  const promoCode = useSelector(getPromoCode)
  const isPromoGetPending = useSelector(createGetActionTypeIsPending(actionTypes.PROMO_GET))
  const promoCodeInformationFromPromoStore = useSelector(
    createGetPromoCodeInformationFromPromoStore(promoCode),
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
      <div
        className={classNames(css.barmobile, css.isSimplifyBasketBarEnabled)}
        onClick={onExpandClick}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        role="button"
      >
        <div>
          <OpenBoxButton />
        </div>
        <div className={classNames(css.summaryMobile, css.buttonsContainerIsSimplifyBasketEnabled)}>
          <ExpandBoxSummaryButtonContainer
            warning={expandWarning}
            onClick={onExpandClick}
            numRecipes={numRecipes}
            view={MOBILE_VIEW}
          />

          {showBrowseCTA && (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              // eslint-disable-next-line react/style-prop-object
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BrowseCTAButtonContainer view={MOBILE_VIEW} />
            </Tooltip>
          )}
          {showBrowseCTA ? (
            <BrowseCTAContainer view={MOBILE_VIEW} />
          ) : (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              // eslint-disable-next-line react/style-prop-object
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BannerButtonContainer view={MOBILE_VIEW} toggleBasketView={onExpandClick} />
            </Tooltip>
          )}
        </div>
      </div>
      <div className={css.bardesktopVariant}>
        {isActionBarRedesignEnabled ? <ActionBar variant="embedded" /> : null}
        <div className={css.buttonsContainerVariant}>
          {showBrowseCTA ? (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BrowseCTAButtonContainer view="desktop" />
            </Tooltip>
          ) : (
            <ExpandBoxSummaryButtonContainer
              warning={expandWarning}
              onClick={onExpandClick}
              numRecipes={numRecipes}
              view="desktop"
            />
          )}

          {showBrowseCTA ? (
            <BrowseCTAContainer view="desktop" />
          ) : (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BannerButtonContainer view="desktop" toggleBasketView={onExpandClick} />
            </Tooltip>
          )}
        </div>
      </div>
      <HotjarTrigger name="simplify-basket-bar" shouldInvoke={isSimplifyBasketBarEnabled} />
      {isActionBarRedesignEnabled && <ActionBar variant="separate" />}
    </section>
  )
}

BoxSummaryBanner.propTypes = {
  date: PropTypes.string,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  slotId: PropTypes.string,
  numRecipes: PropTypes.number.isRequired,
  expandWarning: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  showBrowseCTA: PropTypes.bool.isRequired,
  maxRecipesNum: PropTypes.number.isRequired,
  menuRecipesStore: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipes: PropTypes.instanceOf(Immutable.Map).isRequired,
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  isBoxSummaryOpened: PropTypes.bool,
}

BoxSummaryBanner.defaultProps = {
  date: null,
  deliveryDays: [Immutable.Map()],
  slotId: null,
  isBoxSummaryOpened: false,
}

export { BoxSummaryBanner }
