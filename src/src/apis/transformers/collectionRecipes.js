
const collectionRecipesTransformer = (response) => {
  // TODO: which menu populates redux? is it based on dates?

  const getRecipeIds = (collectionRecipeData) => {
    return collectionRecipeData.map((recipe) => {
      return recipe
    })
  }

  const result = response.data[1]
    .relationships.collections.data.reduce((acc, collection) => {
      if (!acc[collection.id]) {
        const recipesInCollection = getRecipeIds(collection.relationships.recipes.data)
        acc[collection.id] = recipesInCollection
      }

      return acc
    }, {})

  return result
}

export { collectionRecipesTransformer }
