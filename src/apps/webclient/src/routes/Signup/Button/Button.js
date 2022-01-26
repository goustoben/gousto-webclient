import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import actual from 'actual'
import css from './Button.css'

const ctaText = (
  isLastStep,
  isTastePreferencesEnabled,
  isPaymentBeforeChoosingEnabled,
  showcaseMenuSeen
) => {
  if (isLastStep) {
    if (isPaymentBeforeChoosingEnabled) {
      return showcaseMenuSeen ? 'Continue to sign up' : 'See this week’s menu'
    } else if (isTastePreferencesEnabled) {
      return 'Show me recipes'
    } else {
      return 'Confirm'
    }
  }
  if (actual('width', 'px') <= 767) {
    return 'Next'
  }

  return 'Continue'
}

const Button = ({
  children,
  onClick,
  isLastStep,
  isTastePreferencesEnabled,
  isPaymentBeforeChoosingEnabled,
  showcaseMenuSeen,
  ...buttonProps
}) => {
  const buttonText =
    children ||
    ctaText(isLastStep, isTastePreferencesEnabled, isPaymentBeforeChoosingEnabled, showcaseMenuSeen)

  const className = classNames(css.cta, {
    [css.isDisabled]: buttonProps.disabled,
    [css.isFullWidth]: buttonProps.width,
  })

  return (
    <button
      className={className}
      data-testing={buttonProps['data-testing']}
      disabled={buttonProps.disabled}
      onClick={onClick}
      onKeyDown={onClick}
      type="button"
    >
      {buttonText}
    </button>
  )
}

Button.propTypes = {
  isLastStep: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
  isTastePreferencesEnabled: PropTypes.bool,
  isPaymentBeforeChoosingEnabled: PropTypes.bool,
  showcaseMenuSeen: PropTypes.bool,
}

Button.defaultProps = {
  onClick: () => {},
  children: undefined,
  isTastePreferencesEnabled: false,
  isPaymentBeforeChoosingEnabled: false,
  showcaseMenuSeen: false,
}

export { Button }
