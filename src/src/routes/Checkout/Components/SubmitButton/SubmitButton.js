import React from 'react'
import PropTypes from 'prop-types'
import { CheckoutButton } from '../CheckoutButton'
import css from './SubmitButton.css'

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
          stepName={isGoustoOnDemandEnabled ? 'Order your box' : 'Start your subscription'}
          onClick={this.handleClick}
          isLoading={submitting}
          isFullWidth
          isDisabled={isDisabled}
        />
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
