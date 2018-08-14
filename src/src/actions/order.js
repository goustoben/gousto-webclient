import actionTypes from './actionTypes'
import moment from 'moment'
import ordersApi from 'apis/orders'
import * as userApi from 'apis/user'
import { fetchDeliveryDays } from 'apis/deliveries'
import statusActions from './status'
import logger from 'utils/logger'
import { redirect } from 'utils/window'
import { getOrderDetails } from 'utils/basket'
import { getAvailableDeliveryDays } from 'utils/deliveries'
import Immutable from 'immutable' /* eslint-disable new-cap */
import config from 'config/routes'
import userActions from './user'
import tempActions from './temp'
import GoustoException from 'utils/GoustoException'

const checkAllScheduledCancelled = (orders) => (
	!orders.some(order => (order.get('orderState') === 'scheduled'))
)

const getPendingOrdersDates = (orders) => (
	orders.filter(order => (['confirmed', 'dispatched'].indexOf(order.get('orderState')) > -1))
		.map(order => order.get('deliveryDay'))
)

export const orderCancel = (orderId) => (
	async (dispatch, getState) => {
		dispatch(statusActions.error(actionTypes.ORDER_CANCEL, null))
		dispatch(statusActions.pending(actionTypes.ORDER_CANCEL, true))
		const accessToken = getState().auth.get('accessToken')
		try {
			await ordersApi.cancelOrder(accessToken, orderId)
			dispatch({
				type: actionTypes.ORDER_CANCEL,
				orderId,
				trackingData: {
					type: 'Order Cancelled',
					order_id: orderId,
					order_state: 'pending',
					reasons: [],
				}
			})
		} catch (err) {
			dispatch(statusActions.error(actionTypes.ORDER_CANCEL, { error: err.message, orderId }))
			throw err
		} finally {
			dispatch(statusActions.pending(actionTypes.ORDER_CANCEL, false))
		}
	})

const cancelledAllBoxesModalToggleVisibility = (visibility) => ({
	type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
	visibility,
})

const orderUpdate = (orderId, recipes, coreDayId, coreSlotId, numPortions, orderAction) => (
	async (dispatch, getState) => {
		dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
		dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))
		const order = {
			recipe_choices: recipes.map(id => ({ id, type: 'Recipe', quantity: numPortions })),
			order_action: orderAction,
			delivery_slot_id: coreSlotId,
			delivery_day_id: coreDayId,
		}
		const accessToken = getState().auth.get('accessToken')
		try {
			const { data: savedOrder } = await ordersApi.saveOrder(accessToken, orderId, order)
			if (savedOrder && savedOrder.id) {
				const summaryUrl = config.client.orderSummary.replace(':orderId', savedOrder.id)
				redirect((orderAction) ? `${summaryUrl}?order_action=${orderAction}` : summaryUrl)
			}
		} catch (err) {
			dispatch(statusActions.error(actionTypes.ORDER_SAVE, err.message))
			dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
		}
		dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
	})

const orderUpdateDayAndSlot =  (orderId, coreDayId, coreSlotId, slotId) => (
	async (dispatch, getState) => {
		dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, null))
		dispatch(statusActions.pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, true))
		try {
			const order = {
				delivery_day_id: coreDayId,
				delivery_slot_id: coreSlotId,
			}
			const accessToken = getState().auth.get('accessToken')
			const { data: updatedOrder } = await ordersApi.saveOrder(accessToken, orderId, order)
			dispatch({
				type: actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT,
				orderId,
				coreDayId,
				slotId,
				deliveryDay: updatedOrder.deliveryDate,
				deliverySlotStart: updatedOrder.deliverySlot.deliveryStart,
				deliverySlotEnd: updatedOrder.deliverySlot.deliveryEnd,
			})
		} catch (err) {
			dispatch(statusActions.error(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, err.message))
		} finally {
			dispatch(statusActions.pending(actionTypes.ORDER_UPDATE_DELIVERY_DAY_AND_SLOT, false))
		}
	})

const orderAssignToUser = (orderAction, existingOrderId) => (
	async (dispatch, getState) => {
		dispatch(statusActions.error(actionTypes.ORDER_SAVE, null))
		dispatch(statusActions.pending(actionTypes.ORDER_SAVE, true))
		const accessToken = getState().auth.get('accessToken')
		let orderDetails
		let savedOrder

		try {
			try {
				orderDetails = getOrderDetails(getState().basket, getState().boxSummaryDeliveryDays)
				const { data } = await userApi.saveUserOrder(accessToken, orderDetails)
				savedOrder = data
			} catch (err) {
				if (existingOrderId && err.message === 'user already has an order for chosen delivery day') {
					try {
						const { data } = await userApi.updateUserOrder(accessToken, {
							...orderDetails,
							order_id: existingOrderId,
						})
						savedOrder = data
					} catch (err) {
						throw new GoustoException(err.message || err, {
							error: 'update-order-fail',
						})
					}
				} else {
					throw new GoustoException(err.message || err, {
						error: 'save-order-fail',
					})
				}
			}

			if (savedOrder && savedOrder.id) {
				const summaryUrl = config.client.orderSummary.replace(':orderId', savedOrder.id)
				redirect((orderAction) ? `${summaryUrl}?order_action=${orderAction}` : summaryUrl)
			} else {
				throw new GoustoException('Order could not be assigned to user', {
					error: 'assign-order-fail',
				})
			}
		} catch (err) {
			const logLevel = err.level || 'error'
			const errorMessage = err.message || err
			const error = err.error || errorMessage
			logger[logLevel](errorMessage)
			dispatch(statusActions.error(actionTypes.ORDER_SAVE, error))
			dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
		} finally {
			dispatch(statusActions.pending(actionTypes.ORDER_SAVE, false))
		}
	}
)

