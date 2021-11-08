import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { RadioGroup, InputRadio } from 'goustouicomponents'

import { SubscriptionContext } from '../../../../context'
import { getNumPortions, getIsBoxLoaded } from '../../../../context/selectors/box'
import { SettingSection } from '../../../../components/SettingSection'
import { useUpdateSubscription } from '../../../../hooks/useUpdateSubscription'
import { trackSubscriptionSettingsChange } from '../../../../tracking'
import { useSubscriptionToast } from '../../../../hooks/useSubscriptionToast'
import { BOX_SIZES } from '../../../../enum/box'

export const BoxSize = ({ accessToken, isMobile }) => {
  const context = useContext(SubscriptionContext)
  const { state } = context

  const isLoaded = getIsBoxLoaded(state)
  const currentBoxSize = getNumPortions(state)

  const [selectedBoxSize, setSelectedBoxSize] = useState(null)
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const settingName = 'box_size'

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit,
    },
    data: {
      num_portions: selectedBoxSize,
    },
    settingName,
  })

  useSubscriptionToast(updateResponse, updateError)

  const onSubmit = () => {
    trackSubscriptionSettingsChange({ settingName, action: 'update' })()
    setShouldSubmit(true)
  }

  const isCtaDisabled = selectedBoxSize === currentBoxSize || !selectedBoxSize

  return <></>
}

BoxSize.propTypes = {
  accessToken: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired,
}
