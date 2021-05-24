import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { signupConfig } from 'config/signup'
import { CTA, Heading } from 'goustouicomponents'
import typography from 'design-language/typography.module.css'
import { completeWizardBoxSize } from 'actions/trackingKeys'
import { Button } from '../../Button'
import css from './BoxSizeStep.css'
import signupCss from '../../Signup.css'

import { Image } from '../../Image'

const BoxSizeStep = ({
  numPortionChange,
  numPortionChangeTracking,
  next,
  isWizardBoxSizeEnabled,
  trackSignupWizardAction,
}) => {
  const portions = [2, 4]

  const handleClick = (value) => {
    numPortionChange(value)
    numPortionChangeTracking(value)
    trackSignupWizardAction(completeWizardBoxSize, {
      box_size: value,
    })
    next()
  }

  const renderButtons = () =>
    portions.map((value, index) => (
      <div className={index % 2 === 0 ? css.left : css.right} key={`${value}_portions`}>
        <Button
          data-testing={`signupBoxSize${value}Portions`}
          fill={false}
          onClick={() => handleClick(value)}
          width="full"
        >
          {`${value} People`}
        </Button>
      </div>
    ))

  const renderCarouselItems = () => {
    const boxSizeTypes = [
      {
        heading: 'Regular box',
        suitableFor: ['2 adults (or 1 + leftovers)', '1 adult and 1-2 children'],
        ctaText: 'Choose regular box',
        value: 2,
      },
      {
        heading: 'Large box',
        suitableFor: ['4 adults (or 2-3 + leftovers)', '2 adults and 2-3 children'],
        ctaText: 'Choose large box',
        value: 4,
      },
    ]

    return boxSizeTypes.map(({ heading, suitableFor, ctaText, value }) => (
      <div className={css.carouselItem} key={`box-size-for-${value}`}>
        <h2 className={css.itemHeading}>{heading}</h2>
        <p className={typography.fontStyleBody}>Suitable for:</p>
        <ul className={typography.fontStyleBody}>
          {suitableFor.map((label) => (
            <li key={`for-${label.charAt(0)}`}>{label}</li>
          ))}
        </ul>
        <CTA
          isFullWidth
          testingSelector={`signupBoxSize${value}Portions`}
          onClick={() => {
            numPortionChange(value)
            numPortionChangeTracking(value)
            next()
          }}
        >
          {ctaText}
        </CTA>
      </div>
    ))
  }

  const renderBody = () =>
    isWizardBoxSizeEnabled ? (
      <div className={css.boxSizeCarousel}>
        <div className={css.boxSizeCarouselInner}>{renderCarouselItems()}</div>
      </div>
    ) : (
      <div className={signupCss.body}>
        <div className={css.container}>
          <div className={css.row}>{renderButtons()}</div>
        </div>
      </div>
    )

  return (
    <div className={signupCss.stepContainer} data-testing="signupBoxSizeStep">
      <div className={signupCss.fullWidth}>
        <div
          className={classNames(signupCss.header, {
            [signupCss.autoHeight]: isWizardBoxSizeEnabled,
          })}
        >
          <Heading type="h1" className={signupCss.heading}>
            {isWizardBoxSizeEnabled
              ? signupConfig.boxSizeStep.titleForChoose
              : signupConfig.boxSizeStep.title}
          </Heading>
          <p className={signupCss.bodyText}>
            {isWizardBoxSizeEnabled
              ? signupConfig.boxSizeStep.subtitleForChoose
              : signupConfig.boxSizeStep.subtitle}
          </p>
          {!isWizardBoxSizeEnabled && <Image name="how-many-people" />}
        </div>
        {renderBody()}
      </div>
    </div>
  )
}

BoxSizeStep.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  isWizardBoxSizeEnabled: PropTypes.bool,
  trackSignupWizardAction: PropTypes.func.isRequired,
}

BoxSizeStep.defaultProps = {
  isWizardBoxSizeEnabled: false,
}

export { BoxSizeStep }
