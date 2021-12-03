import React from 'react'
import PropTypes from 'prop-types'
import { CheckoutButton } from '../CheckoutButton'
import css from './SubmitButton.module.css'

class SubmitButton extends React.PureComponent {
  handleClick = () => {
    const { onClick, trackSubmitOrderEvent } = this.props

    trackSubmitOrderEvent()
    onClick()
  }

  render() {
    const { submitting, isDisabled, isGoustoOnDemandEnabled } = this.props

    return (
      <div className={css.ctaContainer}>
        <CheckoutButton
          testingSelector="checkoutCTA"
          onClick={this.handleClick}
          isLoading={submitting}
          isFullWidth
          isDisabled={isDisabled}
        >
          {isGoustoOnDemandEnabled ? 'Order your box' : 'Start your subscription'}
        </CheckoutButton>
      </div>
    )
  }
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  trackSubmitOrderEvent: PropTypes.func,
  submitting: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
  isGoustoOnDemandEnabled: PropTypes.bool,
}

SubmitButton.defaultProps = {
  trackSubmitOrderEvent: () => {},
  isDisabled: false,
  isGoustoOnDemandEnabled: false,
}

export { SubmitButton }
