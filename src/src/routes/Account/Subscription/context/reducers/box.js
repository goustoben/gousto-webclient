import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'

export const reduceBoxData = (state, data) => {
  if (!data || !data.box) {
    return state
  }

  const camelCaseBox = parseObjectKeysToCamelCase(data.box)
  const { sku, price, boxType, numRecipes, ...box } = camelCaseBox

  return {
    ...state,
    box: {
      ...box,
      dietaryPreference: {
        currentValue: boxType
      },
      mealsPerBox: {
        currentValue: `${numRecipes}`
      },
      requestState: {
        isLoaded: true,
        isLoading: false
      }
    }
  }
}

export const reduceBoxPricesData = (state, data) => {
  if (!data) {
    return state
  }

  const camelCaseBoxPrices = parseObjectKeysToCamelCase(data)

  return {
    ...state,
    boxPrices: {
      ...camelCaseBoxPrices,
      requestState: {
        isLoaded: true,
        isLoading: false
      }
    }
  }
}
