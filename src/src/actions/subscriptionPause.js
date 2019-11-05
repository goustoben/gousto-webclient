import customersApi from 'apis/customers'
import subscriptionApi from 'apis/subscription'
import ordersApi from 'apis/orders'
import config from 'config/subscription'
import logger from 'utils/logger'
import redirectActions from 'actions/redirect'
import userActions from 'actions/user'
import * as subUtils from 'utils/subscription'
import GoustoException from 'utils/GoustoException'
import windowUtil from 'utils/window'
import routesConfig from 'config/routes'
import Immutable from 'immutable'
import { getPauseRecoveryContent } from 'actions/onScreenRecovery'
import { isSubscriptionPauseOsrFeatureEnabled, isOsrOfferFeatureEnabled } from 'selectors/features'
import statusActions from './status'
import actionTypes from './actionTypes'

const pauseModalTrackingPrefix = config.tracking.pauseModalPrefix

function getModalType(getState) {
  const state = getState()
  if (state.subscriptionPause.get('chosenReasonIds').size === 0) {
    return 'categories'
  }
  const activeStepId = state.subscriptionPause.get('activeStepId')
  if (!activeStepId) {
    return 'reasons'
  }
  const activeSteps = state.subscriptionPause.get('activeSteps')

  return activeSteps.getIn([activeStepId, 'type'])
}

const subPauseActions = {
  subscriptionLoadData,
  subscriptionTrackPauseAttempt,
  subscriptionTrackCategoriesViewed,
  subscriptionDeactivate,
  subscriptionPauseApplyPromo,
  subscriptionPauseCancelPendingOrders,
  subscriptionPauseFetchReasons,
  subscriptionPauseGoBack,
  subscriptionPauseLoadError,
  subscriptionPauseLoadReasonChoice,
  subscriptionPauseLoadReasons,
  subscriptionPauseLoadStaticScreen,
  subscriptionPauseLoadStep,
  subscriptionPauseProceed,
  subscriptionPauseReasonChoice,
  subscriptionPauseReasonSubmit,
  subscriptionPauseReasonsReceive,
  subscriptionPauseReasonsRefreshRequired,
  subscriptionPauseRedirect,
  subscriptionPauseReset,
  subscriptionPauseSkipNextBox,
  subscriptionPauseEnd,
  subscriptionPauseStart,
  subscriptionPauseTrack,
  subscriptionPauseOSRTrack,
  subscriptionPauseVisibilityChange,
  subscriptionPauseLoadStartScreen,
  subscriptionPauseLoadInitReasons,
}

function subscriptionLoadData() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const { data = {} } = await subscriptionApi.fetchSubscription(accessToken)

    dispatch({
      type: actionTypes.SUBSCRIPTION_LOAD_DATA,
      data,
    })
  }
}

function subscriptionTrackPauseAttempt(metaData) {
  return subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_PAUSE_ATTEMPT, { metaData })
}

function subscriptionTrackCategoriesViewed() {
  return subscriptionPauseOSRTrack(actionTypes.PS_REASON_CATEGORY_MODAL_VIEWED)
}

function subscriptionPauseLoadStaticScreen(screenType) {
  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STATIC_SCREEN,
    screenType,
  }
}

function subscriptionPauseLoadReasons(reasons) {
  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_REASONS,
    reasons,
  }
}

function subscriptionPauseLoadReasonChoice(chosenReasonIds) {
  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE,
    chosenReasonIds,
  }
}

function subscriptionPauseLoadStep(activeStepId) {
  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_REASON_LOAD_STEP,
    activeStepId,
  }
}

function subscriptionPauseReasonsReceive(reasons, metaData) {
  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_RECEIVE,
    reasons,
    metaData,
  }
}

function subscriptionPauseReasonsRefreshRequired(required) {
  const refreshRequired = required || false

  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_REASONS_REFRESH_REQUIRED,
    refreshRequired,
  }
}

function subscriptionPauseReset() {
  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_REASON_RESET,
  }
}

function subscriptionPauseTrack(key, data = {}) {
  return {
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: `${pauseModalTrackingPrefix}${key}`,
      ...data,
    },
  }
}

