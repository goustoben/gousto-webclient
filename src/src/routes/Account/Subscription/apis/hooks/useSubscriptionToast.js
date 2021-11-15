import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router'
import { v4 } from 'uuid'

import { ToastContext, toastActions } from '../../components/Toast'
import { SubscriptionContext } from '../../context'
import { getSubscriptionToastContent } from '../../utils/toast'
import { getOpenOrders } from '../../context/selectors/orders'

import css from '../../components/Toast/Toast.module.css'

export const useSubscriptionToast = (updateResponse, updateError) => {
  const { dispatch } = useContext(ToastContext)
  const { state: subscriptionState } = useContext(SubscriptionContext)

  const openOrders = getOpenOrders(subscriptionState)
  const showDeliveriesReminder = openOrders.length > 0

  const responseString = JSON.stringify(updateResponse)

  useEffect(() => {
    if (!responseString && !updateError) {
      return
    }

    dispatch({
      type: toastActions.ADD_TOAST,
      payload: getSubscriptionToastContent(responseString)
    })

    if (showDeliveriesReminder && !updateError) {
      dispatch({
        type: toastActions.ADD_TOAST,
        payload: {
          id: v4(),
          title: `You still have ${openOrders.length > 1 ? 'upcoming boxes' : 'an upcoming box'}`,
          body: `Your next delivery is due on ${openOrders[0].deliveryDate}`,
          variant: 'warning',
          // eslint-disable-next-line
          renderAnchor: () => <Link className={css.anchor} to="/my-deliveries">View my deliveries</Link>,
          canDismiss: true,
          displayTime: 'short'
        }
      })
    }
  }, [
    responseString,
    updateError,
    dispatch,
    showDeliveriesReminder,
    openOrders
  ])
}
