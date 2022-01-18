import useSWR from 'swr'
import { useSelector } from 'react-redux'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import { getIsAuthenticated, getAccessToken } from 'selectors/auth'
import { getPromoModalVisible } from 'selectors/modals'
import { useIsOptimizelyFeatureEnabled } from '../../containers/OptimizelyRollouts/useOptimizely.hook'
import { getFetcher } from '../../routes/Menu/apis/fetch'
import { buildSubscriptionCommandUrl } from '../../routes/Account/apis/subscription'

import { getUserId } from '../../selectors/user'

type Time = string
type DateTime = string
type UUID = string
type Subscription = {
  status: 'OK'
  data: {
    userId: string
    subscription: {
      origin: string
      deliverySlotStartTime: Time
      interval: number
      deliverySlotEndTime: Time
      status: string
      createdAt: DateTime
      numPortions: 2 | 4
      updatedBy: UUID
      authUserId: UUID
      deliverySlotDay: number
      boxType: 'gourmet' | 'vegetarian'
      updatedAt: DateTime
      userId: string
      numRecipes: 2 | 3 | 4
      versionId: UUID
      intervalUnit: 'weeks' | 'months'
      lastChangeType: string
    }
  }
}

const useSubscription = () => {
  const accessToken = useSelector(getAccessToken)
  const userId = useSelector(getUserId)
  const url = buildSubscriptionCommandUrl(userId)
  const queryString = null
  const parametersForFetcher =
    accessToken && userId ? [url, queryString, accessToken, userId] : null

  return useSWR<Subscription>(parametersForFetcher, getFetcher)
}

const useHasSubscriptionFor2People4Recipes = () => {
  const TWO_PORTIONS_BOX = 2
  const FOUR_RECIPES_BOX = 4
  const { data: request } = useSubscription()

  return (
    request &&
    request.data.subscription.numPortions === TWO_PORTIONS_BOX &&
    request.data.subscription.numRecipes === FOUR_RECIPES_BOX
  )
}

export const HAS_SEEN_TEST_IN_MENU_STORAGE_NAME = 'gousto_has_seen_test_in_menu'
export const HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME =
  'gousto_has_seen_test_in_order_confirmation'
export const OPTIMIZELY_ENABLE_SUBSCRIBED = '5_recipes_painted_door_test_subscribed_user'
export const OPTIMIZELY_ENABLE_SIGNUP_FLOW = '5_recipes_painted_door_test_sign_up_user'

export const use5RecipesPaintedDoorTest = () => {
  const hasPromoAlready = useSelector(getPromoModalVisible)
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isNewUser = !isAuthenticated
  const [hasSeenOnMenu, setHasSeenOnMenuValue] = useLocalStorage(
    HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
    false
  )
  const [hasSeenOnOrderConfirmation, setOrderConfirmationAsSeenValue] = useLocalStorage(
    HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME,
    false
  )
  const setMenuAsSeen = () => setHasSeenOnMenuValue(true)
  const setOrderConfirmationAsSeen = () => setOrderConfirmationAsSeenValue(true)

  const hasSubscriptionFor2People4Recipes = useHasSubscriptionFor2People4Recipes()
  const isEnabledForSubscriptonUser = useIsOptimizelyFeatureEnabled(
    hasSubscriptionFor2People4Recipes ? OPTIMIZELY_ENABLE_SUBSCRIBED : null
  )
  // Prevent experiment from clashing with Promo
  const isNewUsersWithPromoModalClosed = isNewUser && !hasPromoAlready
  const isEnabledForSignUpUser = useIsOptimizelyFeatureEnabled(
    isNewUsersWithPromoModalClosed ? OPTIMIZELY_ENABLE_SIGNUP_FLOW : null
  )
  const isEnabled = Boolean(isEnabledForSubscriptonUser || isEnabledForSignUpUser)

  return {
    isEnabled,
    hasSeenOnMenu,
    hasSeenOnOrderConfirmation,
    setMenuAsSeen,
    setOrderConfirmationAsSeen,
    isNewUser,
  }
}
