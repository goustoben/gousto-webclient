import Immutable from 'immutable'
import { createSelector } from 'reselect'
import moment from 'moment'
import { actionTypes } from 'actions/actionTypes'

export const didErrorFetchingAddresses = state => state.error.get(actionTypes.USER_LOAD_ADDRESSES, null)
export const didErrorFetchingPendingOrders = state => state.error.get(actionTypes.USER_LOAD_ORDERS, null)
export const didErrorFetchingProjectedOrders = state => state.error.get(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, null)
export const getUserFirstName = state => state.user.get('nameFirst')
export const getUserLastName = state => state.user.get('nameLast')
export const getUserId = state => state.user.get('id', null)
export const getUserEmail = state => state.user.get('email')
export const getUserShippingAddress = state => state.user.get('shippingAddress')
export const getUserShippingAddressFromCustomerService = state => state.user.get(
  'addresses',
  Immutable.Map({})
).filter((address) => address.get('type') === 'shipping')
export const getUserPhoneNumber = state => state.user.get('phone')
export const getReferralOffer = state => state.user.get('referralOffer')
export const getUserStatus = state => state.user.get('status')
export const getReferralCode = state => state.user.getIn(['referralOffer', 'code'], '') || state.user.get('referral-code', '')
export const getLoadingStateForOffer = state => state.pending.get('USER_LOAD_REFERRAL_OFFER', true)
export const getLoadingStateForOrder = ({ pending }) => pending.get('USER_LOAD_ORDERS', true)
export const getUserFromJoin = state => (!state.auth.get('isAuthenticated') ? state.persist.get('simpleHeader', false) : false)
export const getAgeVerified = state => state.user.get('ageVerified')
export const getUserCredit = ({ user }) => user.get('credit', null)
export const getUserOrders = ({ user }) => user.get('orders', Immutable.List([]))
export const getUserNewOrders = ({ user }) => user.get('newOrders')
export const getUserSubscriptionState = ({ user }) => user.getIn(['subscription', 'state'])

export const getUserRecentRecipesIds = ({ user }, number = 6) => {
  const recipeIds = new Set()
  const userOrders = user.get('orders')
  const sortedOrders = userOrders && userOrders
    .sort((order1, order2) => {
      const orderDate1 = order1.get('deliveryDate')
      const orderDate2 = order2.get('deliveryDate')

      return moment(orderDate2) - moment(orderDate1)
    })

  sortedOrders.forEach(order => {
    if (recipeIds.size < number) {
      order.get('recipeItems').forEach(recipe => {
        if (recipeIds.size < number && recipe.get('itemableType') === 'Recipe') {
          recipeIds.add(recipe.get('recipeId'))
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

export const getUserSortedNewOrders = createSelector(
  getUserNewOrders,
  newOrders => newOrders
    .keySeq()
    .toArray()
    .sort((orderId1, orderId2) => {
      const orderDate1 = newOrders.get(orderId1).get('deliveryDay')
      const orderDate2 = newOrders.get(orderId2).get('deliveryDay')

      return moment(orderDate1) - moment(orderDate2)
    })
    .map(orderId => newOrders.get(orderId))
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
      const isProjected = order.get('isProjected') || false

      return [
        ...orders,
        {
          id,
          canSkip,
          isProjected,
          deliveryDay: order.get('deliveryDay'),
          deliveryDate: order.get('humanDeliveryDay'),
          deliveryDayId: order.get(isProjected ? 'deliveryDayId' : 'coreDeliveryDayId')
        }
      ]
    }, [])
)

export const getMultiSkipState = ({ user }) => user.get('multiSkip')

export const getNextDelivery = createSelector(
  getUserSortedNewOrders,
  orders => orders.find(order => order.get('orderState') !== 'cancelled') || null
)

export const getHasBoxesToSkip = createSelector(
  getUserNewOrdersForMultiSkip,
  newOrders => newOrders.some(({ canSkip }) => canSkip)
)

export const getNextDeliveryDate = createSelector(
  getNextDelivery,
  nextDelivery => (nextDelivery
    ? nextDelivery.get('humanDeliveryDay')
    : null)
)

export const createMultiSkipSelector = (key) => createSelector(
  getMultiSkipState,
  multiSkip => multiSkip.get(key)
)

export const getSkippedBoxesCount = createMultiSkipSelector('lastSkippedCount')

export const getIsMultiSkipPending = createMultiSkipSelector('isPending')

export const getIsMultiSkipError = createMultiSkipSelector('isError')

export const getIsMultiSkipSuccess = createMultiSkipSelector('isSuccess')

export const isFetchingUserAddresses = state => state.pending.get(
  actionTypes.USER_LOAD_ADDRESSES,
  false
)
