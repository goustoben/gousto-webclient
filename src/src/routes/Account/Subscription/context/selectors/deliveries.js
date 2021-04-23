import { createSelector } from 'reselect'

export const getDeliveries = ({ deliveries }) => (deliveries || {})

export const getAreDeliveriesLoaded = createSelector(
  getDeliveries,
  (deliveries) => Boolean(Object.keys(deliveries).length)
)

export const getCurrentDeliverySlot = createSelector(
  getDeliveries,
  ({ currentDeliverySlot }) => currentDeliverySlot || {}
)

export const getDeliverySlots = createSelector(
  getDeliveries,
  ({ slots }) => slots || []
)

export const getDeliveryFrequency = createSelector(
  getDeliveries,
  ({ frequency }) => (frequency || {}).currentValue
)
