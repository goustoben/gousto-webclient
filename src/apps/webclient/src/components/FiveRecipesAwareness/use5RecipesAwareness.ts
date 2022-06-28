import { useSelector } from 'react-redux'
import useSWR from 'swr'
import { useLocalStorage } from 'usehooks-ts'

import routes from 'config/routes'
import { getIsAuthenticated, getAccessToken } from 'selectors/auth'

import { useIsOptimizelyFeatureEnabled } from '../../containers/OptimizelyRollouts/useOptimizely.hook'
import { buildSubscriptionQueryUrl } from '../../routes/Account/apis/subscription'
import { getFetcher } from '../../routes/Menu/apis/fetch'
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

  return useSWR<Subscription>(parametersForFetcher, getFetcher, {
    shouldRetryOnError: false,
  })
}

const useHasSubscriptionFor2People4Recipes = () => {
  const TWO_PORTIONS_BOX = 2
  const FOUR_RECIPES_BOX = 4
  const { data: request } = useSubscription()

  return (
    request &&
    request?.data?.subscription?.numPortions === TWO_PORTIONS_BOX &&
    request?.data?.subscription?.numRecipes === FOUR_RECIPES_BOX
  )
}

export const HAS_SEEN_ON_MENU_STORAGE_NAME = 'gousto_five_recipes_awareness_seen_on_menu'

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

  const hasSubscriptionFor2People4Recipes = useHasSubscriptionFor2People4Recipes()
  const isEnabledForSubscriptionUser = useIsOptimizelyFeatureEnabled(
    hasSubscriptionFor2People4Recipes ? OPTIMIZELY_ENABLED_SUBSCRIBED_FLOW : null,
  )

  const isEnabled = Boolean(isEnabledForSubscriptionUser)

  return {
    isEnabled,
    isNewUser,
    userSeenOnMenu,
    hasSeenOnMenu: Boolean(userSeenOnMenu),
    setMenuAsSeen,
    maxRecipes: isEnabled && !userSeenOnMenu ? 5 : 4,
  }
}
