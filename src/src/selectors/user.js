import Immutable from 'immutable'
import { createSelector } from 'reselect'

export const getUserFirstName = state => state.user.get('nameFirst')
export const getUserId = state => state.user.get('id', null)
export const getUserPhoneNumber = state => state.user.get('phone')
export const getReferralOffer = state => state.user.get('referralOffer')
export const getReferralCode = state => state.user.getIn(['referralOffer', 'code'], '') || state.user.get('referral-code', '')
export const getLoadingStateForOffer = state => state.pending.get('USER_LOAD_REFERRAL_OFFER', true)
export const getLoadingStateForOrder = ({ pending }) => pending.get('USER_LOAD_ORDERS', true)
export const getLoadingStateForUserCredit = ({ pending }) => pending.get('USER_CREDIT', false)
export const getUserFromJoin = state => (!state.auth.get('isAuthenticated') ? state.persist.get('simpleHeader', false) : false)
export const getAgeVerified = state => state.user.get('ageVerified')
export const getUserCredit = ({ user }) => user.get('credit', null)
export const getUserOrders = ({ user }) => user.get('orders', Immutable.List([]))
export const getUserNewOrders = ({ user }) => user.get('newOrders')
export const getUserSubscriptionState = ({ user }) => user.getIn(['subscription', 'state'])
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

export const getUserPhoneWithoutLeadingZero = createSelector(
  getUserPhoneNumber,
  (phoneNumber) => {
    if (phoneNumber && phoneNumber.substring(0, 1) === '0') {
      return phoneNumber.substring(1)
    }

    return phoneNumber
  }
)

export const getUsersOrdersDaySlotLeadTimeIds = createSelector(
  getUserOrders,
  orders => orders.map(order => order.get('daySlotLeadTimeId')).toArray()
)

export const getUserOpenOrders = createSelector(
  getUserOrders,
  orders => orders.filter((order) => (
    ['awaiting_choices', 'open', 'pre_menu'].includes(order.get('phase'))
  ))
)

export const getUserNewOrdersForMultiSkip = createSelector(
  getUserNewOrders,
  newOrders => newOrders
    .keySeq()
    .toArray()
    .reduce((orders, id) => {
      const order = newOrders.get(id)

      if (['dispatched', 'confirmed'].includes(order.get('orderState'))) {
        return orders
      }

      const canSkip = order.get('cancellable') && order.get('orderState') !== 'cancelled'
      const isProjected = order.get('isProjected')

      return [
        ...orders,
        {
          id,
          canSkip,
          isProjected,
          deliveryDate: order.get('humanDeliveryDay'),
          deliveryDayId: order.get(isProjected ? 'deliveryDayId' : 'coreDeliveryDayId')
        }
      ]
    }, [])
)

export default {
  getUserFirstName,
  getUserId,
  getReferralOffer,
  getReferralCode,
  getLoadingStateForOffer,
  getAgeVerified,
  getUserOrders,
  getUsersOrdersDaySlotLeadTimeIds
}
