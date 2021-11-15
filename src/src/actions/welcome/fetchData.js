import { userLoadOrder } from "actions/user/userLoadOrder"
import userUtils from "utils/user"
import { contentLoadContentByPageSlug } from "actions/content/contentLoadContentByPageSlug"
import { productsLoadProducts } from "actions/products/productsLoadProducts"
import { productsLoadStock } from "actions/products/productsLoadStock"
import { productsLoadCategories } from "actions/products/productsLoadCategories"
import { productsLoadProductsById } from "actions/products/productsLoadProductsById"
import { basketOrderLoad } from "actions/basket/basketOrderLoaded"
import logger from "utils/logger"
import { redirect } from "actions/redirect/redirect"

export const fetchData = ({params, query}) => (
    async (dispatch, getState) => {
        const {orderId} = params
        let userOrder

        return dispatch(userLoadOrder(orderId))
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
                        productsLoadProducts(userOrder.get('whenCutoff'))
                    ),
                    dispatch(productsLoadStock()),
                    dispatch(productsLoadCategories()),
                    dispatch(recipesLoadRecipesById(orderRecipeIds))
                ])
            })
            .then(() => {
                const orderProductIds = [
                    ...userUtils.getUserOrderProductIds(userOrder),
                    ...userUtils.getUserOrderGiftProductIds(userOrder)
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
