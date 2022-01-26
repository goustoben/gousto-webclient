import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { SocialShareButtons } from 'components/SocialLinks/SocialShareButtons'
import { SocialButton } from 'components/SocialLinks/SocialButton'
import { UserRAFLink } from 'components/UserRAFLink'
import { SocialShareSheetCTA } from 'components/SocialLinks/SocialShareSheetCTA'
import css from './ReferAFriend.css'
import { Offer } from './Offer'

const propTypes = {
  rafOffer: ImmutablePropTypes.map({
    creditFormatted: PropTypes.string,
    firstBoxDiscountFormatted: PropTypes.string,
    firstMonthDiscountFormatted: PropTypes.string,
  }),
  referralCode: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  device: PropTypes.string.isRequired,
  trackingReferFriend: PropTypes.func.isRequired,
  trackingReferFriendSocialSharing: PropTypes.func.isRequired,
  trackUserFreeFoodLinkShare: PropTypes.func.isRequired,
}

const ReferAFriend = ({ rafOffer, referralCode, userFirstName, device, trackingReferFriend, trackingReferFriendSocialSharing, trackUserFreeFoodLinkShare }) => {
  const yourOffer = rafOffer.get('creditFormatted')
  const theirBoxOffer = rafOffer.get('firstBoxDiscountFormatted')
  const theirMonthOffer = rafOffer.get('firstMonthDiscountFormatted')

  return (
    <section data-testing="referAFriendSection" className={css.rafContainer}>
      <h3 className={classnames(css.rafTitle, css.mobileHide)}>Invite your friends to try Gousto</h3>
      <h2 className={classnames(css.rafTitleMobile, css.mobileShow)}>Invite your friends to try Gousto</h2>
      <div className={css.offerContainer}>
        <Offer isYourOffer offer={yourOffer} />
        <Offer isYourOffer={false} offer={theirBoxOffer} theirMonthOffer={theirMonthOffer} />
      </div>
      <div className={css.mobileHide}>
        <UserRAFLink
          classLinkContainer={css.rafLink}
          referralCode={referralCode}
          trackingReferFriend={trackingReferFriend}
          trackUserFreeFoodLinkShare={trackUserFreeFoodLinkShare}
          isModal
        >
          <SocialButton text="Copy Invite Link" type="link" elementType="component" />
        </UserRAFLink>
        <p className={css.socialButtonsText}>Share your invite code:</p>
        <SocialShareButtons
          referralCode={referralCode}
          userFirstName={userFirstName}
          device={device}
          offerCredit={yourOffer}
          trackingReferFriendSocialSharing={trackingReferFriendSocialSharing}
          trackUserFreeFoodLinkShare={trackUserFreeFoodLinkShare}
          elementType="component"
        />
      </div>
      <div className={css.mobileShow}>
        <SocialShareSheetCTA
          referralCode={referralCode}
          trackingReferFriend={trackingReferFriend}
          isFixed={false}
        />
      </div>

    </section>
  )
}

ReferAFriend.propTypes = propTypes

export { ReferAFriend }
