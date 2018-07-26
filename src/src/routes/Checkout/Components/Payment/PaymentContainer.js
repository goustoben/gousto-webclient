import { connect } from 'react-redux'
import { getFormValues, change, untouch } from 'redux-form'
import Payment from './Payment'
import actions from 'actions'

import deliveryRules from 'validations/delivery'
import { addPrefix } from 'validations/util'
import cardRules from 'validations/card'

const form = 'checkout'

function mapStateToProps(sectionName) {
	return state => {
		const formValues = getFormValues(form)(state)
		const addressFormValues = getFormValues(form)(state)
		const browser = state.request.get('browser')

		return ({
			form,
			formValues,
			deliveryAddress: addressFormValues && addressFormValues.delivery ? addressFormValues.delivery : {},
			formSectionName: sectionName,
			browser,
		})
	}
}

function connectComponent(sectionName) {
	const PaymentContainer = connect(mapStateToProps(sectionName), {
		clearErrors: actions.checkoutClearErrors,
		change,
		untouch,
	})(Payment)

	return PaymentContainer
}

export default sectionName => connectComponent(sectionName)

export function addInitialValues(Component) {
	return connect(
		(state) => {
			const { checkout } = state.form
			const initialValues = checkout && checkout.initial ? checkout.initial : {}

			return ({
				initialValues,
			})
		}
	, {})(Component)
}

export function getValidationRules(sectionName) {
	return formValues => {
		let rules = addPrefix(sectionName, cardRules)
		if (formValues[sectionName] && formValues[sectionName].isBillingAddressDifferent) {
			rules = { ...rules, ...deliveryRules(sectionName)(formValues) }
		}

		return rules
	}
}
