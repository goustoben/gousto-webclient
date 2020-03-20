import { menuServiceDataReceived } from 'actions/menuService'
import * as trackingKeys from 'actions/trackingKeys'

describe('menuServiceDataReceived', () => {
  test('should dispatch MENU_SERVICE_DATA_RECEIVED with the correct response and tracking data', () => {
    const testResponse = {testData: '123'}
    const dispatch = jest.fn()

    menuServiceDataReceived(testResponse)(dispatch)

    expect(dispatch).toHaveBeenCalledWith({
      type: 'MENU_SERVICE_DATA_RECEIVED',
      response: {testData: '123'},
      trackingData: {
        actionType: trackingKeys.receiveMenuServiceData
      }
    })
  })

  test('should dispatch MENU_FETCH_PARAMS with the correct accessToken and menuVariant', () => {
    const dispatch = jest.fn()

    menuServiceDataReceived({}, 'token', 'menu-variant')(dispatch)

    expect(dispatch).toHaveBeenCalledWith({
      type: 'MENU_FETCH_PARAMS',
      accessToken: 'token',
      menuVariant: 'menu-variant'
    })
  })
})
