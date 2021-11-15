import Immutable from 'immutable'
import { menuCutoffUntilReceive } from "actions/menu/menuCutoffUntilReceive"
import { menuServiceLoadDays } from "actions/menuServiceLoadDays/menuServiceLoadDays"

jest.mock('apis/transformers/date', () => ({
  dateTransformer: jest.fn().mockReturnValue('2019-12-03T11:59:59+00:00')
}))

jest.mock('actions/menu', () => ({
  menuCutoffUntilReceive: jest.fn()
}))

describe('menuServiceLoadDays', () => {
  const dispatch = jest.fn()
  const state = {
    menuService: Immutable.fromJS({
    }),
  }

  const getState = () => state
  test('should dispatch menuCutoffUntilReceive with the correct date', () => {
    menuServiceLoadDays(dispatch, getState)

    expect(menuCutoffUntilReceive).toHaveBeenCalledWith('2019-12-03T11:59:59+00:00')
  })
})
