import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup, InputRadio } from 'goustouicomponents'
import { actionTypes } from 'routes/Account/Subscription/context/reducers'

import {
  SubscriptionContext,
} from '../../../../context'
import { getNumPortions, getIsBoxLoaded } from '../../../../context/selectors/box'
import { SettingSection } from '../../../../components/SettingSection'
import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { trackSubscriptionSettingsChange } from '../../../../tracking'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'
import { BOX_SIZES } from '../../../../enum/box'

export const BoxSize = ({ accessToken, isMobile }) => {
  const { state, dispatch } = useContext(SubscriptionContext)

  const isLoaded = getIsBoxLoaded(state)
  const currentBoxSize = getNumPortions(state)

  const [selectedBoxSize, setSelectedBoxSize] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const settingName = 'box_size'

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      num_portions: selectedBoxSize
    },
    settingName
  })

  useSubscriptionToast(updateResponse, updateError)

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update' })()
    setShouldSubmit(true)
  }

  const isCtaDisabled = selectedBoxSize === currentBoxSize
    || !selectedBoxSize

  const onChange = ({ target: { value } }) => {
    dispatch({
      type: actionTypes.UPDATE_FOUR_BY_FIVE_MODAL,
      data: { selectedBoxSize: value }
    })
    setSelectedBoxSize(value)
  }

  return (
    <SettingSection
      icon="servings"
      title="Box size"
      instruction="Choose box size"
      ctaText="Save box size"
      isCtaDisabled={isCtaDisabled}
      renderCurrentValue={(
        <p data-testing="current-box-size">
          {selectedBoxSize || currentBoxSize}
          {' '}
          people
        </p>
      )}
      onSubmit={onSubmit}
      onEditClick={trackSubscriptionSettingsChange({ settingName, action: 'edit' })}
      isMobile={isMobile}
      testingSelector="box-size"
    >
      { isMobile ? (
        <p data-testing="expanded-text">
          Please select your box size.
        </p>
      ) : null}

      { isLoaded ? (
        <RadioGroup
          name="box-size-radios"
          testingSelector="box-size-radios"
          onChange={onChange}
        >
          {BOX_SIZES.map(boxSize => (
            <InputRadio
              id={`box-size-${boxSize}-radio`}
              key={`box-size-${boxSize}`}
              name={`box-size-${boxSize}-radio`}
              value={boxSize}
              variant="tile"
              isChecked={boxSize === (selectedBoxSize || currentBoxSize)}
            >
              {boxSize}
              {' '}
              people
            </InputRadio>
          ))}
        </RadioGroup>
      ) : null}
    </SettingSection>
  )
}

BoxSize.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
