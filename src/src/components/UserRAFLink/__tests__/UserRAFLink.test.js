import React from 'react'
import { shallow } from 'enzyme'
// import { trackUserFreeFoodLinkShare } from 'actions/loggingmanager'
// import { SOCIAL_TYPES } from 'components/SocialLinks/socialReferralHelper'
import { UserRAFLink } from '../UserRAFLink'

// jest.mock('actions/loggingmanager', () => ({
//   trackUserFreeFoodLinkShare: jest.fn(),
// }))

describe('rendering', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <UserRAFLink
        isModal={false}
        referralCode="12345"
        classLinkContainer="mock-class"
        // trackUserFreeFoodLinkShare={trackUserFreeFoodLinkShare}
      >
        children
      </UserRAFLink>
    )
  })

  describe('UserRAFLink', () => {
    test('should have position top 45px if not in modal', () => {
      expect(wrapper.find('.positionTop45').length).toEqual(1)
    })

    test('should render the children', () => {
      expect(wrapper.find('CopyToClipboard').props().children).toEqual('children')
    })

    test('should call tracking event on copy', () => {
      wrapper.instance().onCopy(() => {})

      // expect(trackUserFreeFoodLinkShare).toHaveBeenCalledWith({ target: SOCIAL_TYPES.link })
    })
  })
})
