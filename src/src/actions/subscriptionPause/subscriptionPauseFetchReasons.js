import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { error } from "actions/status/error"
import GoustoException from "utils/GoustoException"
import { subscriptionPauseReasonsReceive } from "actions/subscriptionPause/subscriptionPauseReasonsReceive"
import { subscriptionPauseLoadError } from "actions/subscriptionPause/subscriptionPauseLoadError"
import { userLoadData } from "actions/user/userLoadData"
import { fetchPauseReasons } from "apis/customers/fetchPauseReasons"

export function subscriptionPauseFetchReasons() {
  return async (dispatch, getState) => {
    const errorPrefix = 'Subscripton pause fetch error:'
    dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_FETCH, true))
    dispatch(error(actionTypes.SUBSCRIPTION_PAUSE_FETCH, false))
    try {
      if (!getState().user.get('id')) {
        await dispatch(userLoadData())
      }
      const userId = getState().user.get('id')
      const accessToken = getState().auth.get('accessToken')
      let reasons
      let metaData

      try {
        const {data, meta} = await fetchPauseReasons(accessToken, userId)
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

      dispatch(subscriptionPauseReasonsReceive(reasons, metaData))
    } catch (err) {
      dispatch(subscriptionPauseLoadError(err, actionTypes.SUBSCRIPTION_PAUSE_FETCH))
    } finally {
      dispatch(pending(actionTypes.SUBSCRIPTION_PAUSE_FETCH, false))
    }
  }
}
