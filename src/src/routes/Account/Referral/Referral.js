import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Loading from 'routes/Menu/Loading'
import { getReferralLink } from 'components/SocialLinks/socialReferralHelper'
import { SocialShareButtons } from 'components/SocialLinks/SocialShareButtons'
import { UserRAFLink } from 'components/UserRAFLink'
import { SocialShareSheetCTA } from 'components/SocialLinks/SocialShareSheetCTA/SocialShareSheetCTA'
import defaultOffer from 'config/referral'

import { RAFTitle } from './RAFTitle'
import css from './Referral.css'
import { RAFOffer } from './RAFOffer'
import { HowItWorks } from './HowItWorks'
import { DoubleCreditCountdown } from './DoubleCreditCountdown'

const propTypes = {
  referralCode: PropTypes.string.isRequired,
  rafOffer: ImmutablePropTypes.map({}),
  userFirstName: PropTypes.string,
  userFetchReferralOffer: PropTypes.func,
  trackingReferFriend: PropTypes.func,
  trackingReferFriendSocialSharing: PropTypes.func,
  isLoading: PropTypes.bool,
  device: PropTypes.string,
  trackUserFreeFoodPageView: PropTypes.func,
}

const defaultProps = {
  rafOffer: defaultOffer,
  userFirstName: '',
  userFetchReferralOffer: () => { },
  trackingReferFriend: () => { },
  trackingReferFriendSocialSharing: () => { },
  isLoading: false,
  device: 'desktop',
  trackUserFreeFoodPageView: () => {},
}

class Referral extends Component {
  componentDidMount() {
    const { trackUserFreeFoodPageView } = this.props
    trackUserFreeFoodPageView()

    this.fetchReferralOffer()
  }

  fetchReferralOffer = () => {
    const { userFetchReferralOffer } = this.props
    userFetchReferralOffer()
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
    const offerTitle = rafOffer.get('title')
    const offerCredit = rafOffer.get('creditFormatted')
    const offerDetails = rafOffer.get('details')
    const offerDescription = rafOffer.get('description')
    const expiry = rafOffer.get('expiry')
    const displayLink = getReferralLink(referralCode)

    return isLoading
      ? (
        <div className={css.loadingContainer}>
          <Loading loading={isLoading} />
        </div>
      )
      : (
        <div className={expiry ? css.containerBackgroundDouble : css.containerBackground}>
          <div className={css.rafPageTitle}>
            <RAFTitle title={offerTitle} />
          </div>
          <div className={css.rafOfferSection}>
            <div className={css.rafOfferBanner}>
              <div className={expiry ? css.iconReferDouble : css.iconRefer} />
              <RAFOffer offer={rafOffer} />
            </div>
            {expiry && <DoubleCreditCountdown description={offerDescription} expiry={expiry} fetchOffer={this.fetchReferralOffer} />}
            <div className={expiry ? css.rafCounterPresent : css.rafRow}>
              <UserRAFLink classContainer={css.rafLink} classLinkContainer={css.linkContainer} referralCode={referralCode} trackingReferFriend={trackingReferFriend}>
                <div id="referral-code-box">
                  <span className={`${css.displayedLink}`}>{displayLink}</span>
                </div>
              </UserRAFLink>
              <SocialShareButtons
                referralCode={referralCode}
                userFirstName={userFirstName}
                device={device}
                offerCredit={offerCredit}
                elementType="page"
                trackingReferFriendSocialSharing={trackingReferFriendSocialSharing}
              />
              <div className={css.mobileShow}>
                <SocialShareSheetCTA referralCode={referralCode} trackingReferFriend={trackingReferFriend} isFixed />
              </div>
            </div>
          </div>
          <HowItWorks details={offerDetails} />
        </div>
      )
  }
}

Referral.propTypes = propTypes

Referral.defaultProps = defaultProps

export { Referral }

