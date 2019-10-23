import menus from './testData.json'
import { collectionsTransformer } from './collections'

describe('collectionTransformer', () => {
  test('should transform data into format expected by UI', () => {

    const expectedFormat = [{
      "colour":"#FA8A3A",
      "default":false,
      "description":"The week's selection of beef & pork recipes ",
      "id":"2fef860c-2ee4-11e9-a326-06399ef4685e",
      "isCookbook":false,
      "order":600,
      "published": true,
      "shortTitle":"Beef & Pork",
      "slug":"beef-pork"
    }, {
      "colour":"#E0674E",
      "default":false,
      "description":"This week’s selection for vegetarians",
      "id":"5c117c20-8b05-11e6-8538-065f01f5b2df",
      "isCookbook":false,
      "order":800,
      "published": true,
      "shortTitle":"Vegetarian",
      "slug":"vegetarian"
    }, {
      "colour":"#E0674E",
      "default":false,
      "description":"All recipes that adhere to our Healthy & Umbrella Healthy criteria",
      "id":"6067fb3e-afbe-11e8-8ee6-0645394f11ea",
      "isCookbook":false,
      "order":300,
      "published": true,
      "shortTitle":"Healthy Choices",
      "slug":"healthy-choices"
    }]
    const result = collectionsTransformer(menus)
    expect(result).toEqual(expectedFormat)
  })
})
