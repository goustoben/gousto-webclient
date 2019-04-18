import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from 'routes/Menu/Loading'
import { getReferralLink } from 'components/SocialLinks/socialReferralHelper'
import { SocialShareButtons } from 'components/SocialLinks/SocialShareButtons'
import { UserRAFLink } from 'components/UserRAFLink'
import { RAFTitle } from './RAFTitle'
import css from './Referral.css'

import RAFOffer from './RAFOffer'
import defaultOffer from './config'
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
  device: PropTypes.string,
}

const defaultProps = {
  referralCode: '',
  rafOffer: defaultOffer,
  userFetchReferralOffer: () => { },
}

class Referral extends Component {

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
                elementType='page'
                trackingReferFriendSocialSharing={trackingReferFriendSocialSharing}
                trackingReferFriend={trackingReferFriend}
              />
            </div>
          </div>
          <HowItWorks details={offerDetails} />
        </div>
      )
  }
}

Referral.propTypes = proptypes

Referral.defaultProps = defaultProps

export { Referral }

