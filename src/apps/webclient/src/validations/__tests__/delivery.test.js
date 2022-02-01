import { deliveryValidations } from 'validations/delivery'

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
      { name: 'isLength', options: { max: 32 } }
    ],
    field: 'delivery instruction'
  }
}

describe('When deliveryValidations is called', () => {
  let output

  describe('And formValues is {}', () => {
    beforeEach(() => {
      output = deliveryValidations({})
    })

    test('Then validation rules should not have delivery.deliveryInstructionsCustom', () => {
      expect(output['delivery.deliveryInstructionsCustom']).toBeFalsy()
    })
  })

  describe('And addressType is equal to "other"', () => {
    beforeEach(() => {
      output = deliveryValidations('delivery')(formValues.customAddressType)
    })

    test('Then validation rules should have customAddressType rules', () => {
      expect(output['delivery.customAddressType']).toBeTruthy()
    })
  })

  describe('And formValues includes deliveryInstruction', () => {
    beforeEach(() => {
      output = deliveryValidations('delivery')(formValues)
    })

    test('Then delivery.deliveryInstructionsCustom should have expected rules', () => {
      const expected = getRules()

      expect(output['delivery.deliveryInstructionsCustom']).toEqual(expected)
    })
  })

  describe('And delivery instruction option is default', () => {
    const values = {
      delivery: {
        deliveryInstruction: 'Please select an option'
      }
    }

    beforeEach(() => {
      output = deliveryValidations('delivery')(values)
    })

    test('Then delivery.phone and delivery.deliveryInstruction should have expected rules', () => {
      const expectedDeliveryRules = { errorMessage: 'Delivery instruction is required' }
      expect(output['delivery.deliveryInstruction'].rules[0](values)).toEqual(expectedDeliveryRules)
    })
  })
})
