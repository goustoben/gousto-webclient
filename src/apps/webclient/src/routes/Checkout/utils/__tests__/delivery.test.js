import {
  isAddressConfirmed,
  transformAddresses,
  showAddress,
  transformAddressParts,
} from '../delivery'

describe('delivery utils', () => {
  describe('given isAddressConfirmed', () => {
    let formValues
    let output

    describe('when isAddressConfirmed is called and confirmed is true', () => {
      beforeEach(() => {
        formValues = {
          delivery: {
            confirmed: true,
          },
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
            confirmed: false,
          },
        }
        output = isAddressConfirmed(formValues)
      })

      test('then should return proper response', () => {
        expect(output).toEqual(false)
      })
    })
  })

  describe('given transformAddresses', () => {
    let output

    describe('when transformAddresses is called', () => {
      beforeEach(() => {
        const addresses = [
          {
            id: 'placeholder',
            labels: ['text, hello', 'text', 'text', 'text'],
          },
        ]
        output = transformAddresses(addresses)
      })

      test('then should return proper values', () => {
        const expected = [
          {
            value: 'placeholder',
            label: 'Please select your address',
          },
        ]
        expect(output).toEqual(expected)
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
        const expected = '10, Street, Town, County, postcode'
        expect(output).toEqual(expected)
      })

      describe('and when an address field contains a comma', () => {
        beforeEach(() => {
          const commaAddresses = {
            houseNo: '10',
            street: 'street',
            town: 'town, with, a, comma',
            county: 'county',
            postcode: 'postcode',
          }
          output = showAddress(commaAddresses)
        })

        test('then it should return proper values', () => {
          const expected = '10, Street, Town, With, A, Comma, County, postcode'
          expect(output).toEqual(expected)
        })
      })
    })

    describe('when called with the empty address', () => {
      test('then the result is the empty string', () => {
        expect(showAddress(null)).toBe('')
      })
    })
  })

  describe('given transformAddressParts', () => {
    let output

    describe('when transformAddressParts is called', () => {
      beforeEach(() => {
        const address = '1ST BEAUTIFUL ROAD'
        output = transformAddressParts(address)
      })

      test('then should return proper response', () => {
        expect(output).toEqual('1st Beautiful Road')
      })
    })
  })
})
