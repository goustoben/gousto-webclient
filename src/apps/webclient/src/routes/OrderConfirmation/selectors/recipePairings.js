import Immutable from 'immutable'
import { createSelector } from 'reselect'
import { getProductsStock } from './products'

export const getProductsRecipePairings = ({ productRecipePairings }) => productRecipePairings

export const getProductRecipePairingsTotalProducts = ({ productRecipePairingsTotalProducts }) => productRecipePairingsTotalProducts

export const getProductsRecipePairingsWithStock = createSelector(
  [getProductsRecipePairings, getProductsStock],
  (pairings, productStock) => {
    if (pairings.size <= 0 || productStock <= 0) {
      return Immutable.Map({})
    }

    const pairingsWithStock = pairings.map((pairing) => {
      const products = pairing.get('products')
      const productsWithStock = products.map((product) => product.set('stock', productStock.get(product.get('id'), 0)))

      return pairing.set('products', productsWithStock)
    })

    return pairingsWithStock
  }
)
