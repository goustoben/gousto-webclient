import menus from './testData.json'
import { dateTransformer } from './date'

describe('dateTransformer', () => {
  test('should get the second end date from the two available menus', () => {
    const testData = {
      data: [{
        "id": "295",
        "type": "menus",
        "attributes": {
          "ends_at": "2019-04-03T11:59:59+01:00"
        }
      }, {
        "id": "296",
        "type": "menus",
        "attributes": {
          "ends_at": "2019-10-20T11:59:59+01:00"
        }
      }]
    }
    const result = dateTransformer(testData)
    expect(result).toEqual("2019-10-20T11:59:59+01:00")
  })

  test('should get the second end date from complete dataset', () => {
    const menuData = menus
    const result = dateTransformer(menuData)
    expect(result).toEqual("2019-10-29T11:59:59+01:00")
  })
})
