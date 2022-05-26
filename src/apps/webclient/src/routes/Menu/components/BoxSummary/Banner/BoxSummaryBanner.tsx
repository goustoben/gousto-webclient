import React, { ButtonHTMLAttributes } from 'react'

import { Box } from '@gousto-internal/citrus-react'
import classNames from 'classnames'
import { Tooltip } from 'goustouicomponents'
import { useMedia } from 'react-use'

import * as trackingKeys from 'actions/trackingKeys'
import { DESKTOP_VIEW, MOBILE_VIEW } from 'utils/view'

import { useIsActionBarRedesignEnabled } from '../../../hooks/useIsActionBarRedesignEnabled'
import { ActionBar } from '../../ActionBar/ActionBar'
import { BrowseCTAContainer } from '../BrowseCTA'
import { BrowseCTAButtonContainer } from '../BrowseCTAButton'
import { CheckoutButton } from './CheckoutButton'
import { ExpandBoxSummaryButton } from './ExpandBoxSummaryButton'
import { OpenBoxButton } from './OpenBoxButton'
import { PriceAndDiscountTip } from './PriceAndDiscountTip'

import css from './BoxSummaryBanner.css'

type Props = {
  numRecipes: number
  onExpandClick: ButtonHTMLAttributes<Element>['onClick']
  showBrowseCTA: boolean
  errorText: string | undefined
}

export const BoxSummaryBanner = ({
  numRecipes,
  onExpandClick,
  showBrowseCTA,
  errorText,
}: Props) => {
  const isActionBarRedesignEnabled = useIsActionBarRedesignEnabled()

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
            <ExpandBoxSummaryButton
              onClick={onExpandClick || (() => {})}
              numRecipes={numRecipes}
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
