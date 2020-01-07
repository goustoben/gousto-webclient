import { createSelector } from 'reselect'

export const getUserFirstName = state => state.user.get('nameFirst')
export const getReferralOffer = state => state.user.get('referralOffer')
export const getReferralCode = state => state.user.getIn(['referralOffer', 'code'], '') || state.user.get('referral-code', '')
export const getLoadingStateForOffer = state => state.pending.get('USER_LOAD_REFERRAL_OFFER', true)
export const getLoadingStateForUserCredit = ({ pending }) => pending.get('USER_CREDIT', false)
export const getUserFromJoin = state => (!state.auth.get('isAuthenticated') ? state.persist.get('simpleHeader', false) : false)
export const getAgeVerified = state => state.user.get('ageVerified')
export const getUserCredit = ({ user }) => user.get('credit', null)
export const getUserOrders = ({ user }) => user.get('orders')
export const getUserNewOrders = ({ user }) => user.get('newOrders')
export const getUserRecentRecipesIds = ({ user }, number = 6) => {
  const recipeIds = new Set()
  const userOrders = user.get('orders')
  const sortedOrders = userOrders && userOrders.sort((a, b) => parseInt(b.get('id')) - parseInt(a.get('id')))

  sortedOrders.forEach(order => {
    if (recipeIds.size < number) {
      order.get('recipeItems').forEach(recipe => {
        if (recipeIds.size < number) {
          recipe.get('itemableType') === 'Recipe' && recipeIds.add(recipe.get('recipeId'))
        }
      })
    }
  })

  return Array.from(recipeIds)
}

export const getUsersOrdersDaySlotLeadTimeIds = createSelector(
  getUserOrders,
  orders => orders.map(order => order.get('daySlotLeadTimeId')).toArray()
)

export default {
  getUserFirstName,
  getReferralOffer,
  getReferralCode,
  getLoadingStateForOffer,
  getAgeVerified,
  getUserOrders,
  getUsersOrdersDaySlotLeadTimeIds
}
