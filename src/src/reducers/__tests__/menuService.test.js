import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import { menuService } from 'reducers/menuService'

describe('menuService', () => {
  describe('when action type is MENU_SERVICE_DATA_RECEIVED', () => {
    test('event dispatches when menu service data update succeeds and it updates the state', () => {

      const result = menuService({}, {
        type: actionTypes.MENU_SERVICE_DATA_RECEIVED,
        response: { test: 'test' },
      })

      const expectedResult = Immutable.Map({
        test: 'test'
      })

      expect(result).toEqual(expectedResult)
    })
  })
})
