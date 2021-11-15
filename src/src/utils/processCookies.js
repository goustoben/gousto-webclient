import Immutable from 'immutable'
import { cookiePrefix } from 'config/storePersistence'
import logger from 'utils/logger'
import { get } from './cookieHelper2'
import { appBannerDismiss } from "actions/appBanner/appBannerDismiss"
import { basketSetNumRecipes } from "actions/basket/basketSetNumRecipes"
import { basketPromoCodeChange } from "actions/basket/basketPromoCodeChange"
import { basketPromoCodeUrlChange } from "actions/basket/basketPromoCodeUrlChange"
import { basketSetSubscriptionOption } from "actions/basket/basketSetSubscriptionOption"
import { basketPreviewOrderChange } from "actions/basket/basketPreviewOrderChange"
import { basketStepsOrderReceive } from "actions/basket/basketStepsOrderReceive"
import { basketSignupCollectionReceive } from "actions/basket/basketSignupCollectionReceive"
import { basketPostcodeChangePure } from "actions/basket/basketPostcodeChangePure"
import { basketAddressChange } from "actions/basket/basketAddressChange"
import { basketChosenAddressChange } from "actions/basket/basketChosenAddressChange"
import { basketDateChange } from "actions/basket/basketDateChange"
import { basketSlotChange } from "actions/basket/basketSlotChange"
import { basketNumPortionChange } from "actions/basket/basketNumPortionChange"
import { basketRecipesInitialise } from "actions/basket/basketRecipesInitialise"
import { authUserRememberMe } from "actions/auth/authUserRememberMe"
import { authUserAuthenticated } from "actions/auth/authUserAuthenticated"
import { loadContentVariants } from "actions/content/loadContentVariants"
import { cookiePolicyAcceptanceChange } from "actions/cookies/cookiePolicyAcceptanceChange"
import { featuresSet } from "actions/features/featuresSet"
import { simpleHeader } from "actions/persist/simpleHeader"
import { promoAgeVerify } from "../actions/promos/promoAgeVerify"
import { signupStepsReceive } from "actions/signup/signupStepsReceive"
import { setAffiliateSource } from "actions/tracking/setAffiliateSource"
import { setTutorialViewed } from "actions/tutorial/setTutorialViewed"
import { initSelectedRecipeVariantAction } from "routes/Menu/actions/menuRecipeDetails/initSelectedRecipeVariantAction"

const getCookieStoreValue = (cookies, key) => get(cookies, `${cookiePrefix}_${key}`)

/**
 * Warning this method is not tested, so be careful when modifying.
 */
