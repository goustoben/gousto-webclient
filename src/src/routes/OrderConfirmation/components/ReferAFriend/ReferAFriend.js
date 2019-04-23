import React from 'react'
import PropTypes from 'prop-types'
import { SocialShareButtons } from 'components/SocialLinks/SocialShareButtons'
import { SocialButton } from 'components/SocialLinks/SocialButton'
import { UserRAFLink } from 'components/UserRAFLink'
import { SocialShareSheetCTA } from 'components/SocialLinks/SocialShareSheetCTA'
import css from './ReferAFriend.css'
import { Offer } from './Offer'

const propTypes = {
  rafOffer: PropTypes.shape({
    creditFormatted: PropTypes.string,
    firstBoxDiscountFormatted: PropTypes.string,
    firstMonthDiscountFormatted: PropTypes.string,
  }),
  referralCode: PropTypes.string.isRequired,
  userFirstName: PropTypes.string.isRequired,
  device: PropTypes.string.isRequired,
  trackingReferFriend: PropTypes.func.isRequired,
  trackingReferFriendSocialSharing: PropTypes.func.isRequired,
}

const ReferAFriend = ({ rafOffer, referralCode, userFirstName, device, trackingReferFriend, trackingReferFriendSocialSharing }) => {
  const yourOffer = rafOffer.get('creditFormatted')
  const theirBoxOffer = rafOffer.get('firstBoxDiscountFormatted')
  const theirMonthOffer = rafOffer.get('firstMonthDiscountFormatted')

  return (
    <section className={css.rafContainer}>
      <h3>Share the Gousto experience</h3>
      <p>Refer a friend - and you both save.</p>
      <div className={css.offerContainer}>
        <Offer isYourOffer offer={yourOffer} />
        <Offer isYourOffer={false} offer={theirBoxOffer} theirMonthOffer={theirMonthOffer} />
      </div>
      <div className={css.mobileHide}>
        <UserRAFLink
          classLinkContainer={css.rafLink}
          referralCode={referralCode}
          trackingReferFriend={trackingReferFriend}
          isModal
        >
          <SocialButton text='Copy Invite Link' type='link-colour' elementType='component' />
        </UserRAFLink>
        <p>Share your invite code:</p>
        <SocialShareButtons
          referralCode={referralCode}
          userFirstName={userFirstName}
          device={device}
          offerCredit={yourOffer}
          trackingReferFriendSocialSharing={trackingReferFriendSocialSharing}
          elementType='component'
        />
      </div>
      <div className={css.mobileShow}>
        <SocialShareSheetCTA
          referralCode={referralCode}
          trackingReferFriend={trackingReferFriend}
        />
      </div>

    </section>
  )
}

ReferAFriend.propTypes = propTypes

export { ReferAFriend }
