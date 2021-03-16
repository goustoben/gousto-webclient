import React from 'react'
import PropTypes from 'prop-types'
import { SubscriptionTransparencyText } from 'SubscriptionTransparencyText'
import { CTA } from 'goustouicomponents'
import { CheckoutButton } from '../CheckoutButton'
import { TermsAndConditions } from '../TermsAndConditions'
import css from './SubmitButton.css'

class SubmitButton extends React.PureComponent {
  handleClick = () => {
    const { onClick, trackSubmitOrderEvent } = this.props

    trackSubmitOrderEvent()
    onClick()
  }

  render() {
    const { isCheckoutOverhaulEnabled } = this.props

    if (isCheckoutOverhaulEnabled) {
      const { submitting, isDisabled } = this.props

      return (
        <div className={css.checkoutOverhaulContainer}>
          <CTA
            testingSelector="checkoutCTA"
            onClick={this.handleClick}
            isLoading={submitting}
            isFullWidth
            isDisabled={isDisabled}
          >
            Start your subscription
          </CTA>
        </div>
      )
    }

    return (
      <div>
        <CheckoutButton
          stepName="Start Your Subscription"
          onClick={this.handleClick}
        />
        <SubscriptionTransparencyText className={css.helperText} />
        <TermsAndConditions />
      </div>
    )
  }
}

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  trackSubmitOrderEvent: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  submitting: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool,
}

SubmitButton.defaultProps = {
  trackSubmitOrderEvent: () => {},
  isCheckoutOverhaulEnabled: false,
  isDisabled: false,
}

export { SubmitButton }
