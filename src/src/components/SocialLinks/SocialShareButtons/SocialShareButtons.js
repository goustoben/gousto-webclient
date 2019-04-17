import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import actionTypes from 'actions/actionTypes'
import Overlay from 'components/Overlay'
import ShareYourLinkModal from 'components/SocialLinks/ShareYourLinkModal'
import { ReferAFriendModal } from 'components/ReferAFriendModal'
import { getFacebookReferralLink, getMessengerReferralLink } from '../socialReferralHelper'
import { SocialButton } from '../SocialButton'

import css from './socialShareButtons.css'

const propTypes = {
  referralCode: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  device: PropTypes.string.isRequired,
  offerCredit: PropTypes.string.isRequired,
  trackingReferFriendSocialSharing: PropTypes.func.isRequired,
  trackingReferFriend: PropTypes.func.isRequired,
}
class SocialShareButtons extends PureComponent {
  state = { isEmailModalOpen: false, isShareYourLinkModalOpen: false }

  openEmailModal = () => {
    const { trackingReferFriendSocialSharing } = this.props
    trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Email')
    this.setState({ isEmailModalOpen: true })
  }

  closeEmailModal = () => {
    this.setState({ isEmailModalOpen: false })
  }

  openShareYourLinkModal = () => {
    const { trackingReferFriend } = this.props
    trackingReferFriend(actionTypes.REFER_FRIEND_SHARE_SHEET_OPENED, 'ReferFriendShareSheet Opened')
    this.setState({ isShareYourLinkModalOpen: true })
  }

  closeShareYourLinkModal = () => {
    const { trackingReferFriend } = this.props
    trackingReferFriend(actionTypes.REFER_FRIEND_SHARE_SHEET_CLOSED, 'ReferFriendShareSheet Closed')
    this.setState({ isShareYourLinkModalOpen: false })
  }

  render() {
    const { referralCode, userFirstName, trackingReferFriendSocialSharing, device, offerCredit } = this.props
    const { isEmailModalOpen, isShareYourLinkModalOpen } = this.state

    return (
      <section>
        <div className={`${css.socialButtons} ${css.mobileHide}`}>
          <SocialButton text="Facebook" type="facebook" onClick={() => getFacebookReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)} />
          <SocialButton text="Messenger" type="facebook-messenger" onClick={() => getMessengerReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing, device)} />
          <SocialButton text="Email" type="email" onClick={this.openEmailModal} />
          <Overlay open={isEmailModalOpen} from="top">
            <ReferAFriendModal
              onClose={this.closeEmailModal}
              credit={offerCredit}
            />
          </Overlay>
        </div>
        <div className={`${css.mobileCTAContainer} ${css.mobileShow}`}>
          <div className={css.mobileCTA} onClick={this.openShareYourLinkModal}>
            <span className={css.shareYourLinkText}>SHARE YOUR LINK</span>
          </div>
          <Overlay open={isShareYourLinkModalOpen} from="bottom">
            <ShareYourLinkModal onClose={this.closeShareYourLinkModal} referralCode={referralCode} />
          </Overlay>
        </div>
      </section>
    )
  }
}

SocialShareButtons.propTypes = propTypes

export { SocialShareButtons }
