import Immutable from 'immutable'
import seedrandom from 'seedrandom'

export function isNotAGift(product) {
  return product.get('tags', Immutable.List())
    .filter(tag => tag === 'gift').size === 0
}

export function getProductsByCategoryId(products, categoryId) {
  return products.filter((product) => product.get('categories').filter((category) => (
    category.get('id') === categoryId
  )).size > 0)
}

export function getOneProductFromEachCategory(products, randomSeed) {
  return products.toList().groupBy((product) => {
    const category = product.get('categories').first()

    return category ? category.get('id') : ''
  })
    .sortBy((productList) => seedrandom(randomSeed + productList.hashCode())())
    .map((productList) => productList.sortBy(
      (product) => seedrandom(randomSeed + product.hashCode())()).first()
    )
    .filter(isNotAGift)
    .toList()
}

export function getProductsByCutoff(cutoffDate, products) {
  return products.filter(product => product.get('cutoffDates', Immutable.List()).contains(cutoffDate)).toList()
}

export function getCategoriesFromProducts(products) {
  const categories = {
    'all-products': {
      id: 'all-products',
      label: 'All Products',
      count: 0,
    }
  }

  const numberOfProducts = products.size

  if (!numberOfProducts) {
    return categories
  }

  categories['all-products'].count = numberOfProducts

  const categoriesAcc = categories
  products.forEach((product) => {
    const productCategories = product.get('categories')
    productCategories.forEach(category => {
      if (!category.get('hidden')) {
        const categoryId = category.get('id')

        if (categoriesAcc[categoryId]) {
          categoriesAcc[categoryId].count += 1
        } else {
          categoriesAcc[categoryId] = {
            id: categoryId,
            label: category.get('title'),
            count: 1,
          }
        }
      }
    })
  })

  return categoriesAcc
}

/**
 * Sort products in ascending order by price, with free products at the end.
 * @param {Array} products as returned from the API (not ImmutableJS)
 * @return {Array}
 */
export function sortProductsByPrice(products) {
  const sortedProducts = products.sort((a, b) => (
    parseFloat(a.listPrice) - parseFloat(b.listPrice)
  ))

  const freeProducts = []
  const productsWithPrice = []

  sortedProducts.forEach(product => {
    if (parseFloat(product.listPrice) <= 0) {
      freeProducts.push(product)
    } else {
      productsWithPrice.push(product)
    }
  })

  return [...productsWithPrice, ...freeProducts]
}
