import useSWR from 'swr'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getAccessToken } from 'selectors/auth'
import { useLocalStorage } from 'usehooks-ts'
import { getPromoModalVisible } from 'selectors/modals'
import routes from 'config/routes'
import React from 'react'
import { isMenuLoading } from 'routes/Menu/selectors/menu'
import { getPromoCode } from 'selectors/basket'
import { useIsOptimizelyFeatureEnabled } from '../../containers/OptimizelyRollouts/useOptimizely.hook'
import { getFetcher } from '../../routes/Menu/apis/fetch'
import { buildSubscriptionQueryUrl } from '../../routes/Account/apis/subscription'
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
      status: 'active' | 'inactive'
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
  const parametersForFetcher = accessToken && userId ? [url, queryString, accessToken, userId] : null

  return useSWR<Subscription>(parametersForFetcher, getFetcher, {
    shouldRetryOnError: false,
  })
}

const useIsUserValidForSubscriptionFeature = () => {
  const TWO_PORTIONS_BOX = 2
  const FOUR_RECIPES_BOX = 4
  const { data: request } = useSubscription()
  const isLoading = useSelector(isMenuLoading)

  return (
    !isLoading
    && request
    && request?.data?.subscription?.status === 'active'
    && request?.data?.subscription?.numPortions === TWO_PORTIONS_BOX
    && request?.data?.subscription?.numRecipes === FOUR_RECIPES_BOX
  )
}

const SESSION_KEY_FOR_PATHNAME_FOR_PROMO_CODE = 'pathname_for_promo_code'

const useIsUserValidForNewUserFeature = () => {
  // Prevent experiment from clashing with Promo Code modal
  const promoModalVisible = useSelector(getPromoModalVisible)
  const hasPromoCode = useSelector(getPromoCode)
  const [pathnameForPromoCode, setPathnameForPromoCode] = useLocalStorage<string>(
    SESSION_KEY_FOR_PATHNAME_FOR_PROMO_CODE,
    ''
  )
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isNewUser = !isAuthenticated
  const isLoading = useSelector(isMenuLoading)

  React.useEffect(() => {
    if (promoModalVisible && typeof window !== 'undefined') {
      setPathnameForPromoCode(window?.location?.pathname )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promoModalVisible])

  return hasPromoCode && !isLoading && !promoModalVisible && isNewUser && !pathnameForPromoCode.includes('menu')
}

export const HAS_SEEN_TEST_IN_MENU_STORAGE_NAME = 'gousto_has_seen_test_in_menu'
export const HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME = 'gousto_has_seen_test_in_order_confirmation'
export const OPTIMIZELY_ENABLE_SUBSCRIBED = 'radishes_5_recipes_painted_door_test_subscribed_user_web_enabled'
export const OPTIMIZELY_ENABLE_SIGNUP_FLOW = 'radishes_5_recipes_painted_door_test_sign_up_user_web_enabled'

export const NEW_USER = 'new_user'
export const EXISTING_USER = 'existing_user'

export const use5RecipesPaintedDoorTest = () => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isNewUser = !isAuthenticated
  const [userSeenOnMenu, setHasSeenOnMenuValue] = useLocalStorage<null | string>(
    HAS_SEEN_TEST_IN_MENU_STORAGE_NAME,
    null
  )
  const [hasSeenOnOrderConfirmation, setOrderConfirmationAsSeenValue] = useLocalStorage(
    HAS_SEEN_TEST_IN_ORDER_CONFIRMATION_STORAGE_NAME,
    false
  )
  const setMenuAsSeen = () => setHasSeenOnMenuValue(isNewUser ? NEW_USER : EXISTING_USER)
  const setOrderConfirmationAsSeen = () => setOrderConfirmationAsSeenValue(true)

  const isSubscribedAndEnabled = useIsUserValidForSubscriptionFeature()
  const isNewUserAndEnabled = useIsUserValidForNewUserFeature()

  const isEnabledForSubscriptionUser = useIsOptimizelyFeatureEnabled(
    isSubscribedAndEnabled ? OPTIMIZELY_ENABLE_SUBSCRIBED : null
  )
  const isEnabledForSignUpUser = useIsOptimizelyFeatureEnabled(
    isNewUserAndEnabled ? OPTIMIZELY_ENABLE_SIGNUP_FLOW : null
  )

  const isEnabled = Boolean(isEnabledForSubscriptionUser || isEnabledForSignUpUser)

  let experimentId
  if (isEnabled) {
    experimentId = isSubscribedAndEnabled ? OPTIMIZELY_ENABLE_SUBSCRIBED : OPTIMIZELY_ENABLE_SIGNUP_FLOW
  }

  return {
    isEnabled,
    userSeenOnMenu,
    hasSeenOnMenu: Boolean(userSeenOnMenu),
    hasSeenOnOrderConfirmation,
    setMenuAsSeen,
    setOrderConfirmationAsSeen,
    isNewUser,
    maxRecipes: isEnabled && !userSeenOnMenu ? 5 : 4,
    experimentId
  }
}
