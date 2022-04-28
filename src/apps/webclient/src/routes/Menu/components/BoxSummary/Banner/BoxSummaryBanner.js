import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { promoGet } from 'actions/promos'
import { getPromoCode } from 'selectors/basket'
import { actionTypes } from 'actions/actionTypes'
import { useMedia } from 'react-use'
import { DESKTOP_VIEW, MOBILE_VIEW } from 'utils/view'
import classNames from 'classnames'
import { Tooltip } from 'goustouicomponents'
import { ActionBar } from '../../ActionBar/ActionBar'
import { useIsActionBarRedesignEnabled } from '../../../hooks/useIsActionBarRedesignEnabled'

import css from './BoxSummaryBanner.css'
import { ExpandBoxSummaryButtonContainer } from './ExpandBoxSummaryButton/ExpandBoxSummaryButtonContainer'
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

const createGetPromoStoreEntry = (promoCode) =>
  createSelector(getPromoStore, (promoStore) => promoStore.get(promoCode))

const BoxSummaryBanner = ({
  numRecipes,
  expandWarning,
  onExpandClick,
  showBrowseCTA,
  errorText,
}) => {
  const isActionBarRedesignEnabled = useIsActionBarRedesignEnabled()

  const dispatch = useDispatch()
  const promoCode = useSelector(getPromoCode)
  const isPromoGetPending = useSelector(createGetActionTypeIsPending(actionTypes.PROMO_GET))
  const promoCodeEntry = useSelector(createGetPromoStoreEntry(promoCode))

  useEffect(() => {
    if (promoCode && !promoCodeEntry && !isPromoGetPending) {
      dispatch(promoGet(promoCode))
    }
  }, [promoCode, promoCodeEntry, isPromoGetPending, dispatch])
  const isToMedium = useMedia(css.BreakpointToMedium)
  const view = isToMedium ? MOBILE_VIEW : DESKTOP_VIEW

  // On mobile: always show; on desktop; only if pop-over is not shown.
  const shouldShowSummary = isToMedium || !showBrowseCTA

  return (
    <section>
      <div
        className={classNames(css.boxSummaryBanner)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(isToMedium ? { onClick: onExpandClick } : {})}
      >
        {isToMedium ? (
          <div>
            <OpenBoxButton />
          </div>
        ) : null}
        {isActionBarRedesignEnabled && !isToMedium ? <ActionBar variant="embedded" /> : null}
        <div className={css.buttonsContainer}>
          {shouldShowSummary && (
            <ExpandBoxSummaryButtonContainer
              warning={expandWarning}
              onClick={onExpandClick}
              numRecipes={numRecipes}
              view={view}
            />
          )}

          {showBrowseCTA ? (
            <>
              <Tooltip
                message={errorText}
                visible={!!errorText}
                // eslint-disable-next-line react/style-prop-object
                style="button"
                overlayClassName={css.errorTooltip}
                className={css.errorMessage}
              >
                <BrowseCTAButtonContainer view={view} />
              </Tooltip>
              <BrowseCTAContainer view={view} />
            </>
          ) : (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              // eslint-disable-next-line react/style-prop-object
              style="button"
              overlayClassName={css.errorTooltip}
              className={css.errorMessage}
            >
              <BannerButtonContainer view={view} toggleBasketView={onExpandClick} />
            </Tooltip>
          )}
        </div>
      </div>
      {isActionBarRedesignEnabled && isToMedium ? <ActionBar variant="separate" /> : null}
    </section>
  )
}

BoxSummaryBanner.propTypes = {
  numRecipes: PropTypes.number.isRequired,
  expandWarning: PropTypes.bool.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  showBrowseCTA: PropTypes.bool.isRequired,
  errorText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
}

export { BoxSummaryBanner }
