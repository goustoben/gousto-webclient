import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import logger from 'utils/logger'
import { checkoutConfig } from 'config/checkout'
import { InputField, Space, FormFieldStatus } from '@gousto-internal/citrus-react'

const propTypes = {
  promoCode: PropTypes.string,
  promoCodeApplied: PropTypes.bool,
  basketPromoCodeChange: PropTypes.func.isRequired,
  basketPromoCodeAppliedChange: PropTypes.func.isRequired,
  trackPromocodeChange: PropTypes.func,
  promoCodeValid: PropTypes.bool,
  sendRequestToUpdateOrderSummaryPrices: PropTypes.func,
}

const defaultProps = {
  promoCode: '',
  promoCodeApplied: false,
  trackPromocodeChange: () => {},
  promoCodeValid: false,
  sendRequestToUpdateOrderSummaryPrices: () => {},
}

const DEBOUNCE_MS = 500

class PromoCode extends PureComponent {
  constructor(props) {
    super(props)

    const { promoCode } = props

    this.state = {
      value: promoCode,
      hasError: false,
      hasValidPromoCode: false,
    }
  }

  componentDidMount() {
    const { promoCode, basketPromoCodeAppliedChange } = this.props
    if (promoCode) {
      basketPromoCodeAppliedChange(true)
      this.setValidityState()
    }
  }

  componentDidUpdate(prevProps) {
    const { promoCode } = this.props
    const { promoCode: previousPromoCode } = prevProps

    if (promoCode !== previousPromoCode) {
      this.setState({
        value: promoCode,
      })
    }
  }

  handlePromoCodeVerification(currentPromoCode, previousPromoCode) {
    const { sendRequestToUpdateOrderSummaryPrices, trackPromocodeChange } = this.props

    const hasPromoCode = !!currentPromoCode
    sendRequestToUpdateOrderSummaryPrices()
      .then(() => {
        this.setValidityState()

        if (hasPromoCode) {
          trackPromocodeChange(currentPromoCode, true)
        } else {
          trackPromocodeChange(previousPromoCode, false)
        }
      })
      .catch((err) => {
        this.setError()
        logger.error(err)
      })
  }

  setValidityState = () => {
    const { promoCode, promoCodeValid } = this.props
    if (promoCode && promoCodeValid) {
      this.setState({ hasError: false, hasValidPromoCode: true })
    } else if (promoCode && !promoCodeValid) {
      this.setError()
    } else {
      this.setState({ hasError: false, hasValidPromoCode: false })
    }
  }

  promoCodeAdded = () => {
    const { promoCode, promoCodeApplied } = this.props

    return promoCode && promoCodeApplied
  }

  setError = () => {
    this.setState({
      hasError: true,
      hasValidPromoCode: false,
    })
  }

  handleChange = (e) => {
    const { value } = e.target

    const newPromoCode = value.toUpperCase()

    this.setState({ value: newPromoCode }, () => {
      this.debouncedUpdatePromoCode(newPromoCode)
    })
  }

  debouncedUpdatePromoCode = (newPromoCode) => {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout)
    }

    this.debounceTimeout = setTimeout(() => {
      this.updatePromoCode(newPromoCode)
      this.debounceTimeout = null
    }, DEBOUNCE_MS)
  }

  updatePromoCode = (newPromoCode) => {
    const {
      promoCode: previousPromoCode,
      basketPromoCodeAppliedChange,
      basketPromoCodeChange,
    } = this.props

    const hasPromoCode = !!newPromoCode
    basketPromoCodeAppliedChange(hasPromoCode)
    basketPromoCodeChange(newPromoCode)
    this.handlePromoCodeVerification(newPromoCode, previousPromoCode)
  }

  getInputStatus = () => {
    const { promoCode } = this.props
    const { hasError, hasValidPromoCode } = this.state

    if (promoCode && hasError) {
      return FormFieldStatus.Error
    } else if (this.promoCodeAdded() && hasValidPromoCode) {
      return FormFieldStatus.Success
    }

    return null
  }

  render() {
    const { value, hasError } = this.state
    const status = this.getInputStatus()

    return (
      <>
        <InputField
          label="Discount code"
          type="text"
          name="promoCode"
          data-testing="promoCodeInput"
          value={value}
          onChange={this.handleChange}
          status={status}
          validationMessage={hasError && checkoutConfig.errorMessage.invalidPromocode}
        />
        <Space size={5} />
      </>
    )
  }
}

PromoCode.defaultProps = defaultProps
PromoCode.propTypes = propTypes

export { PromoCode }
