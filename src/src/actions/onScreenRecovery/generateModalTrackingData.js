import seActions from "middlewares/tracking/snowplow/pauseSubscription/seActions"

export const generateModalTrackingData = ({
                                              modalVisibility,
                                              status,
                                              modalType,
                                              orderId,
                                              deliveryDayId,
                                              data,
                                          }) => {
    if (modalType === 'subscription') {
        return modalVisibility
            ? null
            : {actionType: seActions.SUBSCRIPTION_KEPT_ACTIVE}
    }

    const actionType = (status === 'pending') ? 'Order Cancel' : 'Order Skip'

    return {
        actionType,
        order_id: orderId,
        delivery_day_id: deliveryDayId,
        order_state: status,
        cms_variation: data.variation || 'default',
        recovery_reasons: [
            data.valueProposition,
            data.offer,
        ],
    }
}
