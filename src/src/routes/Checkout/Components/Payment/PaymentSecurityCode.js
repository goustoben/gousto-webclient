import React from 'react'
import Svg from 'Svg'
import { Field } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import config from 'config/checkout'
import CheckoutTooltip from '../CheckoutTooltip/CheckoutTooltip'
import cssPayment from './Payment.css'
import cssSecurityCode from './PaymentSecurityCode.css'

const css = {
  ...cssPayment,
  ...cssSecurityCode,
}

const normalizeSecurityCode = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')

  if (onlyNums.length > 3) {
    return onlyNums.substring(0, onlyNums.length - 1)
  }

  return onlyNums
}

/**
 * Payment Security Code
 * @constructor
 */
const PaymentSecurityCode = ({ receiveRef, sectionName }) => (
	<div>
		<div className={css.securityCodeWrapper}>
			<div className={css.securityCodeField}>
				<Field
				  name="cv2"
				  component={ReduxFormInput}
				  inputType="Input"
				  pattern="[0-9]*"
				  color="gray"
				  label="Security code"
				  mask
				  normalize={normalizeSecurityCode}
				  withRef
				  ref={receiveRef}
				  refId={`${sectionName}.cv2`}
				  data-testing="checkoutCardSecurityCodeInput"
				/>
			</div>
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
	</div>
)

PaymentSecurityCode.propTypes = {
  receiveRef: React.PropTypes.func,
  sectionName: React.PropTypes.string.isRequired,
}

PaymentSecurityCode.defaultProps = {
  receiveRef: () => {},
}

export default PaymentSecurityCode
