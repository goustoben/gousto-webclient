import actionTypes from './actionTypes'
import statusActions from './status'
import logger from 'utils/logger'
import { featureSet } from 'actions/features'
import { fetchRecipes, fetchRecipesStockByDate, fetchRecommendations } from 'apis/recipes'

const recipesLoadRecipesById = (recipeIds = []) => (
  async (dispatch, getState) => {
    const newRecipeIds = recipeIds.filter(recipeId => !getState().recipes.has(recipeId)).sort()
    const recipeCount = newRecipeIds.length

    if (recipeCount) {
      dispatch(statusActions.pending(actionTypes.RECIPES_RECEIVE, true))
      try {
        const params = {
          'includes[]': ['ingredients', 'allergens'],
          'filters[recipe_ids]': newRecipeIds,
        }
        const accessToken = getState().auth.get('accessToken')
        const { data: recipes } = await fetchRecipes(accessToken, '', params)

        dispatch({ type: actionTypes.RECIPES_RECEIVE, recipes })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.RECIPES_RECEIVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.RECIPES_RECEIVE, false))
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

export const loadRecommendations = () => (
  async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')

    try {
      let recommendations = false
      const { data = {} } = await fetchRecommendations(accessToken)

      if (data[0] && data[0].properties && data[0].properties['just-for-you']) {
        recommendations = data[0].properties['just-for-you']
      }

      dispatch(featureSet('justforyou', recommendations, true))
    } catch (err) {
      logger.error({message: 'Error loading recommendation data for user', errors: [err]})
    }
  }
)

export default {
  recipesLoadRecipesById,
  recipesLoadStockByDate,
}
