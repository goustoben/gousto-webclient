import React from 'react'
import { HotjarTrigger } from 'components/HotjarTrigger/HotjarTrigger'
import { use5RecipesPaintedDoorTest, NEW_USER } from './use5RecipesPaintedDoorTest'

export const FiveRecipesHotjarTrigger = () => {
  const { userSeenOnMenu, hasSeenOnOrderConfirmation, setOrderConfirmationAsSeen } = use5RecipesPaintedDoorTest()
  const shouldTriggerHotJar = userSeenOnMenu && !hasSeenOnOrderConfirmation
  const isNewUser = userSeenOnMenu === NEW_USER
  const [shouldInvokeForSubscriptionUser] = React.useState(Boolean(shouldTriggerHotJar && !isNewUser))
  const [shouldInvokeForNewUser] = React.useState(Boolean(shouldTriggerHotJar && isNewUser))

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
