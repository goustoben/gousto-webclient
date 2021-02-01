import PropTypes from 'prop-types'
import React from 'react'
import { Button, CTA } from 'goustouicomponents'
import { onEnter } from '../../../../utils/accessibility'
import css from './CheckoutButton.css'

const CheckoutButton = ({
  color,
  fill,
  onClick,
  stepName,
  submitting,
  valid,
  isCheckoutOverhaulEnabled,
  isDisabled,
  testingSelector,
  width,
  isFullWidth,
}) => {
  if (isCheckoutOverhaulEnabled) {
    return (
      <CTA
        testingSelector={testingSelector}
        onClick={onClick}
        onKeyDown={onEnter(onClick)}
        isLoading={submitting}
        isFullWidth={isFullWidth}
        isDisabled={isDisabled}
        size="small"
      >
        {stepName}
      </CTA>
    )
  }

  return (
    <Button
      color={color}
      fill={fill}
      width={width}
      onClick={onClick}
      pending={submitting}
      className={css.marginTop}
      disabled={!valid}
      data-testing={testingSelector}
    >
      {stepName}
    </Button>
  )
}

CheckoutButton.propTypes = {
  fill: PropTypes.bool,
  stepName: PropTypes.string,
  submitting: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  valid: PropTypes.bool,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  isDisabled: PropTypes.bool,
  testingSelector: PropTypes.string,
  width: PropTypes.string,
  isFullWidth: PropTypes.bool,
}

CheckoutButton.defaultProps = {
  color: 'primary',
  onClick: () => {},
  fill: true,
  stepName: '',
  submitting: false,
  valid: true,
  isCheckoutOverhaulEnabled: false,
  isDisabled: false,
  testingSelector: 'checkoutCTA',
  width: 'full',
  isFullWidth: true,
}

export default CheckoutButton
