import { parseObjectKeysToCamelCase } from 'utils/jsonHelper'

const isSubscriptionSetupUnsupported = (numPortions, numRecipes) =>
  Number(numPortions) === 4 && Number(numRecipes) === 5

export const reduceBoxData = (state, data) => {
  if (!data || !data.box) {
    return state
  }

  const { boxType, numRecipes, numPortions, ...box } = data.box

  return {
    ...state,
    box: {
      ...box,
      numPortions: `${numPortions}`,
      dietaryPreference: {
        currentValue: boxType
      },
      mealsPerBox: {
        currentValue: `${numRecipes}`
      },
      boxSize: {
        currentValue: `${numPortions}`
      },
      requestState: {
        isLoaded: true,
        isLoading: false
      },
      subscriptionSettingsUnsupported: isSubscriptionSetupUnsupported(numPortions, numRecipes),
    }
  }
}

export const reduceSelectedBoxSize = (state, data) => ({
  ...state,
  box: {
    ...state.box,
    boxSize: { currentValue: String(data.numPortions) },
    subscriptionSettingsUnsupported: isSubscriptionSetupUnsupported(data.numPortions, state.box.mealsPerBox.currentValue)
  }
})

export const reduceSelectedMealsPerBox = (state, data) => ({
  ...state,
  box: {
    ...state.box,
    mealsPerBox: { currentValue: String(data.numRecipes) },
    subscriptionSettingsUnsupported: isSubscriptionSetupUnsupported(state.box.numPortions, data.numRecipes)
  }
})

export const reduceSwitchToFourMealsPerBox = (state) => ({
  ...state,
  box: {
    ...state.box,
    mealsPerBox: { currentValue: '4' },
    boxSize: { currentValue: '2' },
    subscriptionSettingsUnsupported: false,
  }
})

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
