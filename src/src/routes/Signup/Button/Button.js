import PropTypes from 'prop-types'
import React from 'react'
import actual from 'actual'
import { Button as GoustoButton } from 'goustouicomponents'

const ctaText = (isLastStep) => {
  if (isLastStep) {
    return 'Show me recipes'
  }
  if (actual('width', 'px') <= 767) {
    return 'Next'
  }

  return 'Continue'
}

const Button = ({ children, onClick, isLastStep, ...buttonProps }) => {
  const buttonText = children || ctaText(isLastStep)

  return (
    <GoustoButton
      disabled={buttonProps.disabled}
      pending={buttonProps.pending}
      width={buttonProps.width}
      data-testing={buttonProps.disabled}
      fill={buttonProps.fill}
      onClick={args => {
        if (typeof onClick === 'function') {
          onClick(args)
        }
      }}
    >
      {buttonText}
    </GoustoButton>
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

