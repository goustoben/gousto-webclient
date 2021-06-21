import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { signupConfig } from 'config/signup'
import { Heading } from 'goustouicomponents'
import { completeWizardBoxSize } from 'actions/trackingKeys'
import { Button } from '../../Button'
import css from './BoxSizeStep.css'
import signupCss from '../../Signup.css'

const BoxSizeStep = ({
  numPortionChange,
  numPortionChangeTracking,
  next,
  trackSignupWizardAction,
}) => {
  const { boxSizeTypes, title, subtitle } = signupConfig.boxSizeStep
  const handleClick = (value) => {
    numPortionChange(value)
    numPortionChangeTracking(value)
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
        <Button
          disabled={false}
          data-testing={`signupBoxSize${value}Portions`}
          onClick={() => handleClick(value)}
          width="full"
        >
          {ctaText}
        </Button>
      </div>
    ))

  return (
    <div className={signupCss.stepContainer} data-testing="signupBoxSizeStep">
      <div className={signupCss.fullWidth}>
        <div className={classNames(signupCss.header, signupCss.autoHeight)}>
          <Heading type="h1" className={signupCss.heading}>
            {title}
          </Heading>
          <p className={css.subtitle}>{subtitle}</p>
        </div>
        <div className={css.boxSizeCarousel}>
          <div className={css.boxSizeCarouselInner}>{renderCarouselItems()}</div>
        </div>
      </div>
    </div>
  )
}

BoxSizeStep.propTypes = {
  numPortionChange: PropTypes.func.isRequired,
  numPortionChangeTracking: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  trackSignupWizardAction: PropTypes.func.isRequired,
}

export { BoxSizeStep }
