import React from 'react'
import PropTypes from 'prop-types'
import actionTypes from 'actions/actionTypes'
import { UserRAFLink } from './UserRAFLink'
import { SocialButton } from './SocialButton'
import { ReferAFriendModal } from './ReferAFriendModal'
import { RAFTitle } from './RAFTitle'
import css from './Referral.css'
import Overlay from '../../../components/Overlay/Overlay'
import RAFOffer from './RAFOffer'
import defaultOffer from './config'
import ShareYourLinkModal from './ShareYourLinkModal'
import { getFacebookReferralLink, getMessengerReferralLink } from './socialReferralHelper'

class Referral extends React.Component {
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

  componentDidMount() {
    const { userFetchReferralOffer } = this.props
    userFetchReferralOffer()
  }

  render() {
    const { referralCode, rafOffer, trackingReferFriend, trackingReferFriendSocialSharing } = this.props
    const { isEmailModalOpen, isShareYourLinkModalOpen } = this.state
    const isDouble = rafOffer.get('expiry')

    return (
      <div className={isDouble ? css.containerBackgroundDouble : css.containerBackground}>
        <div className={css.rafPageTitle}>
          <RAFTitle />
        </div>
        <div className={css.rafPageSection}>
          <div className={css.rafPageBanner}>
            <div className={isDouble ? css.iconReferDouble : css.iconRefer} />
            <RAFOffer offer={rafOffer} />
          </div>
          <div className={css.rafRow}>
            <UserRAFLink className={css.rafLink} referralCode={referralCode} trackingReferFriend={trackingReferFriend} />
            <div className={`${css.socialButtons} ${css.mobileHide}`}>
              <SocialButton text="Facebook" type="facebook" onClick={() => getFacebookReferralLink(referralCode, trackingReferFriendSocialSharing)} />
              <SocialButton text="Messenger" type="facebook-messenger" onClick={() => getMessengerReferralLink(referralCode, trackingReferFriendSocialSharing)} />
              <SocialButton text="Email" type="email" onClick={this.openEmailModal} />
              <Overlay open={isEmailModalOpen} from="top">
                <ReferAFriendModal
                  onClose={this.closeEmailModal}
                />
              </Overlay>
            </div>
          </div>
        </div>

        <div className={`${css.mobileCTAContainer} ${css.mobileShow}`}>
          <div className={css.mobileCTA} onClick={this.openShareYourLinkModal}>
            <span className={css.shareYourLinkText}>SHARE YOUR LINK</span>
          </div>
        </div>

        <Overlay open={isShareYourLinkModalOpen} from="bottom">
          <ShareYourLinkModal onClose={this.closeShareYourLinkModal} referralCode={referralCode}/>
        </Overlay>
      </div>
    )
  }
}

Referral.propTypes = {
  referralCode: PropTypes.string,
  rafOffer: PropTypes.shape({}),
  userFetchReferralOffer: PropTypes.func,
  trackingReferFriend: PropTypes.func,
  trackingReferFriendSocialSharing: PropTypes.func
}

Referral.defaultProps = {
  referralCode: '',
  rafOffer: defaultOffer,
  userFetchReferralOffer: () => { },
}

export default Referral
