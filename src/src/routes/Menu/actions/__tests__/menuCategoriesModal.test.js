import { showCategoriesModal, hideCategoriesModal } from '../menuCategoriesModal'
import { actionTypes } from '../../../../actions/actionTypes'
import * as trackingKeys from '../../../../actions/trackingKeys'

describe('showCategoriesModal', () => {
  test('should return a MENU_SHOW_CATEGORIES_MODAL action', () => {
    expect(showCategoriesModal()).toEqual({
      type: actionTypes.MENU_SHOW_CATEGORIES_MODAL,
      trackingData: {
        actionType: trackingKeys.clickShowAllRecipeCategories,
      },
    })
  })
})

describe('hideCategoriesModal', () => {
  test('should return a MENU_HIDE_CATEGORIES_MODAL action', () => {
    expect(hideCategoriesModal()).toEqual({
      type: actionTypes.MENU_HIDE_CATEGORIES_MODAL,
      trackingData: {
        actionType: trackingKeys.clickBackToMenu,
      },
    })
  })
})
