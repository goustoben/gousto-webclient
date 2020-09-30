import { actionTypes } from '../../../actions/actionTypes'
import * as trackingKeys from '../../../actions/trackingKeys'

export const showCategoriesModal = () => ({
  type: actionTypes.MENU_SHOW_CATEGORIES_MODAL,
  trackingData: {
    actionType: trackingKeys.clickShowAllRecipeCategories,
  },
})

export const hideCategoriesModal = () => ({
  type: actionTypes.MENU_HIDE_CATEGORIES_MODAL,
  trackingData: {
    actionType: trackingKeys.clickBackToMenu,
  },
})

export const categoryButtonClicked = () => ({
  type: actionTypes.MENU_CATEGORY_BUTTON_CLICKED,
  trackingData: {
    actionType: trackingKeys.viewRecipeCollection
  }
})
