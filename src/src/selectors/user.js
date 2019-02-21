export const getUserFirstName = state => state.user.get('nameFirst')
export const getReferralOffer = state => state.user.get('referralOffer')
export const getReferralCode = state => state.user.get('referral-code')
export const getLoadingStateForOffer = state => state.pending.get('USER_LOAD_REFERRAL_OFFER', true)
export const getUserFromJoin = state => !state.auth.get('isAuthenticated') ? state.persist.get('simpleHeader', false) : false

export default {
  getUserFirstName,
  getReferralOffer,
  getReferralCode,
  getLoadingStateForOffer,
}
