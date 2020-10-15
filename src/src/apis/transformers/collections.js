const transformMenuCollections = (menu, normalisedData, meta) => {
  if (!menu || !menu.relationships || !menu.relationships.collections || !menu.relationships.collections.data) {
    return undefined
  }

  const featuredCategories = menu.relationships.featured_categories && menu.relationships.featured_categories.data
    ? menu.relationships.featured_categories.data
    : []
  const featuredCategoriesObject = featuredCategories.reduce((acc, featuredCategory, index) => {
    acc[featuredCategory.id] = { ...featuredCategory, index }

    return acc
  }, {})

  const formattedData = menu.relationships.collections.data.map((collectionItem) => {
    const normalisedAttributes = normalisedData.collection[collectionItem.id].attributes
    const featuredCategory = featuredCategoriesObject[collectionItem.id]

    const collection = {
      colour: normalisedAttributes.colour || '',
      description: normalisedAttributes.description || '',
      id: collectionItem.id,
      order: normalisedAttributes.order,
      published: true,
      shortTitle: normalisedAttributes.short_title || '',
      slug: normalisedAttributes.slug || '',
      requirements: normalisedAttributes.requirements || {},
      recipesInCollection: collectionItem.relationships.recipes.data.map(recipe => recipe.core_recipe_id),
      isFeaturedCategory: !!featuredCategory,
      featuredCategoryOrder: featuredCategory ? featuredCategory.index : 0,
      carouselConfig: featuredCategory ? featuredCategory.meta : null
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
