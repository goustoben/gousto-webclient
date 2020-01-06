import { brandDataReceived } from 'actions/brand'

describe('brandDataReceived', () => {
  test('should return an action with the correct response', () => {
    const testResponse = { testData: 'some brand' }

    const result = brandDataReceived(testResponse)

    expect(result).toEqual({
      type: 'BRAND_DATA_RECEIVED',
      response: { testData: 'some brand' },
    })
  })
})
