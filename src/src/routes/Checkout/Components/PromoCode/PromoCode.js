import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Button, Segment } from 'goustouicomponents'
import logger from 'utils/logger'
import Immutable from 'immutable'
import classNames from 'classnames'
import configCheckout from 'config/checkout'
import css from './PromoCode.css'
import redesignCss from '../../CheckoutRedesignContainer.css'

const propTypes = {
  promoCode: PropTypes.string,
  promoCodeApplied: PropTypes.bool,
  prices: PropTypes.instanceOf(Immutable.Map),
  loadPrices: PropTypes.func.isRequired,
  basketPromoCodeChange: PropTypes.func.isRequired,
  basketPromoCodeAppliedChange: PropTypes.func.isRequired,
  trackPromocodeChange: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

const defaultProps = {
  promoCode: '',
  promoCodeApplied: false,
  prices: Immutable.Map({}),
  trackPromocodeChange: () => {},
  isCheckoutOverhaulEnabled: false,
}

class PromoCode extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      pending: false,
      errorMsg: '',
      successMsg: '',
    }
  }

  componentWillMount() {
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

  getInputClassName = () => {
    const { promoCode, isCheckoutOverhaulEnabled } = this.props
    const { errorMsg, successMsg } = this.state
    let className = css.input
    if (promoCode && errorMsg) {
      className = isCheckoutOverhaulEnabled ? css.inputErrorRedesign : css.inputError
    } else if (this.promoCodeAdded() && successMsg) {
      className = isCheckoutOverhaulEnabled ? css.inputSuccessRedesign : css.inputSuccess
    }

    return className
  }

  setError = (message) => {
    if (message) {
      this.setState({
        errorMsg: message,
      })
    }
  }

  promoCodeAdded = () => {
    const { promoCode, promoCodeApplied } = this.props

    return (promoCode && promoCodeApplied)
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

  handlePromoCodeVerification() {
    const { promoCode, loadPrices, trackPromocodeChange } = this.props

    loadPrices().then(() => {
      this.setState({
        pending: false,
      })
      this.promoCodeValidation()
      trackPromocodeChange(promoCode, true)
    })
      .catch((err) => {
        this.setState({
          pending: false,
        })
        this.setError(configCheckout.errorMessage.promoCode.invalid)
        logger.error(err)
      })
  }

  applyPromoCode = () => {
    const { promoCode, basketPromoCodeAppliedChange } = this.props
    this.setState({
      pending: true,
    })
    if (promoCode) {
      basketPromoCodeAppliedChange(true)
      this.handlePromoCodeVerification()
    }
  }

  removePromoCode = () => {
    const { promoCode, basketPromoCodeChange, basketPromoCodeAppliedChange, trackPromocodeChange, loadPrices } = this.props
    const { successMsg } = this.state
    this.setState({
      pending: true,
    })
    const promocode = promoCode.valueOf()
    basketPromoCodeChange('')
    basketPromoCodeAppliedChange(false)
    if (successMsg) {
      loadPrices().then(() => {
        this.setState({
          pending: false,
        })
        trackPromocodeChange(promocode, false)
      })
        .catch(() => {
          this.setState({
            pending: false,
          })
        })
    } else {
      this.setState({
        pending: false
      })
    }
    this.setState({
      errorMsg: '',
      successMsg: '',
    })
  }

  handleInput = (event) => {
    const { basketPromoCodeChange, isCheckoutOverhaulEnabled } = this.props
    if ((!event || !event.target) && !isCheckoutOverhaulEnabled) {
      return
    } else {
      this.removePromoCode()
    }

    basketPromoCodeChange(event.target.value)
  }

  handleButtonClick = () => (this.promoCodeAdded() ? this.removePromoCode() : this.applyPromoCode())

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
    const { isCheckoutOverhaulEnabled } = this.props
    const checkoutOverhaulError = isCheckoutOverhaulEnabled && errorMsg.includes('promocode')
      ? errorMsg.replace('promocode', 'discount code') : errorMsg
    if (errorMsg) {
      return (<p className={css.errorMsg}>{checkoutOverhaulError}</p>)
    }

    return null
  }

  render() {
    const { promoCode, isCheckoutOverhaulEnabled } = this.props
    const { pending } = this.state
    const inputIcon = this.getInputClassName() === css.inputErrorRedesign
      ? css.inputIconError : css.inputIconSuccess

    return (
      <div>
        <div className={classNames(css.inputGroup, { [css.inputGroupRedesign]: isCheckoutOverhaulEnabled })}>
          <div className={css.inputContainer}>
            {isCheckoutOverhaulEnabled && <div className={css.discountLabel}>Discount code</div>}
            <div className={css.inputWrapper}>
              <input
                type="text"
                name="promoCode"
                data-testing="promoCodeInput"
                placeholder={isCheckoutOverhaulEnabled ? '' : 'Enter promo code'}
                value={promoCode}
                onInput={this.handleInput}
                onKeyUp={this.handleKeyUp}
                onChange={() => {}}
                className={classNames(this.getInputClassName(), { [redesignCss.inputRedesign]: isCheckoutOverhaulEnabled })}
              />
              {isCheckoutOverhaulEnabled && <span className={classNames(css.inputIcon, inputIcon, { [css.isHidden]: !promoCode })} />}
            </div>
          </div>
          <div className={classNames(css.inputAddon, { [css.hideCTA]: isCheckoutOverhaulEnabled })}>
            <Button
              pending={pending}
              className={classNames(css.buttonContainer, {
                [css.buttonRemove]: this.promoCodeAdded(),
              })}
              width="full"
              data-testing="promoCodeSubmit"
            >
              <Segment
                fill={!this.promoCodeAdded()}
                noHover={Boolean(this.promoCodeAdded())}
                onClick={this.handleButtonClick}
                className={this.promoCodeAdded() ? css.removeButton : css.applyButton}
              >
                {(this.promoCodeAdded()) ? <span className={css.icon} /> : 'Apply'}
              </Segment>
            </Button>
          </div>
          {(this.promoCodeAdded()) && isCheckoutOverhaulEnabled && (
            <div>
              {this.renderMessage()}
            </div>
          )}
        </div>
        {(this.promoCodeAdded()) && !isCheckoutOverhaulEnabled && (
          <div>
            {this.renderMessage()}
          </div>
        )}
      </div>
    )
  }
}

PromoCode.defaultProps = defaultProps
PromoCode.propTypes = propTypes

export default PromoCode
