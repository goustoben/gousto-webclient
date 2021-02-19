import PropTypes from 'prop-types'
import React from 'react'
import actual from 'actual'
import { Button as GoustoButton } from 'goustouicomponents'

const ctaText = (isLastStep, isTastePreferencesEnabled) => {
  if (isLastStep && !isTastePreferencesEnabled) {
    return 'Show me recipes'
  }
  if (actual('width', 'px') <= 767) {
    return 'Next'
  }

  return 'Continue'
}

const Button = ({ children, onClick, isLastStep, isTastePreferencesEnabled, ...buttonProps }) => {
  const buttonText = children || ctaText(isLastStep, isTastePreferencesEnabled)

  return (
    <GoustoButton
      disabled={buttonProps.disabled}
      pending={buttonProps.pending}
      width={buttonProps.width}
      data-testing={buttonProps['data-testing']}
      fill={buttonProps.fill}
      onClick={(args) => {
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
  isTastePreferencesEnabled: PropTypes.bool,
}

Button.defaultProps = {
  onClick: () => {},
  children: undefined,
  isTastePreferencesEnabled: false,
}

export { Button }
