import { actionTypes } from 'actions/actionTypes'

export const setMenuPrefetched = (menuPrefetched) => ({
  type: actionTypes.MENU_PREFETCHED,
  payload: {
    menuPrefetched
  }
})
