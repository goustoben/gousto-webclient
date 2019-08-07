import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import config from 'config/products'
import routes from 'config/routes'

const version = routes.version.products

const reqData = {
  image_sizes: config.fetchImageSizes,
  includes: config.fetchIncludes,
}

export function fetchProduct(accessToken, productId) {
  return fetch(accessToken, `${endpoint('products', version)}/products/${productId}`, reqData, 'GET')
}

export function fetchProductCategories(accessToken) {
  return fetch(accessToken, `${endpoint('products', version)}${routes.products.categories}`, { includes: config.categoryFetchIncludes }, 'GET')
}

export function fetchProducts(accessToken, cutoffDate, productsData) {
  const data = { ...reqData, ...productsData }

  if (cutoffDate) {
    data.date = cutoffDate
  }

  return fetch(accessToken, `${endpoint('products', version)}${routes.products.getProducts}`, data, 'GET')
}

export function fetchRandomProducts(accessToken, limit, imageSizes) {
  const data = {
    sort: 'shuffle',
    limit,
    image_sizes: imageSizes,
  }

  return fetch(accessToken, `${endpoint('products', version)}${routes.products.getProducts}`, data, 'GET')
}

export function fetchProductStock(accessToken) {
  return fetch(accessToken, `${endpoint('core')}${routes.core.productStock}`, {}, 'GET')
}
