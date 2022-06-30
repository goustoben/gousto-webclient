import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CTA, Modal } from 'goustouicomponents'

import { BOX_SIZES, MEALS_PER_BOX_MAP } from '../../enum/box'
import { useUpdateSubscription } from '../../hooks/useUpdateSubscription'
import { useSubscriptionToast } from '../../hooks/useSubscriptionToast'

export const DummyModal = ({ accessToken }) => {
  const { 1: fourPortions } = BOX_SIZES
  const { 4: fourRecipes } = MEALS_PER_BOX_MAP
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const handleSaveCTAClick = () => {
    setShouldSubmit(true)
  }

  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit
    },
    data: {
      num_recipes: fourRecipes,
      num_portions: fourPortions,
    },
    settingName: 'modal_update_to_4x4',
  })

  useSubscriptionToast(updateResponse, updateError)

  return (
    <Modal
      withOverlay
      isOpen
      name="dummy-modal"
      description="dummy modal"
      handleClose={() => {}}
      variant="floating"
      animated={false}
    >

      <div>
        <CTA
          variant="secondary"
          onClick={handleSaveCTAClick}
          isFullWidth
          data-testing="save-4x4-cta"
        >
          Save settings to 4x4
        </CTA>
      </div>
    </Modal>
  )
}

DummyModal.propTypes = {
  accessToken: PropTypes.string.isRequired,
}