function subscriptionPauseOSRTrack(key, data = {}) {
  return {
    type: key,
    ...data,
  }
}

function subscriptionPauseVisibilityChange(visible) {
  return {
    type: actionTypes.SUBSCRIPTION_PAUSE_VISIBILITY_CHANGE,
    visible,
  }
}

function subscriptionPauseProceed(stepType = 'next', staticScreenFallback = 'error', seRecoveryType, promoCode) {
  return (dispatch, getState) => {
    const state = getState()
    const activeStepId = state.subscriptionPause.get('activeStepId')
    const activeSteps = state.subscriptionPause.get('activeSteps')
    let nextStepId

    if (stepType === 'cancel' || stepType === 'next') {
      const chosenReasonIds = state.subscriptionPause.get('chosenReasonIds')
      let categorySlug
      let reasonSlug
      if (chosenReasonIds.size > 0) {
        const categoryId = chosenReasonIds.first()
        categorySlug = state.subscriptionPause.get('reasons').filter(reason => reason.get('id') === categoryId).first()
          .get('slug')
      }
      if (chosenReasonIds.size > 1) {
        const reasonId = chosenReasonIds.last()
        const activeReasons = state.subscriptionPause.get('activeReasons')
        reasonSlug = activeReasons.getIn([reasonId, 'slug'])
      }
      let modalType = activeSteps.getIn([activeStepId, 'type'])
      modalType = modalType || getModalType(getState)
      dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE, {
        promoCode,
        categorySlug,
        reasonSlug,
        modalType,
        seRecoveryType,
      }))
    }

    if (stepType === 'initial' || !activeStepId) {
      const firstStep = activeSteps.find(step => step.get('initial', false), undefined, activeSteps.first())
      nextStepId = firstStep ? firstStep.get('id') : undefined
    } else {
      nextStepId = activeSteps.getIn([activeStepId, `${stepType}StepId`])
    }

    if (nextStepId) {
      const nextModalType = activeSteps.getIn([nextStepId, 'type'])
      if (stepType === 'initial' && nextModalType !== 'other') {
        dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_RECOVERY_ATTEMPT_MODAL_VIEWED, { modalType: nextModalType }))
      }
      if (['recovered', 'recoveredPromo', 'recoveredSkipped', 'paused'].indexOf(nextModalType) > -1) {
        dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_END_MODAL_VIEWED))
      }
      dispatch(subPauseActions.subscriptionPauseLoadStep(nextStepId))
    } else {
      dispatch(subPauseActions.subscriptionPauseLoadStaticScreen(staticScreenFallback))
    }
  }
}

function subscriptionPauseCancelPendingOrders() {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, true))
    dispatch(statusActions.error(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false))
    const errorPrefix = 'Subscription pause cancel pending order error:'

    try {
      const accessToken = getState().auth.get('accessToken')

      try {
        await ordersApi.cancelExistingOrders(accessToken)
        await dispatch(userActions.userLoadOrders())
      } catch (err) {
        throw new GoustoException(`${errorPrefix} cancel pending orders failed, ${err}`, {
          error: 'cancel-pending-fail',
        })
      }

      dispatch(subPauseActions.subscriptionPauseTrack('EXISTING_ORDERS_CANCELLED'))
      dispatch(subPauseActions.subscriptionPauseProceed('pause', 'paused'))
    } catch (err) {
      dispatch(subPauseActions.subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS))
    } finally {
      dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_CANCEL_ORDERS, false))
    }
  }
}

function subscriptionPauseApplyPromo(promo) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, true))
    dispatch(statusActions.error(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false))

    const errorPrefix = 'Subscription pause promo error:'

    try {
      const state = getState()
      let activeSteps
      let activeStep
      let promoCode

      try {
        const activeStepId = state.subscriptionPause.get('activeStepId')
        activeSteps = state.subscriptionPause.get('activeSteps')
        activeStep = activeSteps.get(activeStepId)
        promoCode = !promo && activeStep ? activeStep.getIn(['context', 'promocode']) : promo
      } catch (err) {
        throw new GoustoException(`${errorPrefix} data not available`, {
          error: 'data-unavailable',
        })
      }

      if (!promoCode) {
        throw new GoustoException(`${errorPrefix} promo code cannot be determined`, {
          error: 'no-promo-code-found',
        })
      }

      await dispatch(userActions.userPromoApplyCode(promoCode))

      dispatch(subPauseActions.subscriptionPauseProceed('next', 'recovered', 'promo', promoCode))
    } catch (err) {
      dispatch(subPauseActions.subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY))
    } finally {
      dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_PROMO_APPLY, false))
    }
  }
}

