import {parsePhoneNumber, isValidPhoneNumber} from 'utils/phoneNumber/phoneNumber'

const validNumber = '447975777666'
const invalidNumber = '791234567890'

describe('phoneNumberValidation', () => {
  test('validNumberIsValid', () => {
    const res = isValidPhoneNumber(validNumber, 'GB')

    expect(res).toEqual(true)
  })

  test('invalidNumberIsInvalid', () => {
    const res = isValidPhoneNumber(invalidNumber, 'GB')

    expect(res).toEqual(false)
  })

  test('parsePhoneNumber', () => {
    const res = parsePhoneNumber(validNumber, 'GB')

    expect(res.countryCallingCode).toEqual('44')
    expect(res.nationalNumber).toEqual('7975777666')
  })
})
