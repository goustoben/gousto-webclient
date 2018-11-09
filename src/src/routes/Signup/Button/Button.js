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
		  {...buttonProps}
		  onClick={() => {
		    if (typeof onClick === 'function') {
		      onClick(...arguments)
		    }
		  }}
		>
			{buttonText}
		</GoustoButton>
  )
}

Button.propTypes = {
  isLastStep: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func,
  children: React.PropTypes.node,
}

export default Button