const processCookies = (cookies, store) => {
  /* legacy cookies - need raw values */
  const promoCodeUrl = cookies.get('promo_url')
  const fromJoin = cookies.get('from_join')
  let affiliateSource = cookies.get('asource')

  try {
    const refreshCookie = get(cookies, 'oauth_refresh')
    const tokenCookie = get(cookies, 'oauth_token')
    const expiryCookie = get(cookies, 'oauth_expiry')
    const rememberCookie = get(cookies, 'oauth_remember')

    let accessToken
    if (tokenCookie) {
      accessToken = tokenCookie.access_token
    }

    let expiresAt
    if (expiryCookie) {
      expiresAt = expiryCookie.expires_at
    }

    let refreshToken
    if (refreshCookie) {
      refreshToken = refreshCookie.refresh_token
    }

    if (rememberCookie) {
      const rememberMe = rememberCookie.remember_me
      if (typeof rememberMe !== 'undefined') {
        store.dispatch(authUserRememberMe(rememberMe))
      }
    }

    if (accessToken || refreshToken) {
      store.dispatch(authUserAuthenticated(accessToken, refreshToken, expiresAt))
    }
  } catch (err) {
    logger.warning(err)
  }

  let orderId = store.getState().basket.get('orderId')
  if (getCookieStoreValue(cookies, 'basket_orderId')) {
    orderId = getCookieStoreValue(cookies, 'basket_orderId')
  }

  const postcode = getCookieStoreValue(cookies, 'basket_postcode')
  let signupSteps = getCookieStoreValue(cookies, 'signup_wizard_steps')
  const address = getCookieStoreValue(cookies, 'basket_address')
  const date = getCookieStoreValue(cookies, 'basket_date')
  const slotId = getCookieStoreValue(cookies, 'basket_slotId')
  const previewOrderId = getCookieStoreValue(cookies, 'basket_previewOrderId')
  const boxId = getCookieStoreValue(cookies, 'basket_boxId')
  const numPortions = getCookieStoreValue(cookies, 'basket_numPortions')
  const numRecipes = getCookieStoreValue(cookies, 'basket_numRecipes')
  let recipes = getCookieStoreValue(cookies, 'basket_recipes')
  const stepsOrder = getCookieStoreValue(cookies, 'basket_stepsOrder')
  const promoCode = getCookieStoreValue(cookies, 'basket_promoCode')
  const subscriptionOption = getCookieStoreValue(cookies, 'basket_subscriptionOption')
  const collection = getCookieStoreValue(cookies, 'basket_collection')
  const promoAgeVerified = getCookieStoreValue(cookies, 'promoAgeVerified')
  const tracking = getCookieStoreValue(cookies, 'tracking')
  const cookiePolicy = get(cookies, 'cookie_policy_v2')
  const appBannerDismissed = get(cookies, 'app_banner_dismissed')

  let features = getCookieStoreValue(cookies, 'features')
  let variants = getCookieStoreValue(cookies, 'variants')
  const tutorialsViewed = get(cookies, 'tutorial_viewed')

  const selectedRecipeVariants = getCookieStoreValue(cookies, 'menu_selectedRecipeVariants')

  if (selectedRecipeVariants) {
    try {
      store.dispatch(initSelectedRecipeVariantAction(JSON.parse(selectedRecipeVariants)))
    } catch (e) {
      logger.error({ message: 'error parsing selected recipes variant cookie value', errors: [e] })
    }
  }

  if (cookiePolicy) {
    store.dispatch(cookiePolicyAcceptanceChange(cookiePolicy.isAccepted))
  }

  if (appBannerDismissed) {
    store.dispatch(appBannerDismiss())
  }

  if (promoCode) {
    store.dispatch(basketPromoCodeChange(promoCode))
  }
  if (promoAgeVerified) {
    try {
      const verified = JSON.parse(promoAgeVerified)
      store.dispatch(promoAgeVerify(verified))
    } catch (e) {
      // do nothing
    }
  }
  if (fromJoin) {
    try {
      let parsedJoinCookie = JSON.parse(decodeURIComponent(fromJoin))
      if (parsedJoinCookie === 'join2') {
        parsedJoinCookie = 'join'
      }
      store.dispatch(simpleHeader(parsedJoinCookie))
    } catch (error) {
      store.dispatch(simpleHeader(true))
    }
  }

  if (tracking) {
    try {
      affiliateSource = JSON.parse(tracking).asource || affiliateSource
    } catch (err) {
      logger.error({ message: 'error parsing tracking asource cookie value', errors: [err] })
    }
  }

  if (affiliateSource) {
    store.dispatch(setAffiliateSource(affiliateSource))
  }

  if (promoCodeUrl) {
    store.dispatch(basketPromoCodeUrlChange(promoCodeUrl))
  }

  if (subscriptionOption) {
    store.dispatch(basketSetSubscriptionOption(subscriptionOption))
  }

  if (previewOrderId && boxId) {
    store.dispatch(basketPreviewOrderChange(previewOrderId, boxId))
  }

  if (stepsOrder) {
    store.dispatch(basketStepsOrderReceive(JSON.parse(stepsOrder)))
  }

  if (collection) {
    store.dispatch(basketSignupCollectionReceive(collection))
  }

  if (!orderId) {
    if (postcode) {
      store.dispatch(basketPostcodeChangePure(postcode))
    }

    if (address) {
      const immutableAddress = Immutable.fromJS(JSON.parse(address))
      store.dispatch(basketAddressChange(immutableAddress))
      store.dispatch(basketChosenAddressChange(immutableAddress))
    }

    if (date) {
      store.dispatch(basketDateChange(date))
      if (slotId) {
        store.dispatch(basketSlotChange(slotId))
      }
    }

    if (numPortions) {
      store.dispatch(basketNumPortionChange(numPortions))
    }
    if (numRecipes) {
      store.dispatch(basketSetNumRecipes(numRecipes))
    }

    recipes = recipes ? JSON.parse(recipes) : {}
    store.dispatch(basketRecipesInitialise(recipes))
  }

  if (features) {
    try {
      features = JSON.parse(features)
      const featureArray = Object.entries(features).map(([feature, content]) => {
        if (content && typeof content === 'object') {
          return { feature, value: content.value }
        }

        return { feature, value: content }
      })

      store.dispatch(featuresSet(featureArray))
    } catch (err) {
      logger.error({ message: 'error parsing features cookie value', errors: [err] })
    }
  }

  if (tutorialsViewed) {
    try {
      Object.entries(tutorialsViewed).forEach(([name, count]) => {
        store.dispatch(setTutorialViewed(name, count))
      })
    } catch (e) {
      logger.notice({
        message: 'error parsing tutorials cookie value',
        errors: [e],
      })
    }
  }

  if (signupSteps) {
    try {
      signupSteps = JSON.parse(signupSteps)
      store.dispatch(signupStepsReceive(signupSteps))
    } catch (err) {
      logger.error({ message: 'error parsing signup steps cookie value', errors: [err] })
    }
  }

  if (variants) {
    try {
      variants = JSON.parse(variants)
      store.dispatch(loadContentVariants(variants))
    } catch (err) {
      logger.error({ message: 'error parsing variants cookie value', errors: [err] })
    }
  }
}

export { processCookies }