const orderCheckPossibleDuplicate = (orderId) => (
	async (dispatch, getState) => {
		try {
			await dispatch(userActions.userLoadOrders(true, 'any', 5))
		} catch (e) {
			// do nothing
		}
		const orders = getState().user.get('orders', Immutable.List([]))
		const order = orders.filter(o => o.get('id') === orderId).first()
		if (order) {
			const sixDaysBeforeOrder = moment(order.get('deliveryDate')).subtract(6, 'days')
			const sixDaysFromOrder = moment(order.get('deliveryDate')).add(6, 'days')

			const closeOrderIds = orders
				.filter(o => (
					moment(o.get('deliveryDate')).isBetween(sixDaysBeforeOrder, sixDaysFromOrder)
				))
				.map(o => o.get('id'))

			if (closeOrderIds.size > 0) {
				dispatch(tempActions.temp('closeOrderIds', closeOrderIds))
			}
		}
	})

const projectedOrderCancel = (orderId, deliveryDayId) => (
	async (dispatch, getState) => {
		const showAllCancelledModalIfNecessary = () => {
			const orders = getState().user.get('newOrders')
			if (checkAllScheduledCancelled(orders) && getState().subscription.getIn(['subscription', 'state']) === 'active') {
				const pendingOrdersDates = getPendingOrdersDates(orders)
				dispatch({
					type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
					visibility: true,
					pendingOrdersDates,
				})
			}
		}

		const scrollToCurrentCard = () => {
			location.hash = '' // This is because setting the location.hash to the existing value won't do anything
			location.hash = `#order-${orderId}`
		}

		dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_CANCEL, null))
		dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_CANCEL, true))
		const accessToken = getState().auth.get('accessToken')
		try {
			await userApi.skipDelivery(accessToken, deliveryDayId)
			dispatch({
				type: actionTypes.PROJECTED_ORDER_CANCEL,
				orderId,
			})
			dispatch(userActions.userOpenCloseOrderCard(orderId, true))
			scrollToCurrentCard()
			showAllCancelledModalIfNecessary()
		} catch (err) {
			dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_CANCEL, { error: err.message, orderId }))
		} finally {
			dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_CANCEL, false))
		}
	}
)


const 	projectedOrderRestore = (orderId, userId, deliveryDayId) => (
	async (dispatch, getState) => {
		dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_RESTORE, null))
		dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_RESTORE, true))
		const accessToken = getState().auth.get('accessToken')
		try {
			await userApi.restoreDelivery(accessToken, userId, deliveryDayId)
			dispatch({
				type: actionTypes.PROJECTED_ORDER_RESTORE,
				orderId,
			})
		} catch (err) {
			dispatch(statusActions.error(actionTypes.PROJECTED_ORDER_RESTORE, { error: err.message, orderId }))
		} finally {
			dispatch(statusActions.pending(actionTypes.PROJECTED_ORDER_RESTORE, false))
		}
	}
)

const orderAddressChange = (orderId, addressId) => (
	async (dispatch, getState) => {
		dispatch(statusActions.error(actionTypes.ORDER_ADDRESS_CHANGE, null))
		dispatch(statusActions.pending(actionTypes.ORDER_ADDRESS_CHANGE, true))
		const accessToken = getState().auth.get('accessToken')
		const data = {
			orderId,
			addressId,
		}
		try {
			await ordersApi.updateOrderAddress(accessToken, orderId, addressId)
			dispatch({
				type: actionTypes.ORDER_ADDRESS_CHANGE,
				data,
			})
		} catch (err) {
			dispatch(statusActions.error(actionTypes.ORDER_ADDRESS_CHANGE, err.message))
		} finally {
			dispatch(statusActions.pending(actionTypes.ORDER_ADDRESS_CHANGE, false))
		}
	}
)

const orderGetDeliveryDays = (cutoffDatetimeFrom, cutoffDatetimeUntil, addressId, orderId) => (
	async (dispatch, getState) => {
		dispatch(statusActions.error(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, null))
		dispatch(statusActions.pending(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, true))
		const postcode = getState().user.getIn(['addresses', addressId, 'postcode'])
		const reqData = {
			'filters[cutoff_datetime_from]': cutoffDatetimeFrom,
			'filters[cutoff_datetime_until]': cutoffDatetimeUntil,
			sort: 'date',
			direction: 'asc',
			postcode,
		}
		try {
			const { data: days } = await fetchDeliveryDays(null, reqData)
			const availableDays = getAvailableDeliveryDays(days)
			dispatch({
				type: actionTypes.ORDER_DELIVERY_DAYS_RECEIVE,
				availableDays,
				orderId,
			})
		} catch (err) {
			if (err.message !== 'do-not-deliver') {
				logger.error(err.message)
			}
			dispatch(statusActions.error(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, err.message))
		} finally {
			dispatch(statusActions.pending(actionTypes.ORDER_DELIVERY_DAYS_RECEIVE, false))
		}
	}
)

const cancelOrderModalToggleVisibility = (visibility, orderId) => (
	(dispatch) => {
		dispatch({
			type: actionTypes.ORDER_CANCELLED_MODAL_VISIBILITY_CHANGE,
			data: {
				visibility,
				orderId,
			},
		})
		if (visibility === false) {
			dispatch(statusActions.error(actionTypes.ORDER_CANCEL, null))
		}
	}
)

export default {
	orderCancel,
	orderUpdate,
	orderUpdateDayAndSlot,
	orderAssignToUser,
	orderCheckPossibleDuplicate,
	projectedOrderCancel,
	cancelledAllBoxesModalToggleVisibility,
	projectedOrderRestore,
	orderAddressChange,
	orderGetDeliveryDays,
	cancelOrderModalToggleVisibility,
}
