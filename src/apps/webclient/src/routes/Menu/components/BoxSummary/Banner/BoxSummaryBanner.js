import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { promoGet } from 'actions/promos'
import { getPromoCode } from 'selectors/basket'
import { actionTypes } from 'actions/actionTypes'
import { useMedia } from 'react-use'
import { DESKTOP_VIEW, MOBILE_VIEW } from 'utils/view'
import classNames from 'classnames'
import { Tooltip } from 'goustouicomponents'
import { createGetPromoStoreEntry } from 'selectors/promoStoreSelectors'
import { createGetActionTypeIsPending } from 'selectors/status'
import { ActionBar } from '../../ActionBar/ActionBar'
import { useIsActionBarRedesignEnabled } from '../../../hooks/useIsActionBarRedesignEnabled'

import css from './BoxSummaryBanner.css'
import { ExpandBoxSummaryButtonContainer } from './ExpandBoxSummaryButton/ExpandBoxSummaryButtonContainer'
import { BrowseCTAContainer } from '../BrowseCTA'
import { BrowseCTAButtonContainer } from '../BrowseCTAButton'
import { OpenBoxButton } from './OpenBoxButton'
import { CheckoutButton } from './CheckoutButton'
import { PriceAndDiscountTip } from './PriceAndDiscountTip'
import * as trackingKeys from 'actions/trackingKeys'
import { Box } from '@gousto-internal/citrus-react'

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
          {isToMedium ? (
            <PriceAndDiscountTip numRecipes={numRecipes} />
          ) : (
            <ExpandBoxSummaryButtonContainer
              onClick={onExpandClick}
              numRecipes={numRecipes}
              view={view}
              showBrowseCTA={showBrowseCTA}
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
            <>
              <Box width="1rem" />
              <Tooltip
                message={errorText}
                visible={!!errorText}
                // eslint-disable-next-line react/style-prop-object
                style="button"
                overlayClassName={css.errorTooltip}
                className={css.errorMessage}
              >
                <CheckoutButton view={view} section={trackingKeys.menu} />
              </Tooltip>
            </>
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
