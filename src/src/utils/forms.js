import parsePhoneNumber, { isValidPhoneNumber } from 'libphonenumber-js'

export const emailValidator = value => (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Please provide a valid email address' : undefined)
export const phoneValidator = value => {
  const phone = value && parsePhoneNumber(value)
  const isValid = value && isValidPhoneNumber(value, 'GB')

  return !value || (phone && phone.country !== 'GB') || !isValid ? 'Enter a UK phone number' : undefined
}
