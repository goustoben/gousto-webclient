import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'
import { validateEmail } from 'utils/auth'

export const emailValidator = value => (!value || !validateEmail(value) ? 'Please provide a valid email address' : undefined)
export const phoneValidator = value => {
  const phone = value && parsePhoneNumber(value)
  const isValid = value && isValidPhoneNumber(value, 'GB')

  return !value || (phone && phone.country !== 'GB') || !isValid ? 'Enter a UK phone number' : undefined
}
