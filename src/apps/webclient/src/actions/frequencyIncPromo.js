import * as streakPromoApi from 'apis/streakPromo'
import moment from 'moment'
import logger from 'utils/logger'
import { set } from 'utils/cookieHelper2'
import Cookies from 'utils/GoustoCookies'
import { canUseWindow } from 'utils/browserEnvironment'
import { actionTypes } from './actionTypes'

const loadFrequencyIncProgress = frequencyProgress => ({
  type: actionTypes.LOAD_FREQUENCY_INC_PROMO_PROGRESS,
  frequencyProgress
})

export const getFrequencyIncPromoProgress = () => async (dispatch, getState) => {
  try {
    //const accessToken = getState().auth.get('accessToken')
    //const { data } = await streakPromoApi.getFrequencyIncProgress(accessToken)

    const data = {
      progress: 5,
      target: 8,
      endOfSecondMonth: '2022-07-12',
      endOfThirdMonth: '2022-08-11',
      promotionAmount: '5%'
    }

    //const data = {};

    if (data && data.endOfThirdMonth && moment(data.endOfThirdMonth).add(1, 'day') > moment()) {
      dispatch(loadFrequencyIncProgress(data))
    }
  } catch (err) {
    logger.error({ message: 'Failed to user frequency incentivisation progress', errors: [err] })
  }
}

export const frequencyIncPromoModalViewed = () => async (dispatch, getState) => {
  if (canUseWindow()) {
    set(Cookies, 'frequency_inc_promo_modal_viewed', true, 1)
  }

  dispatch({
    type: actionTypes.FREQUENCY_INC_PROMO_MODAL_IS_VIEWED
  })
}
