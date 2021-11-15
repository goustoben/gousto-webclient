import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { cutoffDateTimeNow, getCutoffDateTime } from "utils/deliveries"
import logger from "utils/logger"
import { fetchRecipes } from "apis/recipes/fetchRecipes"

export const loadRecipes = () => async (dispatch, getState) => {
  dispatch(pending(actionTypes.RECIPES_RECEIVE, true))
  try {
    const accessToken = getState().auth.get('accessToken')
    const cutoffDate = getCutoffDateTime(getState())

    const args = cutoffDate ? {'filters[available_on]': cutoffDate} : cutoffDateTimeNow()

    const {data: recipes} = await fetchRecipes(accessToken, '', args)

    dispatch({type: actionTypes.RECIPES_RECEIVE, recipes})
  } catch (err) {
    dispatch(error(actionTypes.RECIPES_RECEIVE, err.message))
    logger.error(err)
  } finally {
    dispatch(pending(actionTypes.RECIPES_RECEIVE, false))
  }
}
