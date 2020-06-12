import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'goustouicomponents'
import css from './CheckoutButton.css'

const CheckoutButton = ({ color, fill, onClick, stepName, submitting, valid }) => (
  <Button
    color={color}
    fill={fill}
    width="full"
    onClick={onClick}
    pending={submitting}
    className={css.marginTop}
    disabled={!valid}
    data-testing="checkoutCTA"
  >
    {stepName}
  </Button>
)

CheckoutButton.propTypes = {
  fill: PropTypes.bool,
  stepName: PropTypes.string,
  submitting: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  valid: PropTypes.bool,
}

CheckoutButton.defaultProps = {
  color: 'primary',
  onClick: () => {},
  fill: true,
  stepName: '',
  submitting: false,
  valid: true,
}

export default CheckoutButton
