import { locationQuery } from "selectors/routing"

function getStockAvailability(getState, recipeStock) {
    const {recipes} = getState()
    const query = locationQuery(getState())
    const isAdminLink = query && query['preview[menu_id]']
    const includedData = recipes
    const storedRecipes = Object.values(includedData.toJS())
    const recipeStockList = Object.values(recipeStock)

    if (isAdminLink) {
        return storedRecipes.reduce((acc, recipe) => {
            acc[recipe.id] = {
                2: 1000,
                4: 1000,
                committed: false,
            }

            return acc
        }, {})
    }

    return recipeStockList.reduce((acc, stockEntry) => {
        const committed = stockEntry.committed === '1'
        const foundMatchingRecipeFromStock = storedRecipes.find((obj) => obj.id === stockEntry.recipeId.toString())

        if (foundMatchingRecipeFromStock) {
            acc[foundMatchingRecipeFromStock.id] = {
                2: committed ? parseInt(stockEntry.number, 10) : 1000,
                4: committed ? parseInt(stockEntry.familyNumber, 10) : 1000,
                committed,
            }
        }

        return acc
    }, {})
}

export { getStockAvailability }
