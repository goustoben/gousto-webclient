import { normaliseData } from './normaliseData'

describe('normaliseData', () => {
  test('should take api response and normalise it', () => {
    const testData = {
      included: [{
        "id": "4e10aea9-996e-415a-92a2-3de840f8ed14",
        "type": "ingredients",
        "attributes": {}
      }, {
        "id": "91ff0bd9-aca6-4336-b0a0-512a8f40e460",
        "type": "collections",
        "attributes": {}
      }]
    }

    const result = normaliseData(testData)
    expect(result).toEqual(
      {
        "4e10aea9-996e-415a-92a2-3de840f8ed14": {
          "attributes": {},
          "id": "4e10aea9-996e-415a-92a2-3de840f8ed14",
          "type": "ingredients"
        },
        "91ff0bd9-aca6-4336-b0a0-512a8f40e460": {
          "attributes": {},
          "id": "91ff0bd9-aca6-4336-b0a0-512a8f40e460",
          "type": "collections"
        }
      })
  })
})
