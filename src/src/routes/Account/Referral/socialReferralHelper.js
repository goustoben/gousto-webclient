import globals from 'config/globals'

export const getFacebookReferralLink = (referralCode) => {
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

export const getMessengerReferralLink = (referralCode) => {
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
