import React from 'react'
import { HotjarTrigger } from 'components/HotjarTrigger/HotjarTrigger'
import { use5RecipesPaintedDoorTest } from './use5RecipesPaintedDoorTest'

export const FiveRecipesHotjarTrigger = () => {
  const { isEnabled, isNewUser, hasSeenOnOrderConfirmation, setOrderConfirmationAsSeen } = use5RecipesPaintedDoorTest()
  const shouldTriggerHotJar = isEnabled && !hasSeenOnOrderConfirmation
  const [shouldInvokeForSubscriptionUser] = React.useState(shouldTriggerHotJar && !isNewUser)
  const [shouldInvokeForNewUser] = React.useState(shouldTriggerHotJar && isNewUser)

  React.useEffect(() => {
    if (shouldTriggerHotJar && !hasSeenOnOrderConfirmation) {
      setOrderConfirmationAsSeen()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldTriggerHotJar, hasSeenOnOrderConfirmation])

  return (
    <>
      <HotjarTrigger name="painted_door_test_existing_users" shouldInvoke={shouldInvokeForSubscriptionUser} />
      <HotjarTrigger name="painted_door_test_new_users" shouldInvoke={shouldInvokeForNewUser} />
    </>
  )
}
