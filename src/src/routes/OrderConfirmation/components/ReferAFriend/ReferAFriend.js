import React from 'react'
import PropTypes from 'prop-types'
import { SocialShareButtons } from 'components/SocialLinks/SocialShareButtons'
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
    <section>
      <h3>Share the Gousto experience</h3>
      <p>Refer a friend - and you both save.</p>
      <div className={css.offerContainer}>
        <Offer isYourOffer offer={yourOffer} />
        <Offer isYourOffer={false} offer={theirBoxOffer} theirMonthOffer={theirMonthOffer} />
      </div>
      <p>Share your invite code:</p>
      <SocialShareButtons
        referralCode={referralCode}
        userFirstName={userFirstName}
        device={device}
        offerCredit={yourOffer}
        trackingReferFriendSocialSharing={trackingReferFriendSocialSharing}
        trackingReferFriend={trackingReferFriend}
        elementType='component'
      />
    </section>
  )
}

ReferAFriend.propTypes = propTypes

export { ReferAFriend }
