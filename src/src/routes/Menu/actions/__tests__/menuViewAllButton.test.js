import { viewAllFooterButtonClicked } from '../menuViewAllButton'
import { actionTypes } from '../../../../actions/actionTypes'
import * as trackingKeys from '../../../../actions/trackingKeys'

describe('menuViewAllButton', () => {
  describe('viewAllFooterButtonClicked', () => {
    test('should return a MENU_CLICK_SHOW_ALL_RECIPES_FOOTER action', () => {
      expect(viewAllFooterButtonClicked()).toEqual({
        type: actionTypes.MENU_CLICK_SHOW_ALL_RECIPES_FOOTER,
        trackingData: {
          actionType: trackingKeys.clickShowAllRecipesFooter,
        },
      })
    })
  })
})
