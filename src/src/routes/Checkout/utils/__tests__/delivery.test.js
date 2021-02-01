import { isAddressConfirmed, transformAddresses, showAddress } from '../delivery'

describe('delivery utils', () => {
  describe('given isAddressConfirmed', () => {
    let formValues
    let output

    describe('when isAddressConfirmed is called and confirmed is true', () => {
      beforeEach(() => {
        formValues = {
          delivery: {
            confirmed: true
          }
        }
        output = isAddressConfirmed(formValues)
      })

      test('then should return proper response', () => {
        expect(output).toEqual(true)
      })
    })

    describe('when isAddressConfirmed is called and confirmed is false', () => {
      beforeEach(() => {
        formValues = {
          delivery: {
            confirmed: false
          }
        }
        output = isAddressConfirmed(formValues)
      })

      test('then should return proper response', () => {
        expect(output).toEqual(false)
      })
    })
  })

  describe('given transformAddresses', () => {
    let isCheckoutOverhaulEnabled
    let output

    describe('when isCheckoutOverhaulEnabled is true', () => {
      describe('and transformAddresses is called', () => {
        beforeEach(() => {
          isCheckoutOverhaulEnabled = true
          const addresses = [
            {
              id: 'placeholder',
              labels: ['text, hello', 'text', 'text', 'text']
            }
          ]
          output = transformAddresses(addresses, isCheckoutOverhaulEnabled)
        })

        test('then should return proper values', () => {
          const expected = [
            {
              value: 'placeholder',
              label: 'Please select your address'
            }
          ]
          expect(output).toEqual(expected)
        })
      })
    })

    describe('when isCheckoutOverhaulEnabled is true', () => {
      describe('and transformAddresses is called', () => {
        beforeEach(() => {
          isCheckoutOverhaulEnabled = false
          const addresses = [
            {
              id: 1,
              labels: ['text1', 'text2', 'text3', 'text4']
            }
          ]
          output = transformAddresses(addresses, isCheckoutOverhaulEnabled)
        })

        test('then should return proper values', () => {
          const expected = [
            {
              value: 1,
              label: 'text4, text3, text2, text1'
            }
          ]
          expect(output).toEqual(expected)
        })
      })
    })
  })

  describe('given showAddress', () => {
    let output
    const addresses = {
      houseNo: '10',
      street: 'street',
      town: 'town',
      county: 'county',
      postcode: 'postcode',
    }

    describe('when showAddress is called', () => {
      beforeEach(() => {
        output = showAddress(addresses)
      })

      test('then should return proper values', () => {
        const expected = '10, street, town, county, postcode'
        expect(output).toEqual(expected)
      })
    })

    describe('when isCheckoutOverhaulRedesign is true', () => {
      describe('and showAddress is called', () => {
        beforeEach(() => {
          output = showAddress(addresses, true)
        })

        test('then should return proper values', () => {
          const expected = '10, Street, Town, County, postcode'
          expect(output).toEqual(expected)
        })
      })
    })
  })
})
