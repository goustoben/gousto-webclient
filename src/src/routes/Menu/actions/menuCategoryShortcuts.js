import { clickCategoryShortcut } from 'actions/trackingKeys'
import { actionTypes } from 'actions/actionTypes'

export const categoryShortcutClicked = ({ shortcutName }) => ({
  type: actionTypes.MENU_CATEGORY_SHORTCUT_CLICKED,
  trackingData: {
    actionType: clickCategoryShortcut,
    shortcutName
  }
})
