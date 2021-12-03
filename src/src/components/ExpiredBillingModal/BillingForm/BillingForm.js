import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import { Button } from 'goustouicomponents'
import { inferCardType } from 'utils/checkout'
import { checkoutConfig } from 'config/checkout'
import Input from 'Form/Input'
import Dropdown from 'Form/Dropdown'
import Svg from 'Svg'
import { CheckoutTooltip } from 'routes/Checkout/Components/CheckoutTooltip/CheckoutTooltip'
import css from './BillingForm.module.css'

const CURRENT_YEAR = Number(moment().format('YYYY'))
const MONTHS = ['MM', ...Array.from({ length: 12 }, (v, k) => (k < 9 ? `0${k + 1}` : k + 1))].map(option => ({
  value: option === 'MM' ? '' : String(option), label: String(option),
}))
const YEARS = ['YYYY', ...Array.from({ length: 10 }, (v, k) => k + CURRENT_YEAR)].map(option => ({
  value: option === 'YYYY' ? '' : String(option).slice(-2), label: String(option),
}))
const divisor = String.fromCharCode(47)

class BillingForm extends React.PureComponent {
  static validateFormSubmit(formInput) {
    return !!(
      formInput.paymentType
      && formInput.cardHolder
      && formInput.cardNumber
      && formInput.cardType
      && formInput.cardCvv2
      && formInput.cardCvv2.length === 3
      && formInput.formCardExpiryYear
      && formInput.formCardExpiryMonth
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      paymentType: 'card',
      cardHolder: '',
      cardNumber: '',
      cardType: '',
      cardCvv2: '',
      formCardExpiryYear: '',
      formCardExpiryMonth: '',
      cardExpires: '',
      cardNameError: false,
      cardNumberError: false,
      cardTypeError: false,
      securityCodeError: false,
      expiryMonthError: false,
      expiryYearError: false,
    }
  }

  handleInputChange(label, value) {
    const { formCardExpiryMonth, formCardExpiryYear } = this.state

    let onlyDigits
    if (label === 'cardNumber' || label === 'cardCvv2') {
      onlyDigits = value.replace(/[^\d]/g, '')
    }
    if (label === 'cardCvv2') {
      return this.setState({ [label]: onlyDigits.substring(0, 3) })
    }
    if (label === 'cardNumber') {
      this.setState({ [label]: onlyDigits })
      const cardType = inferCardType(onlyDigits)
      if (checkoutConfig.supportedCardTypes.indexOf(cardType) !== -1 || cardType === '') {
        return this.setState({ cardType })
      }
    }
    if (label === 'formCardExpiryYear') {
      const expiry = formCardExpiryMonth.concat(value)
      this.setState({ cardExpires: expiry })
    } else if (label === 'formCardExpiryMonth') {
      const expiry = value.concat(formCardExpiryYear)
      this.setState({ cardExpires: expiry })
    }

    return this.setState({ [label]: value })
  }

  paymentOptions = () => checkoutConfig.cardTypeOptions.map((option) =>
    ({ ...option, subLabel: (<span className={css[option.icon]} aria-hidden="true" />)})
  )

  validateOnBlur(label, val) {
    if (label === 'cardNumberError' && val) {
      this.setState({ [label]: val.length < 10 })
    } else if (label === 'securityCodeError') {
      this.setState({ [label]: !val || val.length !== 3 })
    } else {
      this.setState({ [label]: !val })
    }
  }

  isValid() {
    return BillingForm.validateFormSubmit(this.state)
  }

