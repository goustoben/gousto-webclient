const collectionRecipesTransformer = (activeMenu) => {
  const getRecipeIds = (collectionRecipeData) => collectionRecipeData.map((recipe) => recipe)
  if (!activeMenu) {
    return undefined
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
