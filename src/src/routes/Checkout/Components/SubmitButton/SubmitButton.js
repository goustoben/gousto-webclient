import PropTypes from 'prop-types'

import React from 'react'
import { SubscriptionTransparencyText } from 'SubscriptionTransparencyText'
import CheckoutButton from '../CheckoutButton'
import ErrorMessage from '../ErrorMessage'
import TermsAndConditions from '../TermsAndConditions'
import css from './SubmitButton.css'

class SubmitButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const { onClick } = this.props

    return (
      <div>
        <ErrorMessage />
        <CheckoutButton
          stepName="Submit Order"
          onClick={onClick}
        />
        <SubscriptionTransparencyText className={css.helperText} />
        <TermsAndConditions />
      </div>
    )
  }
}

export default SubmitButton
