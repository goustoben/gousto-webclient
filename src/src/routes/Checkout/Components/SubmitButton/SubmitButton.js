/* eslint-disable camelcase */
import PropTypes from 'prop-types'

import React from 'react'
import CheckoutButton from '../CheckoutButton'
import ErrorMessage from '../ErrorMessage'
import TermsAndConditions from '../TermsAndConditions'
import css from './SubmitButton.css'

class SubmitButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  render() {
    return (
      <div>
        <ErrorMessage />
        <CheckoutButton
          stepName="Submit Order"
          onClick={this.props.onClick}
        />
        <p className={css.helperText}>
          <span className={css.helperHighlighted}>
            <i className={css.tick} />
            No commitment. No cancellation fees. &nbsp;
          </span>
          Skip a box or cancel your subscription online at anytime.
        </p>
        <TermsAndConditions />
      </div>
    )
  }
}

export default SubmitButton
