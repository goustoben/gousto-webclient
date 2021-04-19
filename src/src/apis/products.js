import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import config from 'config/products'
import routes from 'config/routes'

const reqData = {
  image_sizes: config.fetchImageSizes,
  includes: config.fetchIncludes,
}

export function fetchProduct(accessToken, productId, userId, menuId) {
  const data = {
    ...reqData,
    userId,
    menuId,
  }

  return fetch(accessToken, `${endpoint('products', 2)}/products/${productId}`, data, 'GET')
}

export function fetchProductCategories(accessToken) {
  return fetch(accessToken, `${endpoint('products', 2)}${routes.products.categories}`, { includes: config.categoryFetchIncludes }, 'GET')
}

export function fetchProducts(accessToken, cutoffDate, productsData, userId, menuId) {
  const data = {
    ...reqData,
    ...productsData,
    userId,
    menuId,
  }

  if (cutoffDate) {
    data.date = cutoffDate
  }

  return fetch(accessToken, `${endpoint('products', 2)}${routes.products.getProducts}`, data, 'GET')
}

export function fetchRandomProducts(accessToken, limit, imageSizes, userId, menuId) {
  const data = {
    sort: 'shuffle',
    limit,
    image_sizes: imageSizes,
    userId,
    menuId,
  }

  return fetch(accessToken, `${endpoint('products', 2)}${routes.products.getProducts}`, data, 'GET')
}

export function fetchProductStock(accessToken) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.productStock}`, {}, 'GET')
}
