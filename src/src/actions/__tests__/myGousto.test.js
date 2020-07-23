import { actionTypes } from 'actions/actionTypes'
import {
  trackNextBoxTrackingClick,
} from 'actions/myGousto'

describe('myGousto actions', () => {
  describe('trackNextBoxTrackingClick', () => {
    test('creates the tracking action', () => {
      const orderId = '12345'

      expect(trackNextBoxTrackingClick(orderId)).toEqual({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'TrackMyBox Clicked',
          orderId,
        }
      })
    })
  })
})
