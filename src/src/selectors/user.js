export const getReferralOffer = state => state.user.get('referralOffer')
export const getReferralCode = state => state.user.get('referral-code')

export default {
  getReferralOffer,
  getReferralCode,
}
