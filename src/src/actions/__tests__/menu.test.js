import Immutable from 'immutable'
import actionTypes from 'actions/actionTypes'
import menuActions from 'actions/menu'

jest.mock('apis/recipes', () => ({
  fetchAvailableDates: jest.fn().mockImplementation(() => {
    const getData = async () => ({ data: [{ until: '2020-06-19' }, { until: '2020-06-26' }] })

    return getData()
  })
}))

describe('menu actions', () => {
  describe('menuLoadDays', () => {

    const dispatch = jest.fn()

    const mainState = {
      auth: Immutable.fromJS({
        accessToken: 'test',
      })
    }

    const getStateSpy = jest.fn().mockReturnValue({
      ...mainState
    })

    test('should fetch days and dispatch action with MENU_CUTOFF_UNTIL_RECEIVE type', async () => {

      await menuActions.menuLoadDays()(dispatch, getStateSpy)

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
        cutoffUntil: '2020-06-26',
      }))
    })
  })

  describe('menuCutoffUntilRecieve', () => {
    test('should return a MENU_CUTOFF_UNTIL_RECIEVE action with the first argument mapped through to the cutoffUntil property', () => {
      const result = menuActions.menuCutoffUntilReceive('2020-06-26')
      expect(result).toEqual(expect.objectContaining({
        type: actionTypes.MENU_CUTOFF_UNTIL_RECEIVE,
        cutoffUntil: '2020-06-26',
      }))
    })
  })
})
