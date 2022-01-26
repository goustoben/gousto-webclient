import React, { useContext } from 'react'

import { SubscriptionContext } from '../../context'
import { getFirstName, getIsCurrentUserLoaded } from '../../context/selectors/currentUser'
import { getIsSubscriptionLoaded, getIsSubscriptionActive } from '../../context/selectors/subscription'
import { getAreDeliveriesLoaded, getCurrentDeliverySlot } from '../../context/selectors/deliveries'
import { dayNumberMap } from '../../enum/day'
import { formatCutoffTime } from '../../utils/time'

import css from './SubscriptionTitle.css'

export const SubscriptionTitle = () => {
  const { state } = useContext(SubscriptionContext)

  const isCurrentUserLoaded = getIsCurrentUserLoaded(state)
  const isSubscriptionLoaded = getIsSubscriptionLoaded(state)
  const areDeliveriesLoaded = getAreDeliveriesLoaded(state)
  const isLoaded = isCurrentUserLoaded && isSubscriptionLoaded && areDeliveriesLoaded

  const firstName = getFirstName(state)
  const isSubscriptionActive = getIsSubscriptionActive(state)
  const { cutoffDay, cutoffTime } = getCurrentDeliverySlot(state)

  return (
    <div className={css.titleContainer}>
      <h2 className={css.title}>Subscription settings</h2>

      {isLoaded ? (
        <p data-testing="subtitle" className={css.subTitle}>
          <strong data-testing="first-name">
            {firstName}
          </strong>
          {', your subscription is '}
          <strong data-testing="subscription-status">{isSubscriptionActive ? 'active' : 'inactive'}</strong>
          {isSubscriptionActive ? (
            <span data-testing="cutoff">
              { '. You have until '}
              <strong>
                {formatCutoffTime(cutoffTime)}
                {' on '}
                {dayNumberMap[cutoffDay]}
              </strong>
              {' to make your recipe choices or skip a delivery.'}
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  )
}
