import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { signupConfig } from 'config/signup'
import { Heading } from 'goustouicomponents'
import { completeWizardBoxSize } from 'actions/trackingKeys'
import { BoxDescriptorsPropType } from 'routes/BoxPrices/boxPricesPropTypes'
import { PrimaryButton } from './PrimaryButton'
import { GoustoOnDemandBoxSizeContent } from './GoustoOnDemandBoxSizeContent'
import css from './BoxSizeStep.css'
import signupCss from '../../Signup.css'

export const BoxSizeStep = ({
  numPortionChange,
  numPortionChangeTracking,
  next,
  trackSignupWizardAction,
  isBoxSizeVerticalLayoutEnabled,
  isGoustoOnDemandEnabled,
  numPersonsToBoxDescriptors,
  isLoadingPrices,
  goustoOnDemandCustomText,
}) => {
  const { boxSizeTypes, title, subtitle } = signupConfig.boxSizeStep
  const handlePrimaryButtonClick = (value) => {
    numPortionChange(value)
    numPortionChangeTracking(value)
    trackSignupWizardAction(completeWizardBoxSize, {
      box_size: value,
    })
    next()
  }

  const renderCarouselItems = () =>
    boxSizeTypes.map(({ heading, suitableFor, ctaText, value }) => (
      <div
        className={classNames(css.carouselItem, {
          [css.verticalLayoutItem]: isBoxSizeVerticalLayoutEnabled,
        })}
        key={`box-size-for-${value}`}
      >
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
          <div
            className={classNames(css.boxSizeCarousel, {
              [css.verticalLayout]: isBoxSizeVerticalLayoutEnabled,
            })}
          >
            <div
              className={classNames(css.boxSizeCarouselInner, {
                [css.innerVerticalLayout]: isBoxSizeVerticalLayoutEnabled,
              })}
            >
              {renderCarouselItems()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

BoxSizeStep.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  trackSignupWizardAction: PropTypes.func.isRequired,
  isBoxSizeVerticalLayoutEnabled: PropTypes.bool,
  isGoustoOnDemandEnabled: PropTypes.bool,
  numPersonsToBoxDescriptors: PropTypes.objectOf(BoxDescriptorsPropType),
  isLoadingPrices: PropTypes.bool,
  goustoOnDemandCustomText: PropTypes.string,
}

BoxSizeStep.defaultProps = {
  isBoxSizeVerticalLayoutEnabled: false,
  isGoustoOnDemandEnabled: false,
  numPersonsToBoxDescriptors: null,
  isLoadingPrices: false,
  goustoOnDemandCustomText: '',
}
