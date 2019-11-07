
function getStockAvailability(getState, recipeStock) {
  const includedData = getState().recipes
  const storedRecipes = Object.values(includedData.toJS())
  const recipeStockList = Object.values(recipeStock)

  return recipeStockList.reduce((acc, stockEntry) => {
    const committed = stockEntry.committed === '1'

    const newId = storedRecipes.find((obj) => {
      return obj.coreRecipeId === stockEntry.recipeId.toString()
    }).id

    acc[newId] = {
      2: committed ? parseInt(stockEntry.number, 10) : 1000,
      4: committed ? parseInt(stockEntry.familyNumber, 10) : 1000,
      committed,
    }

    return acc
  }, {})
}

export { getStockAvailability }
