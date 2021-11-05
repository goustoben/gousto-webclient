import { actionTypes } from 'actions/actionTypes'
import { pageChange } from 'actions/page'

describe('page actions', () => {
  describe('pageChange', () => {
    test('should return a PAGE_CHANGED action with the first argument mapped through to the newLocation property', () => {
      const result = pageChange('the new location')
      expect(result).toEqual({
        type: actionTypes.PAGE_CHANGED,
        newLocation: 'the new location',
        trackingData: {
          actionType: actionTypes.PAGE_CHANGED,
          newLocation: 'the new location',
        },
      })
    })
  })
})
