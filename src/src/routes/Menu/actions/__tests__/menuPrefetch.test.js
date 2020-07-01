import { actionTypes } from '../../../../actions/actionTypes'
import { setMenuPrefetched } from '../menuPrefetch'

describe('menuPrefetch', () => {
  test('should return menuPrefetched action with payload', () => {
    const result = setMenuPrefetched(true)

    expect(result).toEqual({
      type: actionTypes.MENU_PREFETCHED,
      payload: {
        menuPrefetched: true
      }
    })
  })
})
