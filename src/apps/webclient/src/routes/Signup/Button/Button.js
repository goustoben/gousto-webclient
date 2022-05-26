import React from 'react'

import actual from 'actual'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import css from './Button.css'

const ctaText = (isLastStep) => {
  if (isLastStep) {
    return 'Confirm'
  }
  if (actual('width', 'px') <= 767) {
    return 'Next'
  }

  return 'Continue'
}

const Button = ({ children, onClick, isLastStep, ...buttonProps }) => {
  const buttonText = children || ctaText(isLastStep)

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
}

Button.defaultProps = {
  onClick: () => {},
  children: undefined,
}

export { Button }
