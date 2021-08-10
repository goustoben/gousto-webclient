import React from 'react'
import PropTypes from 'prop-types'
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
  isBoxSizeVerticalLayoutEnabled,
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
        <div className={signupCss.header}>
          <Heading type="h1">{title}</Heading>
          <p className={css.subtitle}>{subtitle}</p>
        </div>
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
}

BoxSizeStep.defaultProps = {
  isBoxSizeVerticalLayoutEnabled: false,
}

export { BoxSizeStep }
