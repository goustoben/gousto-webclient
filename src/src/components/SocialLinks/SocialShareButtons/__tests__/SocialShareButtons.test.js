import React from 'react'
import { shallow } from 'enzyme'
import { actionTypes } from 'actions/actionTypes'
import { SocialShareButtons } from '..'
import { SOCIAL_TYPES } from '../../socialReferralHelper'
import { trackUserFreeFoodLinkShare } from "actions/loggingmanager/trackUserFreeFoodLinkShare"
import { trackingReferFriendSocialSharing } from "actions/user/trackingReferFriendSocialSharing"

jest.mock('actions/loggingmanager', () => ({
  trackUserFreeFoodLinkShare: jest.fn(),
}))

jest.mock('actions/user', () => ({
  trackingReferFriendSocialSharing: jest.fn(),
}))

jest.mock('config/globals', () => jest.fn().mockReturnValue(false))

describe('SocialShareButtons', () => {
  let wrapper

  describe('when the email button is clicked', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SocialShareButtons
          trackUserFreeFoodLinkShare={trackUserFreeFoodLinkShare}
          trackingReferFriendSocialSharing={trackingReferFriendSocialSharing}
        />
      )
      wrapper
        .find('[data-testing="freeFoodEmailCTA"]')
        .simulate('click', { preventDefault: e => e })
    })

    test('then the tracking event should be called', () => {
      expect(trackUserFreeFoodLinkShare).toHaveBeenCalledWith({ target: SOCIAL_TYPES.email })
      expect(trackingReferFriendSocialSharing).toHaveBeenCalledWith(
        actionTypes.REFER_FRIEND_LINK_SHARE,
        'ReferFriendLink Share',
        SOCIAL_TYPES.email,
      )
    })
  })
})
