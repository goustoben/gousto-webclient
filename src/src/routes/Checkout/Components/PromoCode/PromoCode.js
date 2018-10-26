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
	}

	static defaultProps = {
		promoCode: '',
		promoCodeApplied: false,
		basketPromoCodeChange: () => {},
		basketPromoCodeAppliedChange: () => {},
		prices: Immutable.Map({}),
		recipes: Immutable.Map({}),
		numPortions: 2,
	}

	constructor(props) {
		super(props)

		this.state = {
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
		this.props.loadPrices().then(() => {
			this.promoCodeValidation()
		})
			.catch((err) => {
				this.setError(configCheckout.errorMessage.promoCode.invalid)
				logger.error(err.message)
			})
	}

	applyPromoCode = () => {
		if (this.props.promoCode) {
			this.props.basketPromoCodeAppliedChange(true)
			this.handlePromoCodeVerification()
		}
	}

	removePromoCode = () => {
		this.props.basketPromoCodeChange('')
		this.props.basketPromoCodeAppliedChange(false)
		if (this.state.successMsg) {
			this.props.loadPrices()
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
		clearTimeout(this.debounceTimeout)
		this.props.basketPromoCodeChange(event.target.value)
		if (event.target.value.length < 2) {
			this.props.basketPromoCodeAppliedChange(false)
			this.setState({
				errorMsg: '',
				successMsg: '',
			})

			return
		}
		this.debounceTimeout = setTimeout(() => {
			this.applyPromoCode()
		}, configCheckout.promoValidationTime)
	}

	handleButtonClick = () => (this.promoCodeAdded() ? this.removePromoCode() : this.applyPromoCode())

	/**
	 * handle enter and space
	 * @param e
	 */
	handlePromoKeyUp = (e) => {
		if (e.keyCode && (e.keyCode === 13 || e.keyCode === 32)) {
			clearTimeout(this.debounceTimeout)
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
							onKeyUp={this.handlePromoKeyUp}
							className={this.getInputClassName()}
						/>
					</div>
					<div className={css.inputAddon}>
						<Button
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
				{(this.promoCodeAdded()) && <div>
						{this.renderMessage()}
				</div>}
			</div>
		)
	}
}

export default PromoCode
