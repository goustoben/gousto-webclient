const collectionRecipesTransformer = (activeMenu) => {
  const getRecipeIds = (collectionRecipeData) => {
    return collectionRecipeData.map((recipe) => {
      return recipe
    })
  }

  const result = activeMenu
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