function subscriptionDeactivate(reason) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_DEACTIVATE, true))
    dispatch(statusActions.error(actionTypes.SUBSCRIPTION_DEACTIVATE, false))
    const accessToken = getState().auth.get('accessToken')
    const data = reason ? { state_reason: reason } : {}

    try {
      await subscriptionApi.deactivateSubscription(accessToken, data)
    } catch (err) {
      dispatch(statusActions.error(actionTypes.SUBSCRIPTION_DEACTIVATE, 'deactivate-fail'))
    } finally {
      dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_DEACTIVATE, false))
    }
  }
}

function subscriptionPauseFetchReasons() {
  return async (dispatch, getState) => {
    const errorPrefix = 'Subscripton pause fetch error:'
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_FETCH, true))
    dispatch(statusActions.error(actionTypes.SUBSCRIPTION_PAUSE_FETCH, false))
    try {
      if (!getState().user.get('id')) {
        await dispatch(userActions.userLoadData())
      }
      const userId = getState().user.get('id')
      const accessToken = getState().auth.get('accessToken')
      let reasons
      let metaData

      try {
        const { data, meta } = await customersApi.fetchPauseReasons(accessToken, userId)
        reasons = data
        metaData = meta.filters
      } catch (err) {
        throw new GoustoException(`${errorPrefix} fetch failed, ${err}`, {
          error: 'fetch-failed',
        })
      }

      if (!reasons.length) {
        throw new GoustoException(`${errorPrefix} no pause reasons available`, {
          error: 'no-pause-reasons',
          level: 'warning',
        })
      }

      dispatch(subPauseActions.subscriptionPauseReasonsReceive(reasons, metaData))
    } catch (err) {
      dispatch(subPauseActions.subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_FETCH))
    } finally {
      dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_FETCH, false))
    }
  }
}

function subscriptionPauseGoBack() {
  return (dispatch, getState) => {
    const errorPrefix = 'Subscription pause go back error:'

    try {
      dispatch(subPauseActions.subscriptionPauseTrack('BACK'))

      const state = getState()
      const staticScreenId = state.subscriptionPause.get('staticScreenId')

      if (staticScreenId) {
        dispatch(subPauseActions.subscriptionPauseLoadStaticScreen(undefined))
      } else {
        const activeStepId = state.subscriptionPause.get('activeStepId')
        let onInitialStep

        if (activeStepId) {
          const activeSteps = state.subscriptionPause.get('activeSteps')
          const activeStep = subUtils.getActivePauseStep(activeSteps, activeStepId)
          onInitialStep = activeStep.get('initial') || activeSteps.size === 1

          // load previous step
          if (!onInitialStep) {
            if (activeStep.get('previousStepId')) {
              dispatch(subPauseActions.subscriptionPauseProceed('previous'))
            } else {
              throw new GoustoException(`${errorPrefix} can't find previous step to go back to`, {
                error: 'no-prev-step',
              })
            }
          }
        }

        // load previous reasons
        if (onInitialStep || !activeStepId) {
          const prevChosenReasonIds = state.subscriptionPause.get('chosenReasonIds').pop()
          const reasons = state.subscriptionPause.get('reasons')
          const prevReasons = subUtils.getReasonsFromStore(reasons, prevChosenReasonIds)

          if (prevReasons.size) {
            dispatch(subPauseActions.subscriptionPauseLoadReasons(prevReasons))
            dispatch(subscriptionTrackCategoriesViewed())
            dispatch(subPauseActions.subscriptionPauseLoadReasonChoice(prevChosenReasonIds))
          } else {
            throw new GoustoException(`${errorPrefix} can't find reasons to go back to`, {
              error: 'no-prev-reasons',
            })
          }
        }
      }
    } catch (err) {
      dispatch(subPauseActions.subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_REASON_GO_BACK))
    }
  }
}

