import { actionTypes } from '../../../../actions/actionTypes'
import { setMenuPrefetched } from "routes/Menu/actions/menuPrefetch/setMenuPrefetched"

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
