import { menuServiceDataReceived } from 'actions/menuService'
import * as trackingKeys from 'actions/trackingKeys'

describe('menuServiceDataReceived', () => {
  test('should dispatch menuServiceDataReceived with the correct response and tracking data', () => {
    const testResponse = {testData: '123'}

    const result = menuServiceDataReceived(testResponse)

    expect(result).toEqual({
      type: 'MENU_SERVICE_DATA_RECEIVED',
      response: {testData: '123'},
      trackingData: {
        actionType: trackingKeys.receiveMenuServiceData
      }
    })
  })
})
