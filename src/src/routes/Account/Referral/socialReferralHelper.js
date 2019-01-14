import globals from 'config/globals'
import actionTypes from 'actions/actionTypes'

export const getFacebookReferralLink = (referralCode, userFirstName, trackingReferFriendSocialSharing) => {
  trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Facebook')
  const facebookUTM = '&utm_source=facebook&utm_medium=sharebutton_raf_page&utm_campaign=raf_facebook_share'
  const userNameString = `&name=${userFirstName}`
  const referralLink = `https://cook.gousto.co.uk/raf/?promo_code=${referralCode}${userNameString}${facebookUTM}`

  if (globals.client) {
    window.FB.ui({
      method: 'share',
      mobile_iframe: true,
      href: referralLink,
      redirect_uri: referralLink,
    })
  }
}

export const getMessengerReferralLink = (referralCode, userFirstName, trackingReferFriendSocialSharing) => {
  trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Messenger')
  const messengerUTM = '&utm_source=messenger&utm_medium=sharebutton_raf_page&utm_campaign=raf_messenger_share'
  const userNameString = `&name=${userFirstName}`
  const referralLink = `https://cook.gousto.co.uk/raf/?promo_code=${referralCode}${userNameString}${messengerUTM}`

  if (globals.client) {
    window.FB.ui({
      method: 'send',
      mobile_iframe: true,
      link: referralLink,
      redirect_uri: referralLink,
    })
  }
}
