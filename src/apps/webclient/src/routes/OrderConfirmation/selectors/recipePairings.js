import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { getOrderRecipeItems } from './orderDetails'
import { getProductsStock } from './products'

export const getProductsRecipePairings = ({ productRecipePairings }) => productRecipePairings

export const getProductRecipePairingsTotalProducts = ({ productRecipePairingsTotalProducts }) =>
  productRecipePairingsTotalProducts

export const getProductsRecipePairingsWithStock = createSelector(
  [getProductsRecipePairings, getProductsStock],
  (pairings, productStock) => {
    if (pairings.size <= 0) {
      return Immutable.Map({})
    }

    const pairingsWithStock = pairings.map((pairing) => {
      const products = pairing.get('products')
      const productsWithStock = products.map((product) =>
        product.set('stock', productStock.get(product.get('id'), 0)),
      )

      return pairing.set('products', productsWithStock)
    })

    return pairingsWithStock
  },
)

export const getProductsRecipePairingsWithRecipes = createSelector(
  [getProductsRecipePairingsWithStock, getOrderRecipeItems],
  (pairings, recipes) => {
    const pairingsWithRecipes = recipes.reduce((recipesAccumulator, recipe) => {
      const productRecipePairing = pairings.get(recipe.get('recipeId'))

      if (!productRecipePairing) {
        return recipesAccumulator
      }

      const products = productRecipePairing.get('products', Immutable.List([]))

      if (products.size <= 0) {
        return recipesAccumulator
      }

      return [
        ...recipesAccumulator,
        {
          recipeId: recipe.get('recipeId'),
          title: recipe.get('title'),
          media: recipe.get('media'),
          products,
        },
      ]
    }, [])

    return Immutable.List(pairingsWithRecipes)
  },
)
