import { isBillingAddressDifferent } from '../state'

let formValues = {}
const sectionName = 'payment'

describe('is billing address different', () => {

  beforeEach(()=>{
    formValues = {
      delivery: {},
      payment: {},
    }
  })

  test('should return false if form values is empty', () => {
    expect(isBillingAddressDifferent({}, sectionName)).toEqual(false)
  })

  test('should return false if the section name is empty', () => {
    expect(isBillingAddressDifferent(formValues, sectionName)).toEqual(false)
  })

  test('should return false if the "isBillingAddressDifferent" value is false', () => {
    formValues.payment.isBillingAddressDifferent = false
    expect(isBillingAddressDifferent(formValues, sectionName)).toEqual(false)
  })

  test('should return true if the "isBillingAddressDifferent" value is true', () => {
    formValues.payment.isBillingAddressDifferent = true
    expect(isBillingAddressDifferent(formValues, sectionName)).toEqual(true)
  })
})
