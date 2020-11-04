import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Svg from 'components/Svg'

import { clickContinuePayPal, clickCancelPayPal } from 'actions/trackingKeys'
import { onEnter } from 'utils/accessibility'

import css from './CheckoutPayPalDetails.css'

/* global braintree, paypal */
class CheckoutPayPalDetails extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      isPayPalInitialized: false
    }
  }

  componentDidUpdate(prevProps) {
    const { token, paypalScriptsReady } = this.props

    if (token && paypalScriptsReady) {
      const isTokenUpdated = token !== prevProps.token
      const areScriptsLoaded = paypalScriptsReady !== prevProps.paypalScriptsReady

      if (isTokenUpdated || areScriptsLoaded) {
        this.initPayPal()
      }
    }
  }

  componentWillUnmount() {
    if (this.clientInstance) {
      this.clientInstance.teardown()
      this.clientInstance = null
    }
  }

  createBraintreeClient = async () => {
    const { token } = this.props

    this.clientInstance = await braintree.client
      .create({
        authorization: token
      })
  }

  fetchDeviceData = async () => {
    const { setPayPalDeviceData } = this.props

    const dataCollectorInstance = await braintree.dataCollector
      .create({
        client: this.clientInstance,
        paypal: true,
      })
    setPayPalDeviceData(dataCollectorInstance.deviceData)
  }

  createPayPalCheckout = async () => {
    this.paypalCheckoutInstance = await braintree.paypalCheckout
      .create({
        client: this.clientInstance
      })
  }

  loadPayPalSDK = async () => {
    await this.paypalCheckoutInstance
      .loadPayPalSDK({
        vault: true,
        commit: false,
        currency: 'GBP',
        intent: 'capture',
      })
  }

  createPayment = () => (
    this.paypalCheckoutInstance
      .createPayment({
        flow: 'vault',
        locale: 'en_GB',
        billingAgreementDescription: 'Gousto recipe box subscription',
      })
  )

  fetchPayPalNonce = async (approveData) => {
    const { setPayPalNonce, firePayPalError } = this.props

    try {
      const payload = await this.paypalCheckoutInstance
        .tokenizePayment(approveData)
      setPayPalNonce(payload.nonce)
    } catch (e) {
      firePayPalError(e)
    }
  }

  renderPayPalButton = () => {
    const { firePayPalError, trackEvent } = this.props

    return paypal
      .Buttons({
        fundingSource: paypal.FUNDING.PAYPAL,
        createBillingAgreement: () => {
          trackEvent(clickContinuePayPal)

          return this.createPayment()
        },
        onApprove: (data) => {
          this.fetchPayPalNonce(data)
        },
        onCancel: () => {
          trackEvent(clickCancelPayPal)
        },
        onError: (e) => {
          firePayPalError(e)
        }
      })
      .render('#paypal-container')
  }

  async initPayPal() {
    const { firePayPalError, clearPayPalErrors } = this.props

    clearPayPalErrors()
    this.setState({
      isPayPalInitialized: false
    })

    try {
      await this.createBraintreeClient()
      await this.fetchDeviceData()
      await this.createPayPalCheckout()
      await this.loadPayPalSDK()
      await this.renderPayPalButton()

      this.setState({
        isPayPalInitialized: true
      })
    } catch (e) {
      firePayPalError(e)
    }
  }

  render() {
    const { hide, isPayPalSetupDone, hasErrors, resetPaymentMethod } = this.props
    const { isPayPalInitialized } = this.state

    return (
      <div className={classNames({ [css.hide]: hide })}>
        <div className={classNames({ [css.hide]: isPayPalSetupDone })}>
          <p className={css.text}>
            <span className={css.padlockIcon} />
            You will be prompted by PayPal for payment details to securely setup your subscription.
          </p>
          {!hasErrors && !isPayPalInitialized && <p className={css.text}>PayPal is loading...</p>}
          <div id="paypal-container" className={classNames(css.paypalContainer, {[css.transparent]: !isPayPalInitialized})} />
        </div>

        {isPayPalSetupDone && (
          <div className={css.text}>
            <span className={css.checkmarkIcon} />
            Great, you’re all set to pay with&nbsp;
            <Svg className={css.paypalIcon} fileName="paypal" />
            <br />
            <span className={css.paypalAlternativeText}>
              or&nbsp;
              <span
                role="button"
                tabIndex="0"
                className={css.resetPaymentMethod}
                onClick={resetPaymentMethod}
                onKeyDown={onEnter(resetPaymentMethod)}
              >
                Change payment method
              </span>
            </span>
          </div>
        )}
      </div>
    )
  }
}

CheckoutPayPalDetails.propTypes = {
  setPayPalNonce: PropTypes.func,
  setPayPalDeviceData: PropTypes.func,
  resetPaymentMethod: PropTypes.func,
  trackEvent: PropTypes.func,
  firePayPalError: PropTypes.func,
  clearPayPalErrors: PropTypes.func,
  paypalScriptsReady: PropTypes.bool,
  hasErrors: PropTypes.bool,
  hide: PropTypes.bool,
  isPayPalSetupDone: PropTypes.bool,
  token: PropTypes.string,
}

CheckoutPayPalDetails.defaultProps = {
  setPayPalNonce: () => {},
  setPayPalDeviceData: () => {},
  resetPaymentMethod: () => {},
  trackEvent: () => {},
  firePayPalError: () => {},
  clearPayPalErrors: () => {},
  paypalScriptsReady: false,
  hasErrors: false,
  hide: false,
  isPayPalSetupDone: false,
  token: null,
}

export { CheckoutPayPalDetails }