function subscriptionPauseLoadError(err = '', actionType = actionTypes.SUBSCRIPTION_PAUSE_ERROR) {
  return dispatch => {
    const message = err.message || err
    const error = err.error || message
    const logLevel = err.level || 'error'

    logger[logLevel](message)

    if (actionType) {
      dispatch(statusActions.error(actionType, error))
    }

    dispatch(subPauseActions.subscriptionPauseTrack('ERROR', { error: message }))
    dispatch(subPauseActions.subscriptionPauseLoadStaticScreen('error'))
  }
}

function subscriptionPauseRedirect(location) {
  return async (dispatch, getState) => {
    if (location) {
      if (location === routesConfig.client.myDeliveries || location === routesConfig.client.help) {
        const state = getState().subscriptionPause
        const categoryId = state.get('chosenReasonIds').first()
        const categorySlug = state.get('reasons').filter(reason => reason.get('id') === categoryId).first()
          .get('slug')
        const reasonId = state.get('chosenReasonIds').last()
        const activeReasons = state.get('activeReasons')
        const reasonSlug = activeReasons.getIn([reasonId, 'slug'])
        let seRecoveryType
        if (location === routesConfig.client.myDeliveries) {
          seRecoveryType = 'change_delivery_day'
        }
        if (location === routesConfig.client.help) {
          seRecoveryType = 'contact_cc'
        }

        dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE, {
          categorySlug,
          reasonSlug,
          seRecoveryType,
          seModal: 'RecoveryAttemptModal',
        }))
      }
      dispatch(subPauseActions.subscriptionPauseVisibilityChange(false))
      setTimeout(() => dispatch(redirectActions.redirect(location)), 300)
    } else {
      logger.warning('subscriptionPause: no location provided for redirect')
    }
  }
}

function subscriptionPauseReasonSubmit(freeText) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, true))
    dispatch(statusActions.error(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, false))
    const errorPrefix = 'Unable to submit reason:'
    let chosenReasonId
    let chosenReasonSlug

    try {
      const chosenReasonIds = getState().subscriptionPause.get('chosenReasonIds')

      if (!chosenReasonIds.size) {
        throw new GoustoException(`${errorPrefix} reason id not available`, {
          error: 'data-unavailable',
        })
      }

      try {
        chosenReasonId = chosenReasonIds.last()
        chosenReasonSlug = getState().subscriptionPause.getIn(['activeReasons', chosenReasonId, 'slug'])

        if (!chosenReasonSlug) {
          throw new GoustoException()
        }
      } catch (err) {
        throw new GoustoException(`${errorPrefix} data not available`, {
          error: 'data-unavailable',
        })
      }

      const reason = freeText || chosenReasonSlug
      await dispatch(subPauseActions.subscriptionDeactivate(reason))

      const subscriptionDeactivateError = getState().error.get(actionTypes.SUBSCRIPTION_DEACTIVATE)

      if (subscriptionDeactivateError) {
        throw new GoustoException(`${errorPrefix} ${subscriptionDeactivateError}`, {
          error: 'deactivate-fail',
        })
      }

      const modalType = getModalType(getState)
      dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_PAUSED, { reason, modalType }))

      const orderState = getState().user.get('orders')
      const pendingOrderIds = orderState.filter(o => o.get('phase') === 'open')
      const firstBox = pendingOrderIds.find(o => parseInt(o.get('number'), 10) === 1)
      const committedOrderIds = orderState.filter(o => ['cutoff', 'delivery', 'packing', 'picking'].indexOf(o.get('phase')) >= 0)

      if ((firstBox && pendingOrderIds.size === 1) || !(pendingOrderIds.size || committedOrderIds.size)) {
        dispatch(subPauseActions.subscriptionPauseProceed('pause', 'paused'))
      } else {
        dispatch(subPauseActions.subscriptionPauseLoadStaticScreen('pausedPendingBoxes'))
      }

      const windowObj = windowUtil.getWindow()
      if (windowObj && windowObj.toggleSubscriptionPage) {
        windowObj.toggleSubscriptionPage()
      }
    } catch (err) {
      dispatch(subPauseActions.subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT))
    } finally {
      dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_SUBMIT, false))
    }
  }
}

