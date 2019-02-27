import Immutable from 'immutable'
import { cookiePrefix } from 'config/storePersistence'
import basketActions from 'actions/basket'
import signupActions from 'actions/signup'
import featureActions from 'actions/features'
import promoActions from 'actions/promos'
import authActions from 'actions/auth'
import filterActions from 'actions/filters'
import cookieActions from 'actions/cookies'
import trackingActions from 'actions/tracking'
import { setTutorialViewed } from 'actions/tutorial'
import { loadContentVariants } from 'actions/content'
import logger from 'utils/logger'
import persist from 'actions/persist'
import { get } from './cookieHelper2'

const getCookieStoreValue = (cookies, key) => get(cookies, `${cookiePrefix}_${key}`)

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
        store.dispatch(authActions.userRememberMe(rememberMe))
        store.dispatch(authActions.redirectLoggedInUser())
      }
    }

    if (accessToken || refreshToken) {
      store.dispatch(authActions.userAuthenticated(accessToken, refreshToken, expiresAt))
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
  let recipes = getCookieStoreValue(cookies, 'basket_recipes')
  let recipesPositions = getCookieStoreValue(cookies, 'basket_recipesPositions')
  const stepsOrder = getCookieStoreValue(cookies, 'basket_stepsOrder')
  const promoCode = getCookieStoreValue(cookies, 'basket_promoCode')
  const collection = getCookieStoreValue(cookies, 'basket_collection')
  const currentCollectionId = getCookieStoreValue(cookies, 'filters_currentCollectionId')
  const promoAgeVerified = getCookieStoreValue(cookies, 'promoAgeVerified')
  const tracking = getCookieStoreValue(cookies, 'tracking')
  const cookiePolicy = get(cookies, 'cookie_policy')

  let features = getCookieStoreValue(cookies, 'features')
  let variants = getCookieStoreValue(cookies, 'variants')
  const tutorialsViewed = getCookieStoreValue(cookies, 'tutorial_viewed')

  if (cookiePolicy) {
    store.dispatch(cookieActions.cookiePolicyAcceptanceChange(cookiePolicy.isAccepted))
  }

  if (promoCode) {
    store.dispatch(basketActions.basketPromoCodeChange(promoCode))
  }
  if (promoAgeVerified) {
    try {
      const verified = JSON.parse(promoAgeVerified)
      store.dispatch(promoActions.promoAgeVerify(verified))
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
      store.dispatch(persist.simpleHeader(parsedJoinCookie))
    } catch (error) {
      store.dispatch(persist.simpleHeader(true))
    }
  }

  if (tracking) {
    try {
      affiliateSource = JSON.parse(tracking).asource || affiliateSource
    } catch (err) {
      logger.error({message: 'error parsing tracking asource cookie value', errors: [err]})
    }
  }

  if (affiliateSource) {
    store.dispatch(trackingActions.setAffiliateSource(affiliateSource))
  }

  if (promoCodeUrl) {
    store.dispatch(basketActions.basketPromoCodeUrlChange(promoCodeUrl))
  }

  if (previewOrderId && boxId) {
    store.dispatch(basketActions.basketPreviewOrderChange(previewOrderId, boxId))
  }

  if (stepsOrder) {
    store.dispatch(basketActions.basketStepsOrderReceive(JSON.parse(stepsOrder)))
  }

  if (collection) {
    store.dispatch(basketActions.basketSignupCollectionReceive(collection))
  }

  if (currentCollectionId) {
    store.dispatch(filterActions.collectionFilterIdRecieve(currentCollectionId))
  }

  if (!orderId) {
    if (postcode) {
      store.dispatch(basketActions.basketPostcodeChangePure(postcode))
    }

    if (address) {
      const immutableAddress = Immutable.fromJS(JSON.parse(address))
      store.dispatch(basketActions.basketAddressChange(immutableAddress))
      store.dispatch(basketActions.basketChosenAddressChange(immutableAddress))
    }

    if (date) {
      store.dispatch(basketActions.basketDateChange(date))
      if (slotId) {
        store.dispatch(basketActions.basketSlotChange(slotId))
      }
    }

    if (numPortions) {
      store.dispatch(basketActions.basketNumPortionChange(numPortions))
    }

    if (recipes) {
      recipes = JSON.parse(recipes)

      if (Object.keys(recipes).length > 0) {
        store.dispatch(basketActions.basketRecipesClear())
      }
      if (recipesPositions) {
        recipesPositions = JSON.parse(recipesPositions)

        if (Object.keys(recipesPositions).length > 0) {
          store.dispatch(basketActions.basketRecipesPositionsClear())
        }
      }

      Object.keys(recipes).forEach((recipeId) => {
        for (let i = 0; i < recipes[recipeId]; i++) {
          let recipeInfo = null
          const index = Array.isArray(recipesPositions) ? recipesPositions.findIndex((el) => Object.keys(el).length > 0 && Object.keys(el)[0] === recipeId) : -1
          if (index !== -1) {
            recipeInfo = recipesPositions[index][recipeId]
            recipesPositions.splice(index, 1)
          }
          store.dispatch(basketActions.basketRecipeAdd(recipeId, null, true, recipeInfo))
        }
      })
    }
  }

  if (features) {
    try {
      features = JSON.parse(features)
      Object.keys(features).forEach((feature) => {
        const featureContent = features[feature]
        let experiment
        let value

        if (featureContent && typeof featureContent === 'object') {
          experiment = featureContent.experiment || false
          value = featureContent.value
        } else {
          experiment = false
          value = featureContent
        }

        store.dispatch(featureActions.featureSet(feature, value, experiment))
      })
    } catch (err) {
      logger.error({message: 'error parsing features cookie value', errors: [err] })
    }
  }

  if (tutorialsViewed) {
    try {
      const tutorials = JSON.parse(tutorialsViewed)
      Object.entries(tutorials).forEach(([name, count]) => {
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
      store.dispatch(signupActions.signupStepsReceive(signupSteps))
    } catch (err) {
      logger.error({message: 'error parsing signup steps cookie value', errors: [err] })
    }
  }

  if (variants) {
    try {
      variants = JSON.parse(variants)
      store.dispatch(loadContentVariants(variants))
    } catch (err) {
      logger.error({message: 'error parsing variants cookie value', errors: [err]})
    }
  }
}

export default processCookies
