const transformMenuCollections = (menu, normalisedData, meta) => {
  if (!menu || !menu.relationships || !menu.relationships.collections || !menu.relationships.collections.data) {
    return undefined
  }

  const formattedData = menu.relationships.collections.data.map((collectionItem) => {
    const normalisedAttributes = normalisedData.collection[collectionItem.id].attributes

    const collection = {
      colour: normalisedAttributes.colour || '',
      description: normalisedAttributes.description || '',
      id: collectionItem.id,
      order: normalisedAttributes.order,
      published: true,
      shortTitle: normalisedAttributes.short_title || '',
      slug: normalisedAttributes.slug || '',
      requirements: normalisedAttributes.requirements || {},
      recipesInCollection: collectionItem.relationships.recipes.data.map(recipe => recipe.core_recipe_id)
    }

    if (normalisedAttributes.slug === 'recommendations') {
      collection.properties = meta.recommendations
    }

    return collection
  })

  return formattedData
}

const collectionsTransformer = (activeMenu, menuServiceData) => transformMenuCollections(activeMenu, menuServiceData, menuServiceData.meta)

export { collectionsTransformer }