function subscriptionPauseReasonChoice(chosenReasonId) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, true))
    dispatch(statusActions.error(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false))
    const errorPrefix = 'Unable to choose reason:'
    let chosenReason
    let chosenReasonSlug

    try {
      if (!chosenReasonId) {
        throw new GoustoException(`${errorPrefix} reason id not provided`, {
          error: 'no-reason-found',
        })
      }

      let chosenReasonIds
      let chosenReasonSubReasons
      let activeReasons
      let type

      try {
        chosenReasonIds = getState().subscriptionPause.get('chosenReasonIds').push(chosenReasonId)
        activeReasons = getState().subscriptionPause.get('activeReasons')
        chosenReason = activeReasons.get(chosenReasonId)
        chosenReasonSlug = chosenReason.get('slug')
        chosenReasonSubReasons = chosenReason.get('children')
        type = chosenReasonSubReasons && chosenReasonSubReasons.size ? 'category' : 'reason'
      } catch (err) {
        throw new GoustoException(`${errorPrefix} data not available`, {
          error: 'data-unavailable',
        })
      }

      dispatch(subPauseActions.subscriptionPauseLoadReasonChoice(chosenReasonIds, { type, chosenReasonSlug }))

      if (type === 'category') {
        dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_REASON_CATEGORY_SELECTED, {
          selectedCategory: chosenReasonSlug,
        }))
        dispatch(subPauseActions.subscriptionPauseLoadReasons(chosenReasonSubReasons))
        dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_REASON_LIST_MODAL_VIEWED, {
          selectedCategory: chosenReasonSlug,
        }))
      } else {
        dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_REASON_SELECTED, {
          selectedReason: chosenReasonSlug,
        }))
        const chosenReasonSteps = getState().subscriptionPause.get('activeSteps')

        if (!chosenReasonSteps || !chosenReasonSteps.size) {
          throw new GoustoException(`${errorPrefix} no steps found for "${chosenReasonSlug}"`)
        }

        if (chosenReasonSteps.some(step => step.get('initial', false))) {
          // if there's an initial step, there is recovery
          const recoveryFeature = getState().features.get('recovery')
          if (recoveryFeature && recoveryFeature.get('experiment')) {
            dispatch(subPauseActions.subscriptionPauseTrack('IN_RECOVERY_EXPERIMENT', {
              experiment: recoveryFeature.get('value'),
            }))
          }
          dispatch(subPauseActions.subscriptionPauseProceed('initial'))
        } else {
          // if there's no initial step, there is no recovery
          await dispatch(subPauseActions.subscriptionPauseReasonSubmit())
        }
      }
    } catch (err) {
      dispatch(subPauseActions.subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE))
    } finally {
      dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_REASON_CHOICE, false))
    }
  }
}

function subscriptionPauseSkipNextBox() {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, true))
    dispatch(statusActions.error(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false))
    const errorPrefix = 'Subscription pause skip next box error:'

    try {
      await dispatch(userActions.userOrderCancelNext())
      const orderCancelError = getState().error.get(actionTypes.USER_ORDER_CANCEL_NEXT)

      if (orderCancelError) {
        if (orderCancelError === 'no-orders-found') {
          await dispatch(userActions.userOrderSkipNextProjected())
          const orderSkipError = getState().error.get(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED)

          if (orderSkipError) {
            if (orderSkipError === 'no-orders-found') {
              throw new GoustoException(`${errorPrefix} no orders found to cancel or skip`, {
                error: 'no-orders-found',
                level: 'warning',
              })
            } else {
              throw new GoustoException(`${errorPrefix} failed to skip next box, ${orderSkipError}`, {
                error: 'failed-skip',
              })
            }
          }
        } else {
          throw new GoustoException(`${errorPrefix} failed to cancel next box, ${orderCancelError}`, {
            error: 'failed-cancel',
          })
        }
      }

      dispatch(subPauseActions.subscriptionPauseProceed('next', 'recovered', 'quoteSkipNext'))
    } catch (err) {
      dispatch(subPauseActions.subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX))
    } finally {
      dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_SKIP_BOX, false))
    }
  }
}

