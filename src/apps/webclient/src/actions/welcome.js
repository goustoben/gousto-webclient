import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import userActions from 'actions/user'
import { productsLoadCategories, productsLoadProducts, productsLoadProductsById, productsLoadStock } from 'actions/products'
import { contentLoadContentByPageSlug } from 'actions/content'
import recipeActions from 'actions/recipes'
import { basketOrderLoad } from 'actions/basket'
import { redirect } from 'actions/redirect'
import { getUserOrderById, getUserOrderGiftProductIds, getUserOrderProductIds, getUserOrderRecipeIds, } from 'utils/user'

export const trackWelcomeAppPromoClick = () => (
  (dispatch) => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'AppPromoSection Clicked'
      }
    })
  }
)

export const fetchData = ({ params, query }) => (
  async (dispatch, getState) => {
    const { orderId } = params
    let userOrder

    return dispatch(userActions.userLoadOrder(orderId))
      .then(() => {
        userOrder = getUserOrderById(
          orderId,
          getState().user.get('orders')
        )

        if (userOrder.get('phase') !== 'open') {
          return Promise.reject(
            new Error({
              level: 'warning',
              message: `Can't view welcome page with non open order ${orderId}`
            })
          )
        }

        const orderRecipeIds = getUserOrderRecipeIds(userOrder)

        return Promise.all([
          dispatch(
            contentLoadContentByPageSlug('welcome_immediate', query.var)
          ),
          dispatch(
            productsLoadProducts(userOrder.get('whenCutoff'))
          ),
          dispatch(productsLoadStock()),
          dispatch(productsLoadCategories()),
          dispatch(recipeActions.recipesLoadRecipesById(orderRecipeIds))
        ])
      })
      .then(() => {
        const orderProductIds = [
          ...getUserOrderProductIds(userOrder),
          ...getUserOrderGiftProductIds(userOrder)
        ]

        return dispatch(productsLoadProductsById(orderProductIds))
      })
      .then(() => {
        dispatch(basketOrderLoad(orderId))
      })
      .catch(err => {
        if (err && err.level && typeof logger[err.level] === 'function') {
          logger[err.level](err.message)
        } else {
          logger.error(err)
        }
        dispatch(redirect('/'))
      })
  }
)
