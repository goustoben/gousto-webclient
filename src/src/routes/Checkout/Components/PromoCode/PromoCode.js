import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { logger } from 'utils/logger'
import classNames from 'classnames'
import { checkoutConfig } from 'config/checkout'
import css from './PromoCode.css'
import checkoutCss from '../../Checkout.css'

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

  getDisplayOptions = () => {
    const { promoCode } = this.props
    const { hasError, hasValidPromoCode } = this.state

    let result
    if (promoCode && hasError) {
      result = {
        inputClassName: css.inputError,
        iconClassName: css.inputIconError,
      }
    } else if (this.promoCodeAdded() && hasValidPromoCode) {
      result = {
        inputClassName: css.inputSuccess,
        iconClassName: css.inputIconSuccess,
      }
    } else {
      result = {
        inputClassName: css.input,
        iconClassName: null,
      }
    }

    return result
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

  renderMessage = () => {
    const { hasError } = this.state

    if (hasError) {
      return <p className={css.errorMsg}>{checkoutConfig.errorMessage.invalidPromocode}</p>
    }

    return null
  }

  render() {
    const { value } = this.state
    const { inputClassName, iconClassName } = this.getDisplayOptions()

    return (
      <div className={css.inputGroup}>
        <div className={css.inputContainer}>
          <div className={css.discountLabel}>Discount code</div>
          <div className={css.inputWrapper}>
            <input
              type="text"
              name="promoCode"
              data-testing="promoCodeInput"
              value={value}
              onChange={this.handleChange}
              className={classNames(inputClassName, checkoutCss.checkoutInput)}
            />
            <span
              className={classNames(css.inputIcon, iconClassName, {
                [css.isHidden]: !iconClassName,
              })}
            />
          </div>
        </div>
        {this.renderMessage()}
      </div>
    )
  }
}

PromoCode.defaultProps = defaultProps
PromoCode.propTypes = propTypes

export { PromoCode }
