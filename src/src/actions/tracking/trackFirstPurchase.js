import { getUserOrderById } from "utils/user"
import logger from "utils/logger"
import { actionTypes } from "actions/actionTypes"

export const trackFirstPurchase = (orderId, prices) => (
    (dispatch, getState) => {
        const {user} = getState()
        const goustoReference = user.get('goustoReference')
        const order = getUserOrderById(orderId, user.get('orders'))
        const orderTotal = prices && prices.get('total')
        const grossTotal = prices && prices.get('grossTotal')

        if (!goustoReference) {
            logger.warning('Missing user data for first purchase tracking: no user found in store')
        }

        if (!order.get('prices')) {
            logger.warning(`Missing order data for first purchase tracking: no user order "${orderId}" found in store`)
        }

        dispatch({
            type: actionTypes.TRACKING,
            trackingData: {
                actionType: actionTypes.TRACKING,
                asource: getState().tracking.get('asource'),
                goustoReference,
                event: 'firstPurchase',
                orderId,
                orderTotal,
                voucher: order.getIn(['prices', 'promoCode'], ''),
            },
            optimizelyData: {
                type: 'event',
                eventName: 'order_placed_gross',
                tags: {
                    revenue: grossTotal
                }
            }
        })
        dispatch({
            type: actionTypes.TRACKING,
            optimizelyData: {
                type: 'event',
                eventName: 'order_placed_net',
                tags: {
                    revenue: orderTotal
                }
            }
        })
    }
)
