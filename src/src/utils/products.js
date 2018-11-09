import Immutable from 'immutable' /* eslint-disable new-cap */
import seedrandom from 'seedrandom'

export function isNotAGift(product) {
  return product.get('tags', Immutable.List())
    .filter(tag => tag === 'gift').size === 0
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

export default {
  getProductsByCutoff,
  getOneProductFromEachCategory,
  isNotAGift,
}
