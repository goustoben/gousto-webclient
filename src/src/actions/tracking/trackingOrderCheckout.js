import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const trackingOrderCheckout = () => (dispatch, getState) => {
    const {basket, user, pricing, temp} = getState()
    const basketOrderId = basket.get('orderId')
    const editingBox = basket.get('editBox')
    const orders = user.get('orders')
    const subscription = user.get('subscription')
    const isActiveSubsc = subscription && (subscription.get('state') === 'active')
    const prices = pricing.get('prices')
    const originalGrossTotal = temp.get('originalGrossTotal')
    const originalNetTotal = temp.get('originalNetTotal')
    const orderTotal = prices && prices.get('total')
    const grossTotal = prices && prices.get('grossTotal')
    const editedGrossTotal = originalGrossTotal && grossTotal ? (grossTotal - originalGrossTotal).toFixed(2) : ''
    const editedNetTotal = originalNetTotal && orderTotal ? (orderTotal - originalNetTotal).toFixed(2) : ''
    const promoCode = prices && prices.get('promoCode')

    if (orders.get(basketOrderId)) {
        const orderItems = orders.get(basketOrderId).get('recipeItems')
        if (orderItems.size) {
            dispatch({
                type: actionTypes.TRACKING,
                trackingData: {
                    actionType: 'Order Edited',
                    order_id: basketOrderId,
                    order_total: orderTotal,
                    promo_code: promoCode,
                    signp: false,
                    subscription_active: isActiveSubsc,
                },
                optimizelyData: {
                    type: 'event',
                    eventName: 'order_edited_gross',
                    tags: {
                        revenue: editedGrossTotal
                    }
                }
            })
            dispatch({
                type: actionTypes.TRACKING,
                optimizelyData: {
                    type: 'event',
                    eventName: 'order_edited_net',
                    tags: {
                        revenue: editedNetTotal
                    }
                }
            })
        } else {
            dispatch({
                type: actionTypes.TRACKING,
                trackingData: {
                    actionType: trackingKeys.placeOrder,
                    order_id: basketOrderId,
                    order_total: orderTotal,
                    promo_code: promoCode,
                    signp: false,
                    subscription_active: isActiveSubsc,
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
    } else if (editingBox) {
        dispatch({
            type: actionTypes.TRACKING,
            trackingData: {
                actionType: 'Order Edited',
                order_id: basketOrderId,
                order_total: orderTotal,
                promo_code: promoCode,
                signp: false,
                subscription_active: isActiveSubsc,
            },
            optimizelyData: {
                type: 'event',
                eventName: 'order_edited_gross',
                tags: {
                    revenue: editedGrossTotal
                }
            }
        })
        dispatch({
            type: actionTypes.TRACKING,
            optimizelyData: {
                type: 'event',
                eventName: 'order_edited_net',
                tags: {
                    revenue: editedNetTotal
                }
            }
        })
    } else {
        dispatch({
            type: actionTypes.TRACKING,
            trackingData: {
                actionType: trackingKeys.placeOrder,
                order_id: basketOrderId,
                order_total: orderTotal,
                promo_code: promoCode,
                signp: false,
                subscription_active: isActiveSubsc,
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
}
