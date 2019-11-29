import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { getSlotTimes } from 'utils/deliveries'
import { MOBILE_VIEW } from 'utils/view'

import { Tooltip } from 'goustouicomponents'
import RecipeList from '../../RecipeList'
import BannerButtonContainer from '../../BannerButton'
import BrowseCTA from '../../BrowseCTA'
import BrowseCTAButton from '../../BrowseCTAButton'

import { OpenBoxButton } from './OpenBoxButton'
import Title from '../../Title'

import css from './BoxSummaryMobileBanner.css'
import bannerButtonCss from '../../BannerButton/BannerButton.css'
import { boxSummaryBannerPropTypes } from '../propTypes'

const BoxSummaryMobileBanner = ({
  showBrowseCTA, 
  maxRecipesNum, 
  menuRecipesStore, 
  recipes, 
  errorText,
  openDetails,

  incrementTutorialViewed,
  tutorialTracking,
  shouldShowTutorialStep2,

  date,
  deliveryDays,
  slotId
}) => {
  const closeTutorialStep2 = () => {
    const tutorialName = 'shortlistStep2'
    incrementTutorialViewed(tutorialName)
    tutorialTracking(tutorialName, 1, true)
  }

  const handleMobileClick = (e) => {
    if (e.target && e.target.className.indexOf(bannerButtonCss.submitButton) === -1) {
      openDetails()
      if (shouldShowTutorialStep2) {
        closeTutorialStep2()
      }
    }
  }

  const slotTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <div className={css.barmobile} role='button' tabIndex={0} onClick={handleMobileClick} onKeyPress={handleMobileClick}>
      <div>
        <OpenBoxButton />
        <Title view={MOBILE_VIEW} date={date} finalisedSlot={slotId !== ''} slotTime={slotTime} />
      </div>
      <div className={css.summaryMobile}>
        <RecipeList view={MOBILE_VIEW} recipes={recipes} menuRecipesStore={menuRecipesStore} maxRecipesNum={maxRecipesNum} />

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
              <BrowseCTAButton view={MOBILE_VIEW} />
            </Tooltip>
          )
        }
        {
          showBrowseCTA
          && <BrowseCTA view={MOBILE_VIEW} />
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
  shouldShowTutorialStep2: PropTypes.bool,
  incrementTutorialViewed: PropTypes.func,
  tutorialTracking: PropTypes.func,
  date: PropTypes.string,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  slotId: PropTypes.string,

  ...boxSummaryBannerPropTypes
}

export { BoxSummaryMobileBanner }
