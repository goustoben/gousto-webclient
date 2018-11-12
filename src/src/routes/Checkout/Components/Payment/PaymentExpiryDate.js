import React from 'react'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import moment from 'moment'
import css from './Payment.css'

const CURRENT_YEAR = Number(moment().format('YYYY'))
const MONTHS = ['MM', ...Array.from({ length: 12 }, (v, k) => (k < 9 ? `0${k + 1}` : k + 1))].map(option => ({ value: option === 'MM' ? '' : String(option), label: String(option) }))
const YEARS = ['YYYY', ...Array.from({ length: 10 }, (v, k) => k + CURRENT_YEAR)].map(option => ({ value: option === 'YYYY' ? '' : String(option).slice(-2), label: String(option) }))
const divisor = String.fromCharCode(47)

const PaymentExpiryDate = ({ receiveRef, sectionName }) => (
	<div>
		<div className={css.row}>
			<div className={css.colMDhalf}>
				<label>Card expiry</label>
				<div className={css.dropdownWrapper}>
					<div className={css.month} data-testing="checkoutCardExpiryMonthDropdown">
						<Field
						  name="cardExpiryMonth"
						  component={ReduxFormInput}
						  inputType="DropDown"
						  mask
						  options={MONTHS}
						  className="expiryMonth"
						  withRef
						  ref={receiveRef}
						  refId={`${sectionName}.cardExpiryMonth`}
						/>
					</div>
					<div className={css.divisor}>{divisor}</div>
					<div className={css.year} data-testing="checkoutCardExpiryYearDropdown">
						<Field
						  name="cardExpiryYear"
						  component={ReduxFormInput}
						  inputType="DropDown"
						  options={YEARS}
						  className="expiryYear"
						  mask
						  withRef
						  ref={receiveRef}
						  refId={`${sectionName}.cardExpiryYear`}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
)

PaymentExpiryDate.propTypes = {
  receiveRef: React.PropTypes.func,
  sectionName: React.PropTypes.string.isRequired,
}

PaymentExpiryDate.defaultProps = {
  receiveRef: () => {},
}

export default PaymentExpiryDate
