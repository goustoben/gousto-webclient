import { actionTypes } from '../../../actions/actionTypes'

export const showCategoriesModal = () => ({
  type: actionTypes.MENU_SHOW_CATEGORIES_MODAL,
})

export const hideCategoriesModal = () => ({
  type: actionTypes.MENU_HIDE_CATEGORIES_MODAL,
})
