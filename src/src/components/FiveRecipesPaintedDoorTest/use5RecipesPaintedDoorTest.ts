import useSWR from 'swr'
import { useSelector } from 'react-redux'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { useIsOptimizelyFeatureEnabled } from '../../containers/OptimizelyRollouts/useOptimizely.hook'
import { getFetcher } from '../../routes/Menu/apis/fetch'
import { buildSubscriptionCommandUrl } from '../../routes/Account/apis/subscription'
import { getAccessToken } from '../../selectors/auth'
import { getUserId } from '../../selectors/user'

type Time = string
type DateTime = string
type UUID = string
type Subscription = {
  status: 'OK',
  data: {
    userId: string,
    subscription: {
      origin: string,
      deliverySlotStartTime: Time,
      interval: number,
      deliverySlotEndTime: Time,
      status: string,
      createdAt: DateTime,
      numPortions: 2 | 4,
      updatedBy: UUID,
      authUserId: UUID,
      deliverySlotDay: number,
      boxType: 'gourmet' | 'vegetarian',
      updatedAt: DateTime,
      userId: string,
      numRecipes: 2 | 3 | 4,
      versionId: UUID,
      intervalUnit: 'weeks' | 'months',
      lastChangeType: string,
    }
  }
}

const useSubscription = () => {
  const accessToken = useSelector(getAccessToken)
  const userId = useSelector(getUserId)
  const url = buildSubscriptionCommandUrl(userId)
  const queryString = null
  const parametersForFetcher = accessToken && userId ? [
    url,
    queryString,
    accessToken,
    userId,
  ] : null

  return useSWR<Subscription>(parametersForFetcher, getFetcher)
}

const useIsEligibleForTest = () => {
  const TWO_PORTIONS_BOX = 2
  const FOUR_RECIPES_BOX = 4
  const { data: request } = useSubscription()

  return (
    request
    && request.data.subscription.numPortions === TWO_PORTIONS_BOX
    && request.data.subscription.numRecipes === FOUR_RECIPES_BOX
  )
}

export const use5RecipesPaintedDoorTest = () => {
  const HAS_SEEN_TEST_IN_MENU_STORAGE_NAME = 'gousto_has_seen_test_in_menu'
  const HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME = 'gousto_has_seen_test_in_order_confirmation'
  const OPTIMIZELY_FEATURE_NAME = '5_recipes_painted_door_test'

  const [hasSeenOnMenu, setHasSeenOnMenuValue] = useLocalStorage(HAS_SEEN_TEST_IN_MENU_STORAGE_NAME, false)
  const [hasSeenOnOrderConfirmation, setOrderConfirmationAsSeenValue] = useLocalStorage(HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME, false)
  const isEligibleForTest = useIsEligibleForTest()
  const isTestEnabled = useIsOptimizelyFeatureEnabled(isEligibleForTest ? OPTIMIZELY_FEATURE_NAME : null)
  const setMenuAsSeen = () => setHasSeenOnMenuValue(true)
  const setOrderConfirmationAsSeen = () => setOrderConfirmationAsSeenValue(true)
  const isEnabled = Boolean(isTestEnabled)

  return {
    isEnabled,
    hasSeenOnMenu,
    hasSeenOnOrderConfirmation,
    setMenuAsSeen,
    setOrderConfirmationAsSeen,
    // TODO: proper implementation in TR-9773
    isNewUser: false
  }
}
