import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import logger from 'utils/logger'
import Immutable from 'immutable'
import classNames from 'classnames'
/* eslint-disable new-cap */
import configCheckout from 'config/checkout'
import css from './PromoCode.css'

class PromoCode extends React.PureComponent {
  static propTypes = {
    promoCode: PropTypes.string,
    promoCodeApplied: PropTypes.bool,
    prices: PropTypes.instanceOf(Immutable.Map),
    loadPrices: PropTypes.func.isRequired,
    basketPromoCodeChange: PropTypes.func.isRequired,
    basketPromoCodeAppliedChange: PropTypes.func.isRequired,
    recipes: PropTypes.instanceOf(Immutable.Map),
    numPortions: PropTypes.number,
    trackPromocodeChange: PropTypes.func,
  }

  static defaultProps = {
    promoCode: '',
    promoCodeApplied: false,
    basketPromoCodeChange: () => { },
    basketPromoCodeAppliedChange: () => { },
    prices: Immutable.Map({}),
    recipes: Immutable.Map({}),
    numPortions: 2,
  }

  constructor(props) {
    super(props)

    this.state = {
      pending: false,
      errorMsg: '',
      successMsg: '',
    }
  }

  componentWillMount() {
    if (this.props.promoCode) {
      this.props.basketPromoCodeAppliedChange(true)
      this.promoCodeValidation()
    }
  }

  getInputClassName = () => {
    let className = css.input
    if (this.props.promoCode && this.state.errorMsg) {
      className = css.inputError
    } else if (this.promoCodeAdded() && this.state.successMsg) {
      className = css.inputSuccess
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

  promoCodeAdded = () => (this.props.promoCode && this.props.promoCodeApplied)

  promoCodeValidation = () => {
    const promoCodeValid = this.props.prices.get('promoCodeValid', false)
    if (promoCodeValid) {
      this.setState({ errorMsg: '', successMsg: configCheckout.errorMessage.promoCode.valid })
    } else {
      this.setError(configCheckout.errorMessage.promoCode.invalid)
    }
  }

  handlePromoCodeVerification() {
    const { promoCode } = this.props

    this.props.loadPrices().then(() => {
      console.log('loadPrice on handlePromocode')//eslint-disable-line
      this.setState({
        pending: false,
      })
      this.promoCodeValidation()
      this.props.trackPromocodeChange(promoCode, true)
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
    this.setState({
      pending: true,
    })
    if (this.props.promoCode) {
      this.props.basketPromoCodeAppliedChange(true)
      this.handlePromoCodeVerification()
    }
  }

  removePromoCode = () => {
    this.setState({
      pending: true,
    })
    const promocode = this.props.promoCode.valueOf()
    this.props.basketPromoCodeChange('')
    this.props.basketPromoCodeAppliedChange(false)
    if (this.state.successMsg) {
      this.props.loadPrices().then(() => {
        this.setState({
          pending: false,
        })
        console.log('trmov')//eslint-disable-line
        this.props.trackPromocodeChange(promocode, false)
      })
        .catch(() => {
          this.setState({
            pending: false,
          })
        })
    }
    this.setState({
      errorMsg: '',
      successMsg: '',
    })
  }

  handleInput = (event) => {
    if (!event || !event.target) {
      return
    }
    this.props.basketPromoCodeChange(event.target.value)
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
    if (this.state.errorMsg) return (<p className={css.errorMsg}>{this.state.errorMsg}</p>)

    return null
  }

  render() {
    return (
      <div>
        <div className={css.inputGroup}>
          <div className={css.inputContainer}>
            <input
              type="text"
              name="promoCode"
              placeholder="Enter promo code"
              value={this.props.promoCode}
              onInput={this.handleInput}
              onKeyUp={this.handleKeyUp}
              className={this.getInputClassName()}
            />
          </div>
          <div className={css.inputAddon}>
            <Button
              pending={this.state.pending}
              className={classNames(css.buttonContainer, {
                [css.buttonRemove]: this.promoCodeAdded(),
              })}
              width="full"
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
        </div>
        {(this.promoCodeAdded()) &&
          <div>
            {this.renderMessage()}
          </div>}
      </div>
    )
  }
}

export default PromoCode
