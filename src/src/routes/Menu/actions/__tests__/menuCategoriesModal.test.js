import { showCategoriesModal, hideCategoriesModal } from '../menuCategoriesModal'
import { actionTypes } from '../../../../actions/actionTypes'

describe('showCategoriesModal', () => {
  test('should return a MENU_SHOW_CATEGORIES_MODAL action', () => {
    expect(showCategoriesModal()).toEqual({
      type: actionTypes.MENU_SHOW_CATEGORIES_MODAL,
    })
  })
})

describe('hideCategoriesModal', () => {
  test('should return a MENU_HIDE_CATEGORIES_MODAL action', () => {
    expect(hideCategoriesModal()).toEqual({
      type: actionTypes.MENU_HIDE_CATEGORIES_MODAL,
    })
  })
})
