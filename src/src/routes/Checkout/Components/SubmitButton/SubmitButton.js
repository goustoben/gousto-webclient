import PropTypes from 'prop-types'

import React from 'react'
import { SubscriptionTransparencyText } from 'SubscriptionTransparencyText'
import CheckoutButton from '../CheckoutButton'
import ErrorMessage from '../ErrorMessage'
import TermsAndConditions from '../TermsAndConditions'
import css from './SubmitButton.css'

class SubmitButton extends React.PureComponent {
  handleClick = () => {
    const { onClick, trackUTMAndPromoCode } = this.props
    trackUTMAndPromoCode('clickSubmitOrder')
    onClick()
  }

  render() {
    return (
      <div>
        <ErrorMessage />
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
  trackUTMAndPromoCode: PropTypes.func,
}

SubmitButton.defaultProps = {
  trackUTMAndPromoCode: () => {},
}

export { SubmitButton }