  render() {
    const { isPosting, submitCardDetails } = this.props
    const {
      cardHolder,
      cardNameError,

      cardNumber,
      cardNumberError,

      cardType,
      cardTypeError,

      cardCvv2,
      securityCodeError,

      formCardExpiryMonth,
      expiryMonthError,

      formCardExpiryYear,
      expiryYearError
    } = this.state

    return (
      <div>
        <div className={css.formRow}>
          <div>
            <div className={css.formRow}>
              <div className={[css.cardRow, css.mobileOnly].join(' ')}>
                <Svg fileName="icon-Maestro-dark" className={css.iconCardObverse} />
                <Svg fileName="icon-MasterCard-dark" className={css.iconCardObverse} />
                <Svg fileName="icon-Visa-dark" className={css.iconCardObverse} />
              </div>
            </div>
            <div className={css.formRow}>
              <div className={css.formItemName}>
                <p className={css.inputTitle}>Name</p>
                <Input
                  name="formCardName"
                  type="text"
                  value={cardHolder}
                  onChange={(e) => this.handleInputChange('cardHolder', e)}
                  onBlur={() => this.validateOnBlur('cardNameError', cardHolder)}
                />
                {cardNameError ? <p className={css.errorMessage}>Name is required</p> : null}
              </div>
            </div>
            <div className={css.formRow}>
              <div className={css.formItemCardNumber}>
                <p className={css.inputTitle}>Card number</p>
                <Input
                  name="formCardNumber"
                  value={cardNumber}
                  onChange={(e) => this.handleInputChange('cardNumber', e)}
                  onBlur={() => this.validateOnBlur('cardNumberError', cardNumber)}
                />
                {cardNumberError ? <p className={css.errorMessage}>Card number should be at least 10 digits</p> : null}
              </div>
              <div className={css.formItemCardType}>
                <p className={css.inputTitle}>Card type</p>
                <Dropdown
                  name="formCardType"
                  options={this.paymentOptions()}
                  value={cardType}
                  onChange={(e) => this.handleInputChange('cardType', e)}
                  onBlur={() => this.validateOnBlur('cardTypeError', cardType)}
                />
                {cardTypeError ? <p className={css.errorMessage}>Card type is required</p> : null}
              </div>
            </div>
            <div className={css.formRow}>
              <div className={css.formItemSecurityCode}>
                <p className={css.inputTitle}>Security code</p>
                <div className={css.row}>
                  <Input
                    name="formSecurityCode"
                    value={cardCvv2}
                    onChange={(e) => this.handleInputChange('cardCvv2', e)}
                    onBlur={() => this.validateOnBlur('securityCodeError', cardCvv2)}
                  />
                  <div className={css.securityCodeTooltip}>
                    <CheckoutTooltip version="Desktop">
                      <Svg fileName="icon-card-reverse" className={css.iconCardReverse} />
                      {checkoutConfig.tooltip.security}
                    </CheckoutTooltip>
                    <CheckoutTooltip version="Mobile" placement="top">
                      {checkoutConfig.tooltip.security}
                    </CheckoutTooltip>
                  </div>
                </div>
                {securityCodeError ? <p className={[css.errorMessage, css.nowrap].join(' ')}>Security code is required</p> : null}
              </div>
            </div>
            <div className={css.formRow}>
              <div>
                <p className={css.inputTitle}>Card expiry</p>
                <div className={css.row}>
                  <div className={css.formCardMonth}>
                    <Dropdown
                      name="cardExpiryMonth"
                      options={MONTHS}
                      value={formCardExpiryMonth}
                      className={css.formCardMonth}
                      onChange={(e) => this.handleInputChange('formCardExpiryMonth', e)}
                      onBlur={() => this.validateOnBlur('expiryMonthError', formCardExpiryMonth)}
                    />
                    {expiryMonthError ? <p className={[css.errorMessage, css.formCardMonth].join(' ')}>Expiry month is required</p> : null}
                  </div>
                  <div>
                    <div className={css.separator}>{divisor}</div>
                  </div>
                  <div className={css.formCardYear}>
                    <Dropdown
                      name="cardExpiryYear"
                      options={YEARS}
                      value={formCardExpiryYear}
                      className={css.formCardYear}
                      onChange={(e) => this.handleInputChange('formCardExpiryYear', e)}
                      onBlur={() => this.validateOnBlur('expiryYearError', formCardExpiryYear)}
                    />
                    {expiryYearError ? <p className={[css.errorMessage, css.formCardYear].join(' ')}>Expiry year is required</p> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={[css.column, css.mobileHide].join(' ')}>
            <Svg fileName="icon-Maestro-dark" className={css.iconCardObverse} />
            <Svg fileName="icon-MasterCard-dark" className={css.iconCardObverse} />
            <Svg fileName="icon-Visa-dark" className={css.iconCardObverse} />
          </div>
        </div>
        <div className={css.bottom}>
          <Button
            color="primary"
            noDecoration
            onClick={() => submitCardDetails(this.state)}
            disabled={!BillingForm.validateFormSubmit(this.state)}
            pending={isPosting}
          >
            Update card details
          </Button>
        </div>
      </div>
    )
  }
}

BillingForm.propTypes = {
  isPosting: PropTypes.bool,
  submitCardDetails: PropTypes.func.isRequired,
}

BillingForm.defaultProps = {
  isPosting: false,
}

export {
  BillingForm
}
