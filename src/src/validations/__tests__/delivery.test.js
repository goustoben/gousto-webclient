import formSectionName from 'validations/delivery'

const formValues = {
  delivery: {
    deliveryInstruction: 'Other',
    deliveryInstructionsCustom: 'delivery instructions',
  },
  customAddressType: {
    delivery: {
      addressType: 'Other'
    }
  },
}

function getRules() {
  return {
    rules: [
      { name: 'isLength', options: { min: 5 } },
      { name: 'isLength', options: { max: 50 } }
    ],
    field: 'delivery instruction'
  }
}

describe('When formSectionName is called', () => {
  let output

  describe('And formValues is undefined', () => {
    beforeEach(() => {
      output = formSectionName()
    })

    test('Then validation rules should not have delivery.deliveryInstructionsCustom', () => {
      expect(output['delivery.deliveryInstructionsCustom']).toBeFalsy()
    })
  })

  describe('And addressType is equal to "other"', () => {
    beforeEach(() => {
      output = formSectionName('delivery')(formValues.customAddressType)
    })

    test('Then validation rules should have customAddressType rules', () => {
      expect(output['delivery.customAddressType']).toBeTruthy()
    })
  })

  describe('And formValues includes deliveryInstruction', () => {
    beforeEach(() => {
      output = formSectionName('delivery')(formValues)
    })

    test('Then delivery.deliveryInstructionsCustom should have expected rules', () => {
      const expected = getRules()

      expect(output['delivery.deliveryInstructionsCustom']).toEqual(expected)
    })
  })
})
