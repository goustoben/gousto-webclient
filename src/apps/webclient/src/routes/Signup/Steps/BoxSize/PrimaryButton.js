import React from 'react'

import PropTypes from 'prop-types'

import { Button } from '../../Button'

export const PrimaryButton = ({ value, ctaText, onPrimaryButtonClick }) => (
  <Button
    disabled={false}
    data-testing={`signupBoxSize${value}Portions`}
    onClick={() => onPrimaryButtonClick(value)}
    width="full"
  >
    {ctaText}
  </Button>
)

PrimaryButton.propTypes = {
  value: PropTypes.number.isRequired,
  ctaText: PropTypes.string.isRequired,
  onPrimaryButtonClick: PropTypes.func.isRequired,
}
