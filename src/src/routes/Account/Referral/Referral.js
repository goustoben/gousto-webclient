import React, { Component } from 'react'
import PropTypes from 'prop-types'
import actionTypes from 'actions/actionTypes'
import Loading from 'routes/Menu/Loading'
import { UserRAFLink } from './UserRAFLink'
import { SocialButton } from './SocialButton'
import { ReferAFriendModal } from './ReferAFriendModal'
import { RAFTitle } from './RAFTitle'
import css from './Referral.css'
import Overlay from '../../../components/Overlay/Overlay'
import RAFOffer from './RAFOffer'
import defaultOffer from './config'
import ShareYourLinkModal from './ShareYourLinkModal'
import { getReferralLink, getFacebookReferralLink, getMessengerReferralLink } from './socialReferralHelper'
import { HowItWorks } from './HowItWorks'
import { DoubleCreditCountdown } from './DoubleCreditCountdown'

const proptypes = {
  referralCode: PropTypes.string.isRequired,
  rafOffer: PropTypes.shape({}),
  userFirstName: PropTypes.string,
  userFetchReferralOffer: PropTypes.func,
  trackingReferFriend: PropTypes.func,
  trackingReferFriendSocialSharing: PropTypes.func,
  isLoading: PropTypes.bool,
}

const defaultProps = {
  referralCode: '',
  rafOffer: defaultOffer,
  userFetchReferralOffer: () => { },
}

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

  fetchReferralOffer = () => {
    const { userFetchReferralOffer } = this.props
    userFetchReferralOffer()
  }

  componentDidMount() {
    this.fetchReferralOffer()
  }

  render() {
    const {
      referralCode,
      rafOffer,
      userFirstName,
      trackingReferFriend,
      trackingReferFriendSocialSharing,
      isLoading, 
      device
    } = this.props
    const { isEmailModalOpen, isShareYourLinkModalOpen } = this.state
    const offerTitle = rafOffer.get('title')
    const offerCredit = rafOffer.get('creditFormatted')
    const offerDetails = rafOffer.get('details')
    const offerDescription = rafOffer.get('description')
    const expiry = rafOffer.get('expiry')
    const displayLink = getReferralLink(referralCode)

    return isLoading ?
      (
        <div className={css.loadingContainer}>
          <Loading loading={isLoading} />
        </div>
      ) :
      (
        <div className={expiry ? css.containerBackgroundDouble : css.containerBackground}>
          <div className={css.rafPageTitle}>
            <RAFTitle title={offerTitle} />
          </div>
          <div className={css.rafOfferSection}>
            <div className={css.rafOfferBanner}>
              <div className={expiry ? css.iconReferDouble : css.iconRefer} />
              <RAFOffer offer={rafOffer} />
            </div>
            {expiry && <DoubleCreditCountdown description={offerDescription} expiry={expiry} fetchOffer={this.fetchReferralOffer}/>}
            <div className={expiry ? css.rafCounterPresent : css.rafRow}>
              <UserRAFLink classContainer={css.rafLink} classLinkContainer={css.linkContainer} referralCode={referralCode} trackingReferFriend={trackingReferFriend}>
                <div id="referral-code-box">
                  <span className={`${css.displayedLink}`}>{displayLink}</span>
                </div>
              </UserRAFLink>
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
            </div>
          </div>
          <HowItWorks details={offerDetails} />

          <div className={`${css.mobileCTAContainer} ${css.mobileShow}`}>
            <div className={css.mobileCTA} onClick={this.openShareYourLinkModal}>
              <span className={css.shareYourLinkText}>SHARE YOUR LINK</span>
            </div>
          </div>

          <Overlay open={isShareYourLinkModalOpen} from="bottom">
            <ShareYourLinkModal onClose={this.closeShareYourLinkModal} referralCode={referralCode} />
          </Overlay>
        </div>
      )
  }
}

Referral.propTypes = proptypes

Referral.defaultProps = defaultProps

export { Referral }

