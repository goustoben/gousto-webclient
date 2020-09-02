import formSectionName from 'validations/delivery'

const formValues = {
  delivery: {
    deliveryInstruction: 'Other',
    deliveryInstructionsCustom: 'delivery instructions',
  }
}

function getRules(isEnabled) {
  return {
    rules: [
      {
        name: 'isLength',
        options: {
          min: 5,
          ...(isEnabled && { errorEnding: ' to ensure we deliver to the right place'})
        }
      },
      {
        name: 'isLength',
        options: { max: 50 }
      }
    ],
    field: isEnabled ? 'details' : 'delivery instruction'
  }
}

describe('When formSectionName is called', () => {
  let output

  describe('And isCheckoutRedesign parameter is true', () => {
    const isCheckoutRedesignEnabled = true

    beforeEach(() => {
      output = formSectionName('delivery')(formValues, isCheckoutRedesignEnabled)
    })

    test('Then delivery.deliveryInstructionsCustom should have errorEnding parameter', () => {
      const expected = getRules(isCheckoutRedesignEnabled)

      expect(output['delivery.deliveryInstructionsCustom']).toEqual(expected)
    })
  })

  describe('And isCheckoutRedesign parameter is false', () => {
    const isCheckoutRedesignEnabled = false

    beforeEach(() => {
      output = formSectionName('delivery')(formValues, isCheckoutRedesignEnabled)
    })

    test('Then delivery.deliveryInstructionsCustom should have errorEnding parameter', () => {
      const expected = getRules(isCheckoutRedesignEnabled)

      expect(output['delivery.deliveryInstructionsCustom']).toEqual(expected)
    })
  })
})
