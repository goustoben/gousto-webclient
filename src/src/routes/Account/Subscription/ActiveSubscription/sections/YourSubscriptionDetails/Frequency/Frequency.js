import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup, InputRadio } from 'goustouicomponents'
import { frequencyMapping, userIdRange } from '../../../../enum/frequency'
import { getFrequencyVariant } from '../../../../utils/frequency'
import {
  SubscriptionContext,
} from '../../../../context'

import {
  getIsSubscriptionLoaded
} from '../../../../context/selectors/subscription'

import { getDeliveryFrequency } from '../../../../context/selectors/deliveries'
import { getCurrentUserId } from '../../../../context/selectors/currentUser'
import { SettingSection } from '../../../../components/SettingSection'

import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'
import { trackSubscriptionSettingsChange, trackWeeklyFrequencyVariant } from '../../../../tracking'

export const Frequency = ({ accessToken, isMobile }) => {
  let mutableFrequencyMapping = { frequency: frequencyMapping }
  const subscriptionContext = useContext(SubscriptionContext)
  const { state: subscriptionState } = subscriptionContext

  const [selectedInterval, setSelectedInterval] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const isSubscriptionLoaded = getIsSubscriptionLoaded(subscriptionState)
  const settingName = 'box_frequency'

  const currentDeliveryFrequency = getDeliveryFrequency(subscriptionState)
  const currentUserId = getCurrentUserId(subscriptionState)

  if (currentUserId > userIdRange.START && currentUserId < userIdRange.END) {
    mutableFrequencyMapping = getFrequencyVariant({ currentUserId })
    trackWeeklyFrequencyVariant({ variation: mutableFrequencyMapping.variation })
  }

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      interval: selectedInterval
    },
    settingName
  })

  useSubscriptionToast(updateResponse, updateError)

  const onChange = ({ target: { value } }) => setSelectedInterval(value)

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update' })()
    setShouldSubmit(true)
  }

  const isCtaDisabled = selectedInterval === currentDeliveryFrequency || !selectedInterval

  return (
    <SettingSection
      icon="frequency"
      title="Frequency"
      instruction="Choose frequency"
      ctaText="Save frequency"
      isCtaDisabled={isCtaDisabled}
      renderCurrentValue={(
        <p
          data-testing="current-frequency"
        >
          {mutableFrequencyMapping.frequency[selectedInterval] || mutableFrequencyMapping.frequency[currentDeliveryFrequency]}
        </p>
      )}
      onSubmit={onSubmit}
      onEditClick={trackSubscriptionSettingsChange({ settingName, action: 'edit' })}
      isMobile={isMobile}
      testingSelector="box-frequency"
    >
      {isMobile ? (
        <p data-testing="box-frequency-instruction-text">
          Please select the how often you’d like to recieve your box.
        </p>
      ) : null}

      { isSubscriptionLoaded ? (
        <RadioGroup
          onChange={onChange}
          testingSelector="box-frequency-radio-group"
          name={settingName}
        >
          {
            Object.keys(mutableFrequencyMapping.frequency).map(value => {
              const frequencyValue = mutableFrequencyMapping.frequency[value]

              return (
                <InputRadio
                  id={`box-frequency-${value}`}
                  variant="tile"
                  key={frequencyValue}
                  value={value}
                  name={settingName}
                  isChecked={value === currentDeliveryFrequency}
                >
                  {
                    frequencyValue
                  }
                </InputRadio>
              )
            })
          }
        </RadioGroup>
      ) : null}
    </SettingSection>
  )
}

Frequency.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
