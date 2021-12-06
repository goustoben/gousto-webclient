import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Loader } from 'goustouicomponents'

import { clickCancelPayPal, clickConfirmPayPal, clickContinuePayPal } from 'actions/trackingKeys'

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
    const { setPayPalNonce, firePayPalError, trackFailedCheckoutFlow } = this.props

    try {
      const payload = await this.paypalCheckoutInstance.tokenizePayment(approveData)
      setPayPalNonce(payload.nonce)
    } catch (error) {
      trackFailedCheckoutFlow('Fetching PayPal nonce has been failed', error)
      firePayPalError(error)
    }
  }

  renderPayPalButton = () => {
    const { firePayPalError, trackEvent, trackSuccessfulCheckoutFlow, trackFailedCheckoutFlow } =
      this.props

    const buttonsConfig = {
      fundingSource: paypal.FUNDING.PAYPAL,
      createBillingAgreement: () => {
        trackEvent(clickContinuePayPal)
        trackSuccessfulCheckoutFlow('PayPal signup attempt')

        return this.createPayment()
      },
      onApprove: (data) => {
        trackEvent(clickConfirmPayPal)

        this.fetchPayPalNonce(data)
      },
      onCancel: () => {
        trackEvent(clickCancelPayPal)
      },
      onError: (error) => {
        trackFailedCheckoutFlow('PayPal has been failed', error)
        firePayPalError(error)
      },
    }

    buttonsConfig.style = {
      height: 48,
      label: 'pay',
      tagline: false,
    }

    return paypal.Buttons(buttonsConfig).render('#paypal-container')
  }

  async initPayPal() {
    const { firePayPalError, clearPayPalErrors, trackFailedCheckoutFlow } = this.props

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
    } catch (error) {
      trackFailedCheckoutFlow('PayPal initialization has been failed', error)
      firePayPalError(error)
    }
  }

  render() {
    const { hide, isPayPalSetupDone, hasErrors } = this.props
    const { isPayPalInitialized } = this.state

    const isLoading = !hasErrors && !isPayPalInitialized

    return (
      <div
        className={classNames(css.paypalCtaContainer, {
          [css.hide]: hide || isPayPalSetupDone,
        })}
      >
        <div
          id="paypal-container"
          className={classNames(css.paypalContainer, {
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
  trackSuccessfulCheckoutFlow: PropTypes.func,
  trackFailedCheckoutFlow: PropTypes.func,
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
  trackSuccessfulCheckoutFlow: () => {},
  trackFailedCheckoutFlow: () => {},
}

export { CheckoutPayPalDetails }
