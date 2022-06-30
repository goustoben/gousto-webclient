import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { useLocalStorage } from 'usehooks-ts'

import routes from 'config/routes'
import { getIsAuthenticated, getAccessToken } from 'selectors/auth'

import { useIsOptimizelyFeatureEnabled } from '../../containers/OptimizelyRollouts/useOptimizely.hook'
import { buildSubscriptionQueryUrl } from '../../routes/Account/apis/subscription'
import { getFetcher } from '../../routes/Menu/apis/fetch'
import { useSupportedBoxTypes } from '../../routes/Menu/domains/basket'
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
  const url = buildSubscriptionQueryUrl(userId, routes.subscriptionQuery.subscriptions)
  const queryString = null
  const parametersForFetcher =
    accessToken && userId ? [url, queryString, accessToken, userId] : null

  const { data: response } = useSWR<Subscription>(parametersForFetcher, getFetcher, {
    shouldRetryOnError: false,
  })

  return response?.data?.subscription
}

const useCanOrder5Recipes = () => {
  const { maxRecipesForPortion } = useSupportedBoxTypes()
  const subscription = useSubscription()

  return (
    subscription &&
    subscription?.numPortions &&
    maxRecipesForPortion(subscription?.numPortions) >= 5
  )
}

export const HAS_SEEN_ON_MENU_STORAGE_NAME = 'gousto_five_recipes_awareness_seen_on_menu'
export const HAS_CLOSED_BANNER = 'gousto_five_recipes_banner_closed'


export const OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW =
  'radishes_five_recipes_awareness_subscribed_web_enabled'

export const use5RecipesAwareness = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isNewUser = !isAuthenticated

  const [userSeenOnMenu, setHasSeenOnMenuValue] = useLocalStorage<null | boolean>(
    HAS_SEEN_ON_MENU_STORAGE_NAME,
    null,
  )
  const setMenuAsSeen = () => setHasSeenOnMenuValue(true)

  const [userClosedBanner, setUserClosedBanner] = useLocalStorage<null | boolean>(
    HAS_CLOSED_BANNER,
    null,
  )
  const setBannerAsClosed = () => setUserClosedBanner(true)

  const hasSubscriptionFor2People4Recipes = useHasSubscriptionFor2People4Recipes()
  const isEnabledForSubscriptionUser = useIsOptimizelyFeatureEnabled(
<<<<<<< HEAD
    canOrder5Recipes ? OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW : null,
  )
  const isUserIncludedIn5RecipeRollout = useIsOptimizelyFeatureEnabled(
    hasSubscriptionFor2People4Recipes ? OPTIMIZELY_ENABLED_FIVE_RECIPES_ROLLOUT : null,
=======
    hasSubscriptionFor2People4Recipes ? OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW : null,
>>>>>>> 67cb46271 (updates based on simplified business logic)
  )

  const isEnabled = Boolean(isEnabledForSubscriptionUser)

  return {
    isEnabled,
    isNewUser,
    userSeenOnMenu,
    hasSeenOnMenu: Boolean(userSeenOnMenu),
    setMenuAsSeen,
    userClosedBanner,
    hasClosedBanner: Boolean(userClosedBanner),
    setBannerAsClosed,
    maxRecipes: isEnabled && !userSeenOnMenu ? 5 : 4,
  }
}
