import { menuServiceDataReceived } from 'actions/menuService'
import * as trackingKeys from 'actions/trackingKeys'

describe('menuServiceDataReceived', () => {
  test('should dispatch MENU_SERVICE_DATA_RECEIVED with the normalised response and tracking data', () => {
    const testResponse = {
      data: {},
      included: [
        {type: 'recipe', id: 'uuid-recipe', attributes: { core_recipe_id: '1234' }},
        {type: 'collection', id: 'uuid-collection'}
      ],
      meta: {}
    }
    const normalisedResponse = {
      data: {},
      recipe: {1234: {type: 'recipe', id: 'uuid-recipe', attributes: { core_recipe_id: '1234' }}},
      collection: {'uuid-collection': {type: 'collection', id: 'uuid-collection' }},
      meta: {}
    }
    const dispatch = jest.fn()

    menuServiceDataReceived(testResponse)(dispatch)

    expect(dispatch).toHaveBeenCalledWith({
      type: 'MENU_SERVICE_DATA_RECEIVED',
      response: normalisedResponse,
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
