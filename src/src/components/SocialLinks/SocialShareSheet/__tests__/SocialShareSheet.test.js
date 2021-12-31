import React from 'react'
import { shallow } from 'enzyme'
import { ReferAFriendContainer } from 'components/ReferAFriend'
// import { trackUserFreeFoodLinkShare } from 'actions/loggingmanager'
import { trackingReferFriendSocialSharing } from 'actions/user'
import { actionTypes } from 'actions/actionTypes'
import { SocialShareSheet } from '../SocialShareSheet'
import { LinkRow } from '../LinkRow'
import { SOCIAL_TYPES } from '../../socialReferralHelper'

// jest.mock('actions/loggingmanager', () => ({
//   trackUserFreeFoodLinkShare: jest.fn(),
// }))

jest.mock('actions/user', () => ({
  trackingReferFriendSocialSharing: jest.fn(),
}))

describe('SocialShareSheet', () => {
  describe('rendering', () => {
    let wrapper
    const mockOnClose = jest.fn()
    const referralCode = ''
    const rafOffer = {}
    beforeEach(() => {
      wrapper = shallow(
        <SocialShareSheet
          onClose={mockOnClose}
          referralCode={referralCode}
          rafOffer={rafOffer}
          // trackUserFreeFoodLinkShare={trackUserFreeFoodLinkShare}
          trackingReferFriendSocialSharing={trackingReferFriendSocialSharing}
        />
      )
    })

    test('should render a Modal Panel with onClose prop', () => {
      const modalPanelWithOnCloseProp = wrapper.find('ModalPanel').find({ closePortal: mockOnClose })
      expect(modalPanelWithOnCloseProp.length).toEqual(1)
    })

    test('should render row containing email icon and text label', () => {
      const emailRow = wrapper.find('div.row').at(1)
      const emailSvg = emailRow.find('Svg').find({ fileName: 'icon-email-colour' })

      expect(emailSvg.length).toEqual(1)
      expect(emailRow.find('span').text()).toEqual('E-mail')
    })

    test('should render row containing link icon and text label', () => {
      const copyLinkRow = wrapper.find('UserRAFLink')
      const linkSvg = copyLinkRow.find('Svg').find({ fileName: 'icon-link-colour' })

      expect(linkSvg.length).toEqual(1)
      expect(copyLinkRow.find('span').text()).toEqual('Copy link')
    })

    test('should render ReferAFriendContainer when isEmailFormOpen is true', () => {
      wrapper.setState({ isEmailFormOpen: true })
      expect(wrapper.find(ReferAFriendContainer).length).toEqual(1)
    })

    test('should render three LinkRow components', () => {
      expect(wrapper.find(LinkRow).length).toEqual(3)
    })

    test('should call tracking events when email form is opened', () => {
      wrapper
        .find('.emailHeader')
        .simulate('click', { preventDefault: e => e })

      // expect(trackUserFreeFoodLinkShare).toHaveBeenCalledWith({ target: SOCIAL_TYPES.email })
      expect(trackingReferFriendSocialSharing).toHaveBeenCalledWith(
        actionTypes.REFER_FRIEND_LINK_SHARE,
        'ReferFriendLink Share',
        SOCIAL_TYPES.email,
      )
    })
  })
})
