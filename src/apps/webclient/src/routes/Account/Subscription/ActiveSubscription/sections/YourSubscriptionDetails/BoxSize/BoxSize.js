import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup } from '@gousto-internal/citrus-react'
import { actionTypes } from 'routes/Account/Subscription/context/reducers'

import {
  SubscriptionContext,
} from '../../../../context'
import { getNumPortions, getIsBoxLoaded, getSelectedBoxSize, getSubscriptionSettingsUnsupported } from '../../../../context/selectors/box'
import { SettingSection } from '../../../../components/SettingSection'
import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { trackSubscriptionSettingsChange } from '../../../../tracking'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'
import { BOX_SIZES } from '../../../../enum/box'

export const BoxSize = ({ accessToken, isMobile }) => {
  const { state, dispatch } = useContext(SubscriptionContext)

  const isLoaded = getIsBoxLoaded(state)
  const currentBoxSize = getNumPortions(state)
  const selectedBoxSize = getSelectedBoxSize(state)
  const isUnsupported = getSubscriptionSettingsUnsupported(state)

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
  const updateSelectedBoxSize = (boxSize) => {
    dispatch({
      type: actionTypes.UPDATE_SELECTED_BOX_SIZE,
      data: { numPortions: boxSize }
    })
  }
  const isCtaDisabled = selectedBoxSize === currentBoxSize || !selectedBoxSize

  return (
    <SettingSection
      icon="servings"
      title="Box size"
      instruction="Choose box size"
      ctaText="Save box size"
      isCtaDisabled={isCtaDisabled}
      onChildrenRender={(collapseSection) => {
        if (!isUnsupported) {
          return
        }
        // a workaround to close the <ExpandableSection /> when external state changes
        collapseSection()
      }}
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
      {isMobile ? (
        <p data-testing="expanded-text">
          Please select your box size.
        </p>
      ) : null}

      {isLoaded ? (
        <RadioGroup
          outline
          defaultValue={selectedBoxSize}
          name="box-size-radios"
          testingSelector="box-size-radios"
          onChange={({ target: { value } }) => updateSelectedBoxSize(value)}
          options={BOX_SIZES.map((boxSize) => ({
            label: `${boxSize} people`,
            name: boxSize,
            value: boxSize,
          }))}
        />
      ) : null}
    </SettingSection>
  )
}

BoxSize.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
}
