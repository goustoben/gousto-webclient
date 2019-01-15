import globals from 'config/globals'
import actionTypes from 'actions/actionTypes'
import defaultOffer from './config'

export const getMessage = (offer) => {
  const firstBoxOffer = offer ? offer.get('firstBoxDiscountFormatted') : defaultOffer.get('firstBoxDiscountFormatted')
  const firstMonthOffer = offer ? offer.get('firstMonthDiscountFormatted') : defaultOffer.get('firstMonthDiscountFormatted')

  return `I love Gousto and I think you will too! Use my link to get an exclusive ${firstBoxOffer} off your first box, PLUS ${firstMonthOffer} off for a whole month. \r\n`
}

export const getReferralLink = (referralCode, userFirstName = '', UTM = '') => {
  const userNameString = userFirstName ? `&name=${userFirstName}` : ''

  return `https://cook.gousto.co.uk/raf/?promo_code=${referralCode}${userNameString}${UTM}`
}

export const getFacebookReferralLink = (referralCode, userFirstName, trackingReferFriendSocialSharing) => {
  trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Facebook')

  const facebookUTM = '&utm_source=facebook&utm_medium=sharebutton_raf_page&utm_campaign=raf_facebook_share'
  const referralLink = getReferralLink(referralCode, userFirstName, facebookUTM)

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
  const referralLink = getReferralLink(referralCode, userFirstName, messengerUTM)

  if (globals.client) {
    window.FB.ui({
      method: 'send',
      mobile_iframe: true,
      link: referralLink,
      redirect_uri: referralLink,
    })
  }
}

export const getWhatsappReferralLink = (referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing) => {
  trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Whatsapp')

  const whatsappUTM = '&utm_source=whatsapp&utm_medium=sharebutton_raf_page&utm_campaign=raf_whatsapp_share'
  const referralLink = getReferralLink(referralCode, userFirstName, whatsappUTM)
  const message = getMessage(rafOffer)
  const encodedMessage = encodeURIComponent(`${message}${referralLink}`)

  return window.location.assign(`https://wa.me/?text=${encodedMessage}`)
}

export const getTextMessageReferralLink = (referralCode, userFirstName, rafOffer, trackingReferFriendSocialSharing) => {
  trackingReferFriendSocialSharing(actionTypes.REFER_FRIEND_LINK_SHARE, 'ReferFriendLink Share', 'Whatsapp')

  const textMessageUTM = '&utm_source=text_message&utm_medium=sharebutton_raf_page&utm_campaign=raf_text_message_share'
  const referralLink = getReferralLink(referralCode, userFirstName, textMessageUTM)
  const message = getMessage(rafOffer)
  const encodedMessage = encodeURIComponent(`${message}${referralLink}`)

  return window.location.assign(`sms:?&body=${encodedMessage}`)
}

