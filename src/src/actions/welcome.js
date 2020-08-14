import { actionTypes } from 'actions/actionTypes'
import logger from 'utils/logger'
import userActions from 'actions/user'
import productsActions from 'actions/products'
import { contentLoadContentByPageSlug } from 'actions/content'
import recipesActions from 'actions/recipes'
import basketActions from 'actions/basket'
import { redirect } from 'actions/redirect'
import userUtils from 'utils/user'

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
        userOrder = userUtils.getUserOrderById(
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

        const orderRecipeIds = userUtils.getUserOrderRecipeIds(userOrder)

        return Promise.all([
          dispatch(
            contentLoadContentByPageSlug('welcome_immediate', query.var)
          ),
          dispatch(
            productsActions.productsLoadProducts(userOrder.get('whenCutoff'))
          ),
          dispatch(productsActions.productsLoadStock()),
          dispatch(productsActions.productsLoadCategories()),
          dispatch(recipesActions.recipesLoadRecipesById(orderRecipeIds))
        ])
      })
      .then(() => {
        const orderProductIds = [
          ...userUtils.getUserOrderProductIds(userOrder),
          ...userUtils.getUserOrderGiftProductIds(userOrder)
        ]

        return dispatch(productsActions.productsLoadProductsById(orderProductIds))
      })
      .then(() => {
        dispatch(basketActions.basketOrderLoad(orderId))
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
