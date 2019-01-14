import React, { Component } from 'react'
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
import { HowItWorks } from './HowItWorks'

class Referral extends Component {
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
    const { referralCode, rafOffer, userFirstName, trackingReferFriend, trackingReferFriendSocialSharing } = this.props
    const { isEmailModalOpen, isShareYourLinkModalOpen } = this.state
    const isDouble = rafOffer.get('expiry')
    const details = rafOffer.get('details')
    const credit = rafOffer.get('creditFormatted')

    return (
      <div className={isDouble ? css.containerBackgroundDouble : css.containerBackground}>
        <div className={css.rafPageTitle}>
          <RAFTitle />
        </div>
        <div className={css.rafOfferSection}>
          <div className={css.rafOfferBanner}>
            <div className={isDouble ? css.iconReferDouble : css.iconRefer} />
            <RAFOffer offer={rafOffer} />
          </div>
          <div className={css.rafRow}>
            <UserRAFLink className={css.rafLink} referralCode={referralCode} trackingReferFriend={trackingReferFriend} />
            <div className={`${css.socialButtons} ${css.mobileHide}`}>
              <SocialButton text="Facebook" type="facebook" onClick={() => getFacebookReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)} />
              <SocialButton text="Messenger" type="facebook-messenger" onClick={() => getMessengerReferralLink(referralCode, userFirstName, trackingReferFriendSocialSharing)} />
              <SocialButton text="Email" type="email" onClick={this.openEmailModal} />
              <Overlay open={isEmailModalOpen} from="top">
                <ReferAFriendModal
                  onClose={this.closeEmailModal}
                  credit={credit}
                />
              </Overlay>
            </div>
          </div>
        </div>
        <HowItWorks details={details} />

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
  referralCode: PropTypes.string.isRequired,
  rafOffer: PropTypes.shape({}),
  userFirstName: PropTypes.string,
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
