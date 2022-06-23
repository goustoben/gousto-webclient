import React, { Fragment, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'goustouicomponents'
import { Text } from '@gousto-internal/citrus-react'
// eslint-disable-next-line import/no-unresolved
import { formatDeliveryPrice } from 'utils/deliveryPrice'
import {
  SubscriptionContext,
} from '../../../../context'

import {
  getIsSubscriptionLoaded
} from '../../../../context/selectors/subscription'

import {
  getAreDeliveriesLoaded,
  getCurrentDeliverySlot,
  getDeliverySlots
} from '../../../../context/selectors/deliveries'

import { SettingSection } from '../../../../components/SettingSection'
import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'

import { trackSubscriptionSettingsChange } from '../../../../tracking'

import css from './DeliveryDayAndTime.css'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'

const renderCurrentValue = ({ day, timeRange, deliveryPrice }) => (
  <Fragment>
    <p
      className={css.currentSetting}
      data-testing="current-delivery-day"
    >
      {day}
    </p>
    <p
      className={css.currentSetting}
      data-testing="current-delivery-time"
    >
      {timeRange}
    </p>
    <Text
      className={css.currentSetting}
      size={1}
      data-testing="current-delivery-price"
    >
      { deliveryPrice === '0.00'
        ? 'Free delivery'
        : `£${deliveryPrice} delivery charge`}
    </Text>
  </Fragment>
)

renderCurrentValue.propTypes = {
  day: PropTypes.string.isRequired,
  timeRange: PropTypes.string.isRequired,
  deliveryPrice: PropTypes.string.isRequired
}

export const DeliveryDayAndTime = ({ accessToken, isMobile }) => {
  const context = useContext(SubscriptionContext)
  const { state } = context

  const isLoaded = getAreDeliveriesLoaded(state) && getIsSubscriptionLoaded(state)

  const currentDeliverySlot = getCurrentDeliverySlot(state)
  const slots = getDeliverySlots(state)

  const [selectedCoreId, setSelectedCoreId] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const settingName = 'delivery_date'

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      delivery_slot_id: selectedCoreId
    },
    settingName
  })

  useSubscriptionToast(updateResponse, updateError)

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update' })()
    setShouldSubmit(true)
  }

  const { day, timeRange, coreSlotId, deliveryPrice } = selectedCoreId
    ? slots.find(({ coreSlotId: slotCoreSlotId }) => slotCoreSlotId === selectedCoreId)
    : currentDeliverySlot

  const options = slots.map(({
    coreSlotId: optionCoreSlotId,
    day: optionDay,
    timeRange: optionTimeRange,
    deliveryPrice: optionDeliveryPrice
  }) => ({
    value: optionCoreSlotId,
    text: `${optionDay} ${optionTimeRange} ${formatDeliveryPrice(optionDeliveryPrice)}`
  }))

  const isCtaDisabled = coreSlotId === currentDeliverySlot.coreSlotId

  return (
    <SettingSection
      icon="calendar"
      title="Delivery day and time"
      instruction="Choose day and time"
      ctaText="Save day and time"
      isCtaDisabled={isCtaDisabled}
      renderCurrentValue={renderCurrentValue({ day, timeRange, deliveryPrice })}
      onSubmit={onSubmit}
      onEditClick={trackSubscriptionSettingsChange({ settingName, action: 'edit' })}
      isMobile={isMobile}
      testingSelector="delivery-day-and-time"
    >
      { isMobile ? (
        <p data-testing="expanded-text">
          Please select what day you would like to receive your box on and when.
        </p>
      ) : null}

      { isLoaded ? (
        <Dropdown
          options={options}
          value={{ text: `${day} ${timeRange} ${formatDeliveryPrice(deliveryPrice)}`, value: coreSlotId }}
          onChange={({ value }) => setSelectedCoreId(value)}
          name="Delivery day dropdown"
          isMobile={isMobile}
          placeholder="Choose day"
          testingSelector="delivery-day-and-time"
        />
      ) : null}
    </SettingSection>
  )
}

DeliveryDayAndTime.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
