import React, { useContext, useState } from 'react'

import {
  ButtonColorVariant,
  Text,
  Modal,
  ModalBody,
  ModalButton,
  ModalHeader,
  TextAlign,
  ModalFooter,
  Heading6,
  ButtonSize,
  FontWeight,
} from '@gousto-internal/citrus-react'

import { SubscriptionContext } from 'routes/Account/Subscription/context'
import { actionTypes } from 'routes/Account/Subscription/context/reducers'
import { getSubscriptionSettingsUnsupported } from 'routes/Account/Subscription/context/selectors/box'
import { BOX_SIZES, MEALS_PER_BOX_MAP } from 'routes/Account/Subscription/enum/box'
import { useSubscriptionToast } from 'routes/Account/Subscription/hooks/useSubscriptionToast'
import { useUpdateSubscription } from 'routes/Account/Subscription/hooks/useUpdateSubscription'

type Props = {
  accessToken: string
}

const FourPersonBoxWithFiveMealsModal: React.FC<Props> = ({ accessToken }: Props) => {
  const { 1: fourPortions } = BOX_SIZES
  const { 4: fourRecipes } = MEALS_PER_BOX_MAP
  const { dispatch, state } = useContext<any>(SubscriptionContext)
  const [shouldSubmit, setShouldSubmit] = useState(false)
  const [, updateResponse, updateError] = useUpdateSubscription({
    accessToken,
    trigger: {
      shouldRequest: shouldSubmit,
      setShouldRequest: setShouldSubmit,
    },
    data: {
      num_recipes: fourRecipes,
      num_portions: fourPortions,
    },
    settingName: 'modal_update_to_4x4',
  })
  const isUnsupported = getSubscriptionSettingsUnsupported(state)
  const onCancel = () => {
    dispatch({
      type: actionTypes.UPDATE_SELECTED_BOX_SIZE,
      data: { numPortions: BOX_SIZES[0] },
    })
  }
  const onSettingsUpdate = () => {
    dispatch({ type: actionTypes.SWITCH_TO_FOUR_MEALS_PER_BOX })
    setShouldSubmit(true)
  }

  useSubscriptionToast(updateResponse, updateError)

  return (
    <Modal
      preventScroll
      isOpen={isUnsupported}
      name="FourPersonBoxWithFiveMealsModal"
      onRequestClose={onCancel}
    >
      <ModalHeader>
        <Heading6 textAlign={TextAlign.Center}>
          Sorry! We don&apos;t offer 5 recipes on a 4-person box
        </Heading6>
      </ModalHeader>
      <ModalBody>
        <Text fontWeight={FontWeight.SemiBold}>Want 5 recipes? Stay on a 2-person box.</Text>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          colorVariant={ButtonColorVariant.Secondary}
          onClick={onSettingsUpdate}
          size={ButtonSize.Medium}
          width="100%"
        >
          Change to a 4-person box
        </ModalButton>
        <ModalButton
          colorVariant={ButtonColorVariant.Primary}
          onClick={onCancel}
          size={ButtonSize.Medium}
          width="100%"
        >
          Cancel and get 5 recipes
        </ModalButton>
      </ModalFooter>
    </Modal>
  )
}

export { FourPersonBoxWithFiveMealsModal }
