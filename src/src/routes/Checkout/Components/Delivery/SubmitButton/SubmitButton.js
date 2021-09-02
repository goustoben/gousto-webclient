/* eslint-disable camelcase */
import PropTypes from 'prop-types'

import React from 'react'
import { isAddressConfirmed } from 'routes/Checkout/utils/delivery'
import { CheckoutButton } from '../../CheckoutButton'
import { ErrorMessage } from '../../ErrorMessage'

class SubmitButton extends React.PureComponent {
  handleSubmit = () => {
    const { manualSubmit, browser, checkoutMobileInvalid, checkoutInvalid, onStepChange } =
      this.props
    manualSubmit('delivery')
    if (browser === 'mobile') {
      manualSubmit('yourdetails')
      if (checkoutMobileInvalid) return Promise.resolve()
    }

    if (checkoutInvalid) return Promise.resolve()

    return onStepChange()
  }

  render() {
    const { formValues, nextStepName } = this.props
    const confirmedAddress = isAddressConfirmed(formValues)

    return (
      <div>
        <ErrorMessage />
        {confirmedAddress && (
          <CheckoutButton onClick={this.handleSubmit}>{nextStepName}</CheckoutButton>
        )}
      </div>
    )
  }
}

SubmitButton.propTypes = {
  checkoutInvalid: PropTypes.bool,
  checkoutMobileInvalid: PropTypes.bool,
  nextStepName: PropTypes.string.isRequired,
  browser: PropTypes.string,
  onStepChange: PropTypes.func.isRequired,
  manualSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.objectOf(
    PropTypes.shape({
      confirmed: PropTypes.bool,
    })
  ),
}

SubmitButton.defaultProps = {
  checkoutInvalid: false,
  checkoutMobileInvalid: false,
  browser: 'mobile',
  formValues: {},
}

export { SubmitButton }
