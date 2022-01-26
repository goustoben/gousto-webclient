import { trackAppModalView, trackClickAppModalInstall } from '../appModal'

describe('AppModal actions', () => {
  test('trackAppModalView', () => {
    expect(trackAppModalView).toEqual({
      type: 'TRACKING',
      trackingData: {
        actionType: 'view_app_promotion_modal'
      }
    })
  })

  test('trackClickAppModalInstall', () => {
    expect(trackClickAppModalInstall).toEqual({
      type: 'TRACKING',
      trackingData: {
        actionType: 'click_app_modal_install'
      }
    })
  })
})
