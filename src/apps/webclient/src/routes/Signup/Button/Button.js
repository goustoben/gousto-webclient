import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import actual from 'actual'
import css from './Button.css'

const ctaText = (isLastStep, isTastePreferencesEnabled) => {
  if (isLastStep) {
    if (isTastePreferencesEnabled) {
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
  showcaseMenuSeen,
  ...buttonProps
}) => {
  const buttonText = children || ctaText(isLastStep, isTastePreferencesEnabled)

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
  showcaseMenuSeen: PropTypes.bool,
}

Button.defaultProps = {
  onClick: () => {},
  children: undefined,
  isTastePreferencesEnabled: false,
  showcaseMenuSeen: false,
}

export { Button }
