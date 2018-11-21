import formContainer from '../formContainer'
import { getValidationRules } from './form'
import { sectionName } from './config'

import { CheckoutPayment } from './CheckoutPayment'

export const CheckoutPaymentContainer = formContainer(
  CheckoutPayment,
  getValidationRules(sectionName)
)
