import sinon from 'sinon'

import actionTypes from 'actions/actionTypes'
import pageActions from 'actions/page'

describe('page actions', () => {
  describe('pageChange', () => {
    test('should return a PAGE_CHANGE action with the first argument mapped through to the newLocation property', () => {
      const result = pageActions.pageChange('the new location')
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
