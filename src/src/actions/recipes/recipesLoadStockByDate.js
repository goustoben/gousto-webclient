import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchRecipesStockByDate } from "apis/recipes/fetchRecipesStockByDate"

export const recipesLoadStockByDate = (whenStart, whenCutoff) => (
  async (dispatch) => {
    dispatch(pending(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, true))
    try {
      let reqData = {
        'filters[date_start]': whenStart,
        'filters[date_until]': whenCutoff,
      }
      const {meta, data: firstStockPage} = await fetchRecipesStockByDate(reqData)
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
      dispatch({type: actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, stock})
    } catch (err) {
      dispatch(error(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, err.message))
      logger.error(err)
    } finally {
      dispatch(pending(actionTypes.RECIPES_PERIOD_STOCK_RECEIVE, false))
    }
  }
)
