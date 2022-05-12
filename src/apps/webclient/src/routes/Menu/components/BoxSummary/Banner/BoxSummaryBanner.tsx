import React, { ButtonHTMLAttributes } from 'react'
import { useMedia } from 'react-use'
import { DESKTOP_VIEW, MOBILE_VIEW } from 'utils/view'
import classNames from 'classnames'
import { Tooltip } from 'goustouicomponents'
import * as trackingKeys from 'actions/trackingKeys'
import { Box } from '@gousto-internal/citrus-react'
import { ActionBar } from '../../ActionBar/ActionBar'
import { useIsActionBarRedesignEnabled } from '../../../hooks/useIsActionBarRedesignEnabled'

import css from './BoxSummaryBanner.css'
import { ExpandBoxSummaryButtonContainer } from './ExpandBoxSummaryButton/ExpandBoxSummaryButtonContainer'
import { BrowseCTAContainer } from '../BrowseCTA'
import { BrowseCTAButtonContainer } from '../BrowseCTAButton'
import { OpenBoxButton } from './OpenBoxButton'
import { CheckoutButton } from './CheckoutButton'
import { PriceAndDiscountTip } from './PriceAndDiscountTip'

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
            <ExpandBoxSummaryButtonContainer
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
