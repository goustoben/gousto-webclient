import { getHeaderDetails } from "../helper"

describe('getHeaderDetails', () => {
  const testProps = { 
    humanDeliveryDate: "Tuesday 26th March" ,
    whenCutoff: "2019-03-20 11:59:59" ,
    deliverySlot: {
      deliveryStart: "08:00:00", 
      deliveryEnd: "18:59:59"
    }
  }
  const expectedValues = {
    deliveryDate: 'Tuesday 26th March',
    deliveryStart: '8 am',
    deliveryEnd: '7 pm',
    whenCutoffTime: '12 pm',
    whenCutoffDate: 'Wednesday 20th March',
  }
  const headerDetailsFormatted = getHeaderDetails(testProps)
  
  test('should format the values for the deliveryDate ', () => {
    expect(headerDetailsFormatted.deliveryDate).toBe(expectedValues.deliveryDate)
  })
  test('should format the values for the deliveryStart ', () => {
    expect(headerDetailsFormatted.deliveryStart).toBe(expectedValues.deliveryStart)
  })
  test('should format the values for the deliveryEnd ', () => {
    expect(headerDetailsFormatted.deliveryEnd).toBe(expectedValues.deliveryEnd)
  })
  test('should format the values for the whenCutoffTime ', () => {
    expect(headerDetailsFormatted.whenCutoffTime).toBe(expectedValues.whenCutoffTime)
  })
  test('should format the values for the whenCutoffDate ', () => {
    expect(headerDetailsFormatted.whenCutoffDate).toBe(expectedValues.whenCutoffDate)
  })
})