function subscriptionPauseEnd() {
  return (dispatch, getState) => {
    dispatch(subPauseActions.subscriptionPauseVisibilityChange(false))
    dispatch(subPauseActions.subscriptionPauseReasonsRefreshRequired(true))
    const subscriptionStatus = getState().user.getIn(['subscription', 'state'])
    if (subscriptionStatus === 'active') {
      let categorySlug
      let reasonSlug
      const state = getState().subscriptionPause
      const chosenReasonIds = state.get('chosenReasonIds')
      if (chosenReasonIds.size > 0) {
        const categoryId = chosenReasonIds.get(0)
        categorySlug = state.get('reasons').filter(reason => reason.get('id') === categoryId)
        categorySlug = categorySlug && categorySlug.size > 0 ? categorySlug.first().get('slug') : undefined
      }
      if (chosenReasonIds.size > 1) {
        const reasonId = chosenReasonIds.last()
        reasonSlug = state.get('activeReasons').getIn([reasonId, 'slug'])
      }
      dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_SUBSCRIPTION_KEPT_ACTIVE, {
        categorySlug,
        reasonSlug,
        modalType: getModalType(getState),
        seRecoveryType: 'close_modal',
      }))
    }
  }
}

function subscriptionPauseLoadStartScreen() {
  return (dispatch, getState) => {
    dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_START_MODAL_VIEWED))
    const startScreen = getState().subscriptionPause.get('startScreen')
    const chosenReasonId = Immutable.List([startScreen.last().get('id')])
    const loadStepId = startScreen.last().get('steps').first()
    dispatch(subPauseActions.subscriptionPauseLoadReasons(startScreen))
    dispatch(subPauseActions.subscriptionPauseLoadReasonChoice(chosenReasonId))
    dispatch(subPauseActions.subscriptionPauseLoadStep(loadStepId.get('id')))
  }
}

function subscriptionPauseLoadInitReasons() {
  return (dispatch, getState) => {
    dispatch(subPauseActions.subscriptionPauseReset())
    const reasons = getState().subscriptionPause.get('reasons')
    dispatch(subPauseActions.subscriptionPauseLoadReasons(reasons))
    dispatch(subPauseActions.subscriptionPauseOSRTrack(actionTypes.PS_REASON_LIST_MODAL_VIEWED))
  }
}

function subscriptionPauseStart() {
  return async (dispatch, getState) => {
    const subscriptionPauseOsrFeatureValue = isSubscriptionPauseOsrFeatureEnabled(getState())
    const osrOfferFeatureValue = isOsrOfferFeatureEnabled(getState())
    if (subscriptionPauseOsrFeatureValue) {
      return getPauseRecoveryContent(osrOfferFeatureValue)(dispatch, getState)
    }
    
    await dispatch(userActions.userLoadData())
    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_START, true))
    dispatch(subPauseActions.subscriptionPauseReset())
    dispatch(subPauseActions.subscriptionPauseVisibilityChange(true))

    if (getState().subscriptionPause.get('refreshRequired')) {
      await dispatch(subPauseActions.subscriptionPauseFetchReasons())

      if (!getState().error.get(actionTypes.SUBSCRIPTION_PAUSE_FETCH)) {
        dispatch(subPauseActions.subscriptionPauseReasonsRefreshRequired(false))
      }
    }

    const metaData = getState().subscriptionPause.get('metaData')
    if (getState().subscriptionPause.get('startScreen').size > 0) {
      dispatch(subPauseActions.subscriptionPauseLoadStartScreen())
      dispatch(subscriptionTrackPauseAttempt(metaData))
    } else {
      const initialReasons = getState().subscriptionPause.get('reasons')
      if (initialReasons.size) {
        dispatch(subPauseActions.subscriptionPauseLoadReasons(initialReasons))
        dispatch(subscriptionTrackPauseAttempt(metaData))
        dispatch(subscriptionTrackCategoriesViewed())
      }
    }

    dispatch(statusActions.pending(actionTypes.SUBSCRIPTION_PAUSE_START, false))
  }
}

export default subPauseActions
