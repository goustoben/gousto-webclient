import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'

export const reduceBoxData = (state, data) => {
  if (!data || !data.box) {
    return state
  }

  const camelCaseBox = parseObjectKeysToCamelCase(data.box)
  const { sku, price, boxType, ...box } = camelCaseBox

  return {
    ...state,
    box: {
      ...box,
      dietaryPreference: {
        currentValue: camelCaseBox.boxType
      }
    }
  }
}
