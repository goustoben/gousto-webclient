import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const products = {
  products: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.PRODUCTS_RECEIVE: {

      return action.products.reduce((reducerState, product) => {
        let newProduct = reducerState.get(product.id, Immutable.Map()).mergeDeep(Immutable.fromJS(product))

        let media = Immutable.List()
        Object.keys(product.images || []).forEach(size => {
          if (!!product.images[size]) {
            media = media.push(Immutable.fromJS({ src: product.images[size].url, width: product.images[size].width }))
          }
        })

        let newCutoffDates = newProduct.get('cutoffDates', Immutable.List())
        if (action.cutoffDate) {
          newCutoffDates = newCutoffDates.push(action.cutoffDate)
        }

        newProduct = newProduct.set('media', media).set('cutoffDates', newCutoffDates)

        return reducerState.set(product.id, newProduct)
      }, state)
    }

    default: {
      return state
    }
    }
  },

  randomProducts: (state = Immutable.List([]), action) => {
    switch (action.type) {
    case actionTypes.PRODUCTS_RANDOM_RECEIVE: {
      const randomProducts = action.products || Immutable.List([])

      return state.merge(randomProducts)
    }

    default: {
      return state
    }
    }
  },

  productsCategories: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.PRODUCT_CATEGORIES_RECEIVE: {
      const categories = action.categories.reduce((reducerState, category) => reducerState.set(category.id, Immutable.fromJS(category)), Immutable.Map())
      const newState = state.merge(categories)

      return newState
    }

    default: {
      return state
    }
    }
  },

  productsStock: (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case actionTypes.PRODUCTS_STOCK_CHANGE: {
      let newState = state

      Object.keys(action.stock).forEach(productId => {
        let newStockLevel
        const stockEntry = action.stock[productId]
        const currentStockLevel = newState.get(productId, 0)

        if (currentStockLevel) {
          newStockLevel = currentStockLevel + stockEntry
        } else {
          newStockLevel = stockEntry
        }
        if (newStockLevel !== null && newStockLevel < 0) {
          newStockLevel = 0
        }
        newState = newState.set(productId, newStockLevel)
      })

      return newState
    }

    default: {
      return state
    }
    }
  },
}

export default products
