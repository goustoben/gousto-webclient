import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import logger from 'utils/logger'
import Immutable from 'immutable'
import classNames from 'classnames'
import configCheckout from 'config/checkout'
import css from './PromoCode.css'
import checkoutCss from '../../Checkout.css'

const propTypes = {
  promoCode: PropTypes.string,
  promoCodeApplied: PropTypes.bool,
  prices: PropTypes.instanceOf(Immutable.Map),
  loadPrices: PropTypes.func.isRequired,
  basketPromoCodeChange: PropTypes.func.isRequired,
  basketPromoCodeAppliedChange: PropTypes.func.isRequired,
  trackPromocodeChange: PropTypes.func,
}

const defaultProps = {
  promoCode: '',
  promoCodeApplied: false,
  prices: Immutable.Map({}),
  trackPromocodeChange: () => {},
}

class PromoCode extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      errorMsg: '',
      successMsg: '',
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    const { promoCode, basketPromoCodeAppliedChange } = this.props
    if (promoCode) {
      basketPromoCodeAppliedChange(true)
      this.promoCodeValidation()
    }
  }

  componentDidUpdate(prevProps) {
    const { promoCode, basketPromoCodeAppliedChange } = this.props
    if (promoCode && prevProps.promoCode !== promoCode) {
      basketPromoCodeAppliedChange(true)
      this.handlePromoCodeVerification()
    }
  }

  handlePromoCodeVerification() {
    const { promoCode, loadPrices, trackPromocodeChange } = this.props

    loadPrices()
      .then(() => {
        this.promoCodeValidation()
        trackPromocodeChange(promoCode, true)
      })
      .catch((err) => {
        this.setError(configCheckout.errorMessage.promoCode.invalid)
        logger.error(err)
      })
  }

  promoCodeValidation = () => {
    const { prices } = this.props
    const promoCodeValid = prices.get('promoCodeValid', false)
    if (promoCodeValid) {
      this.setState({ errorMsg: '', successMsg: configCheckout.errorMessage.promoCode.valid })
    } else {
      this.setError(configCheckout.errorMessage.promoCode.invalid)
    }
  }

  promoCodeAdded = () => {
    const { promoCode, promoCodeApplied } = this.props

    return promoCode && promoCodeApplied
  }

  setError = (message) => {
    if (message) {
      this.setState({
        errorMsg: message,
      })
    }
  }

  getInputClassName = () => {
    const { promoCode } = this.props
    const { errorMsg, successMsg } = this.state
    let className = css.input
    if (promoCode && errorMsg) {
      className = css.inputError
    } else if (this.promoCodeAdded() && successMsg) {
      className = css.inputSuccess
    }

    return className
  }

  applyPromoCode = () => {
    const { promoCode, basketPromoCodeAppliedChange } = this.props
    if (promoCode) {
      basketPromoCodeAppliedChange(true)
      this.handlePromoCodeVerification()
    }
  }

  removePromoCode = () => {
    const {
      promoCode,
      basketPromoCodeChange,
      basketPromoCodeAppliedChange,
      trackPromocodeChange,
      loadPrices,
    } = this.props
    const { successMsg } = this.state
    const promocode = promoCode.valueOf()
    basketPromoCodeChange('')
    basketPromoCodeAppliedChange(false)
    if (successMsg) {
      loadPrices().then(() => {
        trackPromocodeChange(promocode, false)
      })
    }
    this.setState({
      errorMsg: '',
      successMsg: '',
    })
  }

  handleInput = (event) => {
    const { basketPromoCodeChange } = this.props
    if (!event || !event.target) {
      return
    } else {
      this.removePromoCode()
    }

    basketPromoCodeChange(event.target.value)
  }

  /**
   * handle enter and space
   * @param e
   */
  handleKeyUp = (e) => {
    if (e.keyCode && (e.keyCode === 13 || e.keyCode === 32)) {
      this.applyPromoCode()
    }
  }

  renderMessage = () => {
    const { errorMsg } = this.state
    const error = errorMsg.includes('promocode')
      ? errorMsg.replace('promocode', 'discount code')
      : errorMsg

    if (errorMsg) {
      return <p className={css.errorMsg}>{error}</p>
    }

    return null
  }

  render() {
    const { promoCode } = this.props
    const inputIcon =
      this.getInputClassName() === css.inputError ? css.inputIconError : css.inputIconSuccess

    return (
      <div className={css.inputGroup}>
        <div className={css.inputContainer}>
          <div className={css.discountLabel}>Discount code</div>
          <div className={css.inputWrapper}>
            <input
              type="text"
              name="promoCode"
              data-testing="promoCodeInput"
              value={promoCode}
              onInput={this.handleInput}
              onKeyUp={this.handleKeyUp}
              onChange={() => {}}
              className={classNames(this.getInputClassName(), checkoutCss.checkoutInput)}
            />
            <span
              className={classNames(css.inputIcon, inputIcon, { [css.isHidden]: !promoCode })}
            />
          </div>
        </div>
        {this.promoCodeAdded() && this.renderMessage()}
      </div>
    )
  }
}

PromoCode.defaultProps = defaultProps
PromoCode.propTypes = propTypes

export { PromoCode }
