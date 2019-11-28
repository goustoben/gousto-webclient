import logger from 'utils/logger'
import { fetchRecipes, fetchRecipesStockByDate } from 'apis/recipes'
import { getCutoffDateTime, cutoffDateTimeNow } from 'utils/deliveries'
import statusActions from './status'
import actionTypes from './actionTypes'

const recipesLoadRecipesById = (recipeIds = [], isCookbook) => (
  async (dispatch, getState) => {
    const actionType = isCookbook ? actionTypes.COOKBOOK_RECIPES_RECEIVE : actionTypes.RECIPES_RECEIVE
    const newRecipeIds = recipeIds.filter(recipeId => !getState().recipes.has(recipeId)).sort()
    const recipeCount = newRecipeIds.length

    if (recipeCount) {
      dispatch(statusActions.pending(actionType, true))
      try {
        const params = {
          includes: ['ingredients', 'allergens', 'taxonomy'],
          'filters[recipe_ids]': isCookbook ? recipeIds : newRecipeIds,
        }
        const accessToken = getState().auth.get('accessToken')
        const { data: recipes } = await fetchRecipes(accessToken, '', params)

        dispatch({ type: actionType, recipes })
      } catch (err) {
        dispatch(statusActions.error(actionType, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionType, false))
      }
    }
  }
)

const recipesLoadStockByDate = (whenStart, whenCutoff) => (
  async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, true))
    try {
      let reqData = {
        'filters[date_start]': whenStart,
        'filters[date_until]': whenCutoff,
      }
      const { meta, data: firstStockPage } = await fetchRecipesStockByDate(reqData)
      const pageSize = meta.limit
      const callsCount = Math.ceil(meta.total / pageSize)
      const fetches = []
      for (let i = 1; i < callsCount; i++) {
        reqData = {
          'filters[date_start]': whenStart,
          'filters[date_until]': whenCutoff,
          limit: pageSize,
          offset: i * pageSize,
        }
        fetches.push(fetchRecipesStockByDate(reqData))
      }
      let stockPages = await Promise.all(fetches)
      stockPages = stockPages.map(stockPage => stockPage.data)
      const stock = [].concat.apply(firstStockPage, stockPages)
      dispatch({ type: actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, stock })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, err.message))
      logger.error(err)
    } finally {
      dispatch(statusActions.pending(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, false))
    }
  }
)

const recipesActions = {
  recipesLoadRecipesById,
  recipesLoadStockByDate,
}

export const loadRecipes = () => async (dispatch, getState) => {
  dispatch(statusActions.pending(actionTypes.RECIPES_RECEIVE, true))
  try {
    const accessToken = getState().auth.get('accessToken')
    const cutoffDate = getCutoffDateTime(getState())

    const args = cutoffDate ? { 'filters[available_on]': cutoffDate } : cutoffDateTimeNow()

    const { data: recipes } = await fetchRecipes(accessToken, '', args)

    dispatch({ type: actionTypes.RECIPES_RECEIVE, recipes })
  } catch (err) {
    dispatch(statusActions.error(actionTypes.RECIPES_RECEIVE, err.message))
    logger.error(err)
  } finally {
    dispatch(statusActions.pending(actionTypes.RECIPES_RECEIVE, false))
  }
}

export default recipesActions
