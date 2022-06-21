import { actionTypes } from 'actions/actionTypes'

import { trackClickSubheadingBanner } from '../highlightChoiceActions'

describe('Given: trackClickSubheadingBanner() from <HighlightChoice />', () => {
  describe('When: action should is called', () => {
    test('It: should return matching object', () => {
      const expectedResult = {
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'click_subheading_banner',
        },
      }

      expect(trackClickSubheadingBanner()).toStrictEqual(expectedResult)
    })
  })
})
