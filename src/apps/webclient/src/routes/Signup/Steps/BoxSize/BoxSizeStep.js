import React from 'react'

import { Heading } from 'goustouicomponents'
import PropTypes from 'prop-types'

import { completeWizardBoxSize } from 'actions/trackingKeys'
import { RibbonTriggerContainer } from 'components/RibbonTrigger'
import { signupConfig } from 'config/signup'
import { BoxDescriptorsPropType } from 'routes/BoxPrices/boxPricesPropTypes'
import { useBasket } from 'routes/Menu/domains/basket'

import { GoustoOnDemandBoxSizeContent } from './GoustoOnDemandBoxSizeContent'
import { PrimaryButton } from './PrimaryButton'

import signupCss from '../../Signup.css'
import css from './BoxSizeStep.css'

export const BoxSizeStep = ({
  numPortionChange,
  numPortionChangeTracking,
  next,
  trackSignupWizardAction,
  isGoustoOnDemandEnabled,
  numPersonsToBoxDescriptors,
  isLoadingPrices,
  goustoOnDemandCustomText,
}) => {
  const { boxSizeTypes, title, subtitle } = signupConfig.boxSizeStep
  const { setNumPortions } = useBasket()

  const handlePrimaryButtonClick = (value) => {
    numPortionChange(value)
    numPortionChangeTracking(value)
    setNumPortions(value)
    trackSignupWizardAction(completeWizardBoxSize, {
      box_size: value,
    })
    next()
  }

  const renderCarouselItems = () =>
    boxSizeTypes.map(({ heading, suitableFor, ctaText, value }) => (
      <div className={css.carouselItem} key={`box-size-for-${value}`}>
        <h2 className={css.itemHeading}>{heading}</h2>
        <p className={css.suitableTitle}>Suitable for:</p>
        <ul className={css.list}>
          {suitableFor.map((label) => (
            <li key={`for-${label.charAt(0)}`} className={css.listItem}>
              {label}
            </li>
          ))}
        </ul>
        <PrimaryButton
          value={value}
          onPrimaryButtonClick={handlePrimaryButtonClick}
          ctaText={ctaText}
        />
      </div>
    ))

  return (
    <div className={signupCss.stepContainer} data-testing="signupBoxSizeStep">
      <div className={signupCss.fullWidth}>
        <div className={signupCss.header}>
          <Heading type="h1">{title}</Heading>
          {isGoustoOnDemandEnabled ? null : <p className={css.subtitle}>{subtitle}</p>}
        </div>
        {isGoustoOnDemandEnabled ? (
          <GoustoOnDemandBoxSizeContent
            onPrimaryButtonClick={handlePrimaryButtonClick}
            numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
            isLoadingPrices={isLoadingPrices}
            goustoOnDemandCustomText={goustoOnDemandCustomText}
          />
        ) : (
          <div className={css.boxSizeInner}>{renderCarouselItems()}</div>
        )}
      </div>
      <RibbonTriggerContainer name="wizard-box-size" />
    </div>
  )
}

BoxSizeStep.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  trackSignupWizardAction: PropTypes.func.isRequired,
  isGoustoOnDemandEnabled: PropTypes.bool,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  isLoadingPrices: PropTypes.bool,
  goustoOnDemandCustomText: PropTypes.string,
}

BoxSizeStep.defaultProps = {
  isGoustoOnDemandEnabled: false,
  numPersonsToBoxDescriptors: null,
  isLoadingPrices: false,
  goustoOnDemandCustomText: '',
}
