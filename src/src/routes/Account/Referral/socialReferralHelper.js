import globals from 'config/globals'
import actionTypes from 'actions/actionTypes'

export const getFacebookReferralLink = (referralCode, trackingReferFriendSocialSharing) => {
  trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Facebook')

  const referralLink = `https://cook.gousto.co.uk/raf/?promo_code=${referralCode}&utm_campaign=raf_facebook_share`

  if (globals.client) {
    window.FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: referralLink,
      redirect_uri: referralLink,
    })
  }
}

export const getMessengerReferralLink = (referralCode, trackingReferFriendSocialSharing) => {
  trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Messenger')

  const referralLink = `https://cook.gousto.co.uk/raf/?promo_code=${referralCode}&utm_campaign=raf_messenger_share`

  if (globals.client) {
    window.FB.ui({
      method: 'send',
      mobile_iframe: true,
      link: referralLink,
      redirect_uri: referralLink,
    })
  }
}
