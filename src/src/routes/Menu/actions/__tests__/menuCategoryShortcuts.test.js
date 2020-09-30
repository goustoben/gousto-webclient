import { actionTypes } from '../../../../actions/actionTypes'
import * as trackingKeys from '../../../../actions/trackingKeys'
import { categoryShortcutClicked } from '../menuCategoryShortcuts'

describe('menuCategoryShortcuts', () => {
  describe('categoryShortcutClicked', () => {
    test('should return a MENU_CATEGORY_SHORTCUT_CLICKED action', () => {
      expect(categoryShortcutClicked({ shortcutName: 'test' })).toEqual({
        type: actionTypes.MENU_CATEGORY_SHORTCUT_CLICKED,
        trackingData: {
          actionType: trackingKeys.clickCategoryShortcut,
          shortcutName: 'test'
        },
      })
    })
  })
})
