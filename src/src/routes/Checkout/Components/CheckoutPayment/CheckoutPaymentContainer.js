import formContainer from '../formContainer'
import { addInitialValues, getValidationRules } from './form'
import { sectionName } from './config'

import { CheckoutPayment } from './CheckoutPayment'

export const CheckoutPaymentContainer = formContainer(
  addInitialValues(CheckoutPayment),
  getValidationRules(sectionName)
)
