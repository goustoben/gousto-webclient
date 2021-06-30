import PasswordValidator from 'password-validator'
import { commonWords } from './commonPassWords'

const schema = new PasswordValidator()

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(255) // Maximum length 255
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digit
  .has()
  .symbols(1) // Must have at least 1 symbol

const commonWordsSchema = new PasswordValidator()
commonWordsSchema.is().not().oneOf(commonWords) // Must not have common words

export const validator = (value) => {
  let errors = [
    ...schema.validate(value, { list: true }),
    ...commonWordsSchema.validate(value && value.toLowerCase(), { list: true }),
  ]

  if (!errors.includes('digits')) {
    errors = errors.filter((error) => error !== 'symbols')
  }

  if (!errors.includes('symbols')) {
    errors = errors.filter((error) => error !== 'digits')
  }

  return value && errors.length > 0 ? errors : undefined
}
