import Immutable from 'immutable' /* eslint-disable new-cap */

const ratingSort = (a, b) => b.getIn(['rating', 'average'], 0) - a.getIn(['rating', 'average'], 0)
const isFeatured = (recipe, cutoffDate) => (
		recipe && recipe.get('availability').filter((entry) => {
			const dateFrom = new Date(entry.get('from'))
			const dateUntil = new Date(entry.get('until'))

			return entry.get('featured') && (cutoffDate <= dateUntil) && (cutoffDate >= dateFrom)
		}).size > 0
)

const isMeat = recipe => recipe.get('dietType', '').toLowerCase() === 'meat'
const isFish = recipe => recipe.get('dietType', '').toLowerCase() === 'fish'
const isOther = recipe => !(isFish(recipe) || isMeat(recipe))

const orderRecipes = (recipesMap, cutoffDateStr) => {
	const cutoffDate = new Date(cutoffDateStr)
	const recipes = recipesMap.toList()
	const featuredRecipes = recipes.filter(recipe => isFeatured(recipe, cutoffDate))
	const meatRecipes = recipes
		.filter(recipe => !isFeatured(recipe, cutoffDate))
		.filter(isMeat)
		.sort(ratingSort)

	const fishRecipes = recipes
		.filter(recipe => !isFeatured(recipe, cutoffDate))
		.filter(isFish)
		.sort(ratingSort)

	// veggie and anything else
	const otherRecipes = recipes
		.filter(recipe => !isFeatured(recipe, cutoffDate))
		.filter(isOther)
		.sort(ratingSort)

	const limit = Math.max(meatRecipes.size, fishRecipes.size, otherRecipes.size)

	let orderedRecipes = featuredRecipes

	for (let i = 0; i < limit; i++) {
		const meatRecipe = meatRecipes.get(i)
		const fishRecipe = fishRecipes.get(i)
		const otherRecipe = otherRecipes.get(i)
		if (meatRecipe) {
			orderedRecipes = orderedRecipes.push(meatRecipe)
		}
		if (fishRecipe) {
			orderedRecipes = orderedRecipes.push(fishRecipe)
		}
		if (otherRecipe) {
			orderedRecipes = orderedRecipes.push(otherRecipe)
		}
	}

	return orderedRecipes.reduce((reducerState, recipe) => reducerState.set(recipe.get('id'), recipe), Immutable.OrderedMap({}))
}

export default orderRecipes
