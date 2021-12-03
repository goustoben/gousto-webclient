import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { getSlotTimes } from 'utils/deliveries'
import { MOBILE_VIEW } from 'utils/view'

import { Tooltip } from 'goustouicomponents'
import { RecipeListContainer } from '../../RecipeList'
import { BannerButtonContainer } from '../../BannerButton'
import { BrowseCTAContainer } from '../../BrowseCTA'
import { BrowseCTAButtonContainer } from '../../BrowseCTAButton'

import { OpenBoxButton } from './OpenBoxButton'
import { TitleContainer } from '../../Title'

import css from './BoxSummaryMobileBanner.module.css'
import bannerButtonCss from '../../BannerButton/BannerButton.module.css'
import { boxSummaryBannerPropTypes } from '../propTypes'

const BoxSummaryMobileBanner = ({
  showBrowseCTA,
  maxRecipesNum,
  menuRecipesStore,
  recipes,
  errorText,
  openDetails,

  date,
  deliveryDays,
  slotId
}) => {
  const handleMobileClick = (e) => {
    if (e.target && e.target.className.indexOf(bannerButtonCss.submitButton) === -1) {
      openDetails()
    }
  }

  const slotTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <div className={css.barmobile} role="button" tabIndex={0} onClick={handleMobileClick} onKeyPress={handleMobileClick}>
      <div>
        <OpenBoxButton />
        <TitleContainer view={MOBILE_VIEW} date={date} finalisedSlot={slotId !== ''} slotTime={slotTime} />
      </div>
      <div className={css.summaryMobile}>
        <RecipeListContainer view={MOBILE_VIEW} recipes={recipes} menuRecipesStore={menuRecipesStore} maxRecipesNum={maxRecipesNum} />

        {
          showBrowseCTA
          && (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BrowseCTAButtonContainer view={MOBILE_VIEW} />
            </Tooltip>
          )
        }
        {
          showBrowseCTA
          && <BrowseCTAContainer view={MOBILE_VIEW} />
        }

        {
          !showBrowseCTA
          && (
            <Tooltip
              message={errorText}
              visible={!!errorText}
              style="button"
              overlayClassName={css.errorTooltipDesktop}
              className={css.errorMessage}
            >
              <BannerButtonContainer view={MOBILE_VIEW} open={openDetails} />
            </Tooltip>
          )
        }
      </div>
    </div>
  )
}

BoxSummaryMobileBanner.propTypes = {
  date: PropTypes.string,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  slotId: PropTypes.string,

  ...boxSummaryBannerPropTypes
}

BoxSummaryMobileBanner.defaultProps = {
  date: null,
  deliveryDays: [Immutable.Map()],
  slotId: null,
}

export { BoxSummaryMobileBanner }
