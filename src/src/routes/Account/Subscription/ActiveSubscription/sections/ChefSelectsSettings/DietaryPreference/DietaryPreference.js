import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup, InputRadio } from 'goustouicomponents'

import {
  SubscriptionContext,
} from '../../../../context'
import { getDietaryPreference, getIsBoxLoaded } from '../../../../context/selectors/box'

import { SettingSection } from '../../../../components/SettingSection'

import { trackSubscriptionSettingsChange } from '../../../../tracking'

import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { useTrackSubscriptionUpdate } from '../../../../hooks/useTrackSubscriptionUpdate'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'

import { DIETARY_PREFERENCES_MAP } from '../../../../enum/box'

export const DietaryPreference = ({ accessToken, isMobile }) => {
  const context = useContext(SubscriptionContext)
  const { state } = context

  const isLoaded = getIsBoxLoaded(state)

  const currentDietaryPreference = getDietaryPreference(state)

  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      box_type: selectedDietaryPreference
    }
  })

  const settingName = 'dietary_preference'

  useSubscriptionToast(updateResponse, updateError)

  useTrackSubscriptionUpdate({
    isUpdateSuccess: !!updateResponse,
    isUpdateError: !!updateError,
    settingName,
    settingValue: selectedDietaryPreference
  })

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update' })()
    setShouldSubmit(true)
  }

  const isCtaDisabled = selectedDietaryPreference === currentDietaryPreference
    || !selectedDietaryPreference

  return (
    <SettingSection
      icon="leaf"
      title="Dietary Preference"
      instruction="Choose dietary preference"
      ctaText="Save dietary preference"
      isCtaDisabled={isCtaDisabled}
      renderCurrentValue={(
        <p data-testing="current-dietary-preference">
          {DIETARY_PREFERENCES_MAP[selectedDietaryPreference || currentDietaryPreference]}
        </p>
      )}
      onSubmit={onSubmit}
      onEditClick={trackSubscriptionSettingsChange({ settingName, action: 'edit' })}
      isMobile={isMobile}
      testingSelector="dietary-preference"
    >
      {isMobile && (
        <p data-testing="expanded-text">
          Please select your dietary preference.
        </p>
      )}

      { isLoaded && (
        <RadioGroup
          name="dietary-preference-radios"
          testingSelector="dietary-preference-radios"
          onChange={({ target: { value } }) => setSelectedDietaryPreference(value)}
        >
          {Object.keys(DIETARY_PREFERENCES_MAP).map(dietaryPreferenceValue => {
            const text = DIETARY_PREFERENCES_MAP[dietaryPreferenceValue]

            return (
              <InputRadio
                id={`${dietaryPreferenceValue}-radio`}
                key={dietaryPreferenceValue}
                name={`${dietaryPreferenceValue}-radio`}
                value={dietaryPreferenceValue}
                variant="tile"
                isChecked={dietaryPreferenceValue === currentDietaryPreference}
              >
                {text}
              </InputRadio>
            )
          })}
        </RadioGroup>
      )}
    </SettingSection>
  )
}

DietaryPreference.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
