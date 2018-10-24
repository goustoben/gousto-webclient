import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import { Button } from 'goustouicomponents'
import { inferCardType } from 'utils/checkout'
import config from 'config/checkout'
import css from './BillingForm.css'
import Input from 'Form/Input'
import Dropdown from 'Form/Dropdown'
import Svg from 'Svg'
import CheckoutTooltip from 'routes/Checkout/Components/CheckoutTooltip/CheckoutTooltip'

const CURRENT_YEAR = Number(moment().format('YYYY'))
const MONTHS = ['MM', ...Array.from({ length: 12 }, (v, k) => (k < 9 ? `0${k + 1}` : k + 1))].map(option => ({
	value: option === 'MM' ? '' : String(option), label: String(option),
}))
const YEARS = ['YYYY', ...Array.from({ length: 10 }, (v, k) => k + CURRENT_YEAR)].map(option => ({
	value: option === 'YYYY' ? '' : String(option).slice(-2), label: String(option),
}))
const divisor = String.fromCharCode(47)

class BillingForm extends React.PureComponent {
	static propTypes = {
		isPosting: PropTypes.bool,
		fetchError: PropTypes.func,
	}

	static defaultProps = {
		isPosting: false,
	}

	paymentOptions() {
		return config.cardTypeOptions.map((option) =>
			Object.assign({}, option, { subLabel: (<span className={css[option.icon]} aria-hidden="true" />) })
		)
	}

	constructor() {
		super()
		this.state = {
			payment_type: 'card',
			card_holder: '',
			card_number: '',
			card_type: '',
			card_cvv2: '',
			formCardExpiryYear: '',
			formCardExpiryMonth: '',
			card_expires: '',
			cardNameError: false,
			cardNumberError: false,
			cardTypeError: false,
			securityCodeError: false,
			expiryMonthError: false,
			expiryYearError: false,
		}
	}

	handleInputChange(label, value) {
		let onlyDigits
		if (label === 'card_number' || label === 'card_cvv2') {
			onlyDigits = value.replace(/[^\d]/g, '')
		}
		if (label === 'card_cvv2') {
			return this.setState({ [label]: onlyDigits.substring(0, 3) })
		}
		if (label === 'card_number') {
			this.setState({ [label]: onlyDigits })
			const cardType = inferCardType(onlyDigits)
			if (config.supportedCardTypes.indexOf(cardType) !== -1 || cardType === '') {
				return this.setState({ card_type: cardType })
			}
		}
		if (label === 'formCardExpiryYear') {
			const expiry = this.state.formCardExpiryMonth.concat(value)
			this.setState({ card_expires: expiry })
		} else if (label === 'formCardExpiryMonth') {
			const expiry = value.concat(this.state.formCardExpiryYear)
			this.setState({ card_expires: expiry })
		}

		return this.setState({ [label]: value })
	}

	static validateFormSubmit(formInput) {
		return !!(
			formInput.payment_type &&
			formInput.card_holder &&
			formInput.card_number &&
			formInput.card_type &&
			formInput.card_cvv2 &&
			formInput.card_cvv2.length === 3 &&
			formInput.formCardExpiryYear &&
			formInput.formCardExpiryMonth
		)
	}

	validateOnBlur(label, val) {
		if (label === 'cardNumberError' && val) {
			this.setState({ [label]: val.length < 10 })
		} else if (label === 'securityCodeError') {
			this.setState({ [label]: !val || val.length !== 3 })
		} else {
			this.setState({ [label]: !val })
		}
	}

	render() {
		const formInput = this.state

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
									value={formInput.card_holder}
									onChange={(e) => this.handleInputChange('card_holder', e)}
									onBlur={() => this.validateOnBlur('cardNameError', this.state.card_holder)}
								/>
								{this.state.cardNameError ? <p className={css.errorMessage}>Name is required</p> : null}
							</div>
						</div>
						<div className={css.formRow}>
							<div className={css.formItemCardNumber}>
								<p className={css.inputTitle}>Card number</p>
								<Input
									name="formCardNumber"
									value={formInput.card_number}
									onChange={(e) => this.handleInputChange('card_number', e)}
									onBlur={() => this.validateOnBlur('cardNumberError', this.state.card_number)}
								/>
								{this.state.cardNumberError ? <p className={css.errorMessage}>Card number should be at least 10 digits</p> : null}
							</div>
							<div className={css.formItemCardType}>
								<p className={css.inputTitle}>Card type</p>
								<Dropdown name="formCardType" options={this.paymentOptions()} value={formInput.card_type} onChange={(e) => this.handleInputChange('card_type', e)} onBlur={() => this.validateOnBlur('cardTypeError', this.state.card_type)} />
								{this.state.cardTypeError ? <p className={css.errorMessage}>Card type is required</p> : null}
							</div>
						</div>
						<div className={css.formRow}>
							<div className={css.formItemSecurityCode}>
								<p className={css.inputTitle}>Security code</p>
								<div className={css.row}>
									<Input name="formSecurityCode" value={formInput.card_cvv2} onChange={(e) => this.handleInputChange('card_cvv2', e)} onBlur={() => this.validateOnBlur('securityCodeError', this.state.card_cvv2)} />
									<div className={css.securityCodeTooltip}>
										<CheckoutTooltip version="Desktop">
											<Svg fileName="icon-card-reverse" className={css.iconCardReverse} />
											{config.tooltip.security}
										</CheckoutTooltip>
										<CheckoutTooltip version="Mobile" placement="top">
											{config.tooltip.security}
										</CheckoutTooltip>
									</div>
								</div>
								{this.state.securityCodeError ? <p className={[css.errorMessage, css.nowrap].join(' ')}>Security code is required</p> : null}
							</div>
						</div>
						<div className={css.formRow}>
							<div>
								<p className={css.inputTitle}>Card expiry</p>
								<div className={css.row}>
									<div className={css.formCardMonth}>
										<Dropdown name="cardExpiryMonth" options={MONTHS} value={formInput.formCardExpiryMonth} className={css.formCardMonth} onChange={(e) => this.handleInputChange('formCardExpiryMonth', e)} onBlur={() => this.validateOnBlur('expiryMonthError', this.state.formCardExpiryMonth)} />
										{this.state.expiryMonthError ? <p className={[css.errorMessage, css.formCardMonth].join(' ')}>Expiry month is required</p> : null}
									</div>
									<div>
										<div className={css.separator}>{divisor}</div>
									</div>
									<div className={css.formCardYear}>
										<Dropdown name="cardExpiryYear" options={YEARS} value={formInput.formCardExpiryYear} className={css.formCardYear} onChange={(e) => this.handleInputChange('formCardExpiryYear', e)} onBlur={() => this.validateOnBlur('expiryYearError', this.state.formCardExpiryYear)} />
										{this.state.expiryYearError ? <p className={[css.errorMessage, css.formCardYear].join(' ')}>Expiry year is required</p> : null}
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
						color={'primary'}
						noDecoration
						onClick={() => this.props.submitCardDetails(formInput)}
						disabled={!BillingForm.validateFormSubmit(formInput)}
						pending={this.props.isPosting}
					>
						Update card details
					</Button>
				</div>
			</div>
		)
	}
}

export default BillingForm
