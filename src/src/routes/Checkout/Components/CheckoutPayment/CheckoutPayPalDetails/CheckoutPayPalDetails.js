import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Loader } from 'goustouicomponents'

import { clickCancelPayPal, clickConfirmPayPal, clickContinuePayPal } from 'actions/trackingKeys'
import { PayPalConfirmation } from '../PayPalConfirmation'

import css from './CheckoutPayPalDetails.css'

/* global braintree, paypal */
class CheckoutPayPalDetails extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      isPayPalInitialized: false,
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

    this.clientInstance = await braintree.client.create({
      authorization: token,
    })
  }

  fetchDeviceData = async () => {
    const { setPayPalDeviceData } = this.props

    const dataCollectorInstance = await braintree.dataCollector.create({
      client: this.clientInstance,
      paypal: true,
    })
    setPayPalDeviceData(dataCollectorInstance.deviceData)
  }

  createPayPalCheckout = async () => {
    this.paypalCheckoutInstance = await braintree.paypalCheckout.create({
      client: this.clientInstance,
    })
  }

  loadPayPalSDK = async () => {
    await this.paypalCheckoutInstance.loadPayPalSDK({
      vault: true,
      commit: false,
      currency: 'GBP',
      intent: 'capture',
    })
  }

  createPayment = () =>
    this.paypalCheckoutInstance.createPayment({
      flow: 'vault',
      locale: 'en_GB',
      billingAgreementDescription: 'Gousto recipe box subscription',
    })

  fetchPayPalNonce = async (approveData) => {
    const { setPayPalNonce, firePayPalError } = this.props

    try {
      const payload = await this.paypalCheckoutInstance.tokenizePayment(approveData)
      setPayPalNonce(payload.nonce)
    } catch (e) {
      firePayPalError(e)
    }
  }

  renderPayPalButton = () => {
    const { firePayPalError, trackEvent, isCheckoutOverhaulEnabled } = this.props

    const buttonsConfig = {
      fundingSource: paypal.FUNDING.PAYPAL,
      createBillingAgreement: () => {
        trackEvent(clickContinuePayPal)

        return this.createPayment()
      },
      onApprove: (data) => {
        trackEvent(clickConfirmPayPal)

        this.fetchPayPalNonce(data)
      },
      onCancel: () => {
        trackEvent(clickCancelPayPal)
      },
      onError: (e) => {
        firePayPalError(e)
      },
    }

    if (isCheckoutOverhaulEnabled) {
      buttonsConfig.style = {
        height: 48,
        label: 'pay',
        tagline: false,
      }
    }

    return paypal.Buttons(buttonsConfig).render('#paypal-container')
  }

  async initPayPal() {
    const { firePayPalError, clearPayPalErrors } = this.props

    clearPayPalErrors()
    this.setState({
      isPayPalInitialized: false,
    })

    try {
      await this.createBraintreeClient()
      await this.fetchDeviceData()
      await this.createPayPalCheckout()
      await this.loadPayPalSDK()
      await this.renderPayPalButton()

      this.setState({
        isPayPalInitialized: true,
      })
    } catch (e) {
      firePayPalError(e)
    }
  }

  renderBaseline() {
    const { hide, isPayPalSetupDone, hasErrors } = this.props
    const { isPayPalInitialized } = this.state

    return (
      <div className={classNames({ [css.hide]: hide })}>
        <div className={classNames({ [css.hide]: isPayPalSetupDone })}>
          <p className={css.text}>
            <span className={css.padlockIcon} />
            You will be prompted by PayPal for payment details to securely setup your subscription.
          </p>
          {!hasErrors && !isPayPalInitialized && <p className={css.text}>PayPal is loading...</p>}
          <div
            id="paypal-container"
            className={classNames(css.paypalContainer, { [css.transparent]: !isPayPalInitialized })}
          />
        </div>

        {isPayPalSetupDone && <PayPalConfirmation />}
      </div>
    )
  }

  renderCheckoutOverhaul() {
    const { hide, isPayPalSetupDone, hasErrors, isCheckoutOverhaulEnabled } = this.props
    const { isPayPalInitialized } = this.state

    const isLoading = !hasErrors && !isPayPalInitialized

    return (
      <div
        className={classNames(css.checkoutOverhaul, {
          [css.hide]: hide || isPayPalSetupDone,
          [css.payPalButtonVariation]: isCheckoutOverhaulEnabled,
        })}
      >
        <div
          id="paypal-container"
          className={classNames(css.checkoutOverhaulPaypalContainer, {
            [css.transparent]: !isPayPalInitialized,
          })}
        />
        {isLoading && (
          <div className={css.loaderContainer}>
            <Loader color="Bluecheese" />
          </div>
        )}
      </div>
    )
  }

  render() {
    const { isCheckoutOverhaulEnabled } = this.props

    if (isCheckoutOverhaulEnabled) {
      return this.renderCheckoutOverhaul()
    } else {
      return this.renderBaseline()
    }
  }
}

CheckoutPayPalDetails.propTypes = {
  setPayPalNonce: PropTypes.func,
  setPayPalDeviceData: PropTypes.func,
  trackEvent: PropTypes.func,
  firePayPalError: PropTypes.func,
  clearPayPalErrors: PropTypes.func,
  paypalScriptsReady: PropTypes.bool,
  hasErrors: PropTypes.bool,
  hide: PropTypes.bool,
  isPayPalSetupDone: PropTypes.bool,
  token: PropTypes.string,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

CheckoutPayPalDetails.defaultProps = {
  setPayPalNonce: () => {},
  setPayPalDeviceData: () => {},
  trackEvent: () => {},
  firePayPalError: () => {},
  clearPayPalErrors: () => {},
  paypalScriptsReady: false,
  hasErrors: false,
  hide: false,
  isPayPalSetupDone: false,
  token: null,
  isCheckoutOverhaulEnabled: false,
}

export { CheckoutPayPalDetails }
