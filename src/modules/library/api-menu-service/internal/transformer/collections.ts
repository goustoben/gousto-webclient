import { MenuAPIResponseDataItem, MenuServiceData } from '../http'
import { MenuApiResponseRelationshipFeaturedCategory } from '../http/types/relationships'

// TODO we should aim to remove this, it's unnecessary complexity
type ModifiedFeaturedCategory = MenuApiResponseRelationshipFeaturedCategory & {
  index: number
}

const transformMenuCollections = (menu: MenuAPIResponseDataItem, normalisedData: MenuServiceData['data']) => {
  if (!normalisedData || !menu?.relationships?.collections?.data) {
    return []
  }

  const meta = normalisedData.meta

  const featuredCategories =
    menu.relationships.featured_categories && menu.relationships.featured_categories.data
      ? menu.relationships.featured_categories.data
      : []

  const featuredCategoriesObject = featuredCategories.reduce<Record<string, ModifiedFeaturedCategory>>(
    (acc, featuredCategory, index) => {
      acc[featuredCategory.id] = { ...featuredCategory, index }

      return acc
    },
    {},
  )

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
      requirements: normalisedAttributes.requirements || { dietary_claims: [] },
      recipesInCollection: collectionItem.relationships.recipes.data.map((recipe) => recipe.core_recipe_id),
      isFeaturedCategory: !!featuredCategory,
      featuredCategoryOrder: featuredCategory ? featuredCategory.index : 0,
      carouselConfig: featuredCategory ? featuredCategory.meta : null,
      thumbnail: collectionItem.meta && collectionItem.meta.thumbnail,

      // TODO can this logic be lifted out of here?
      properties: normalisedAttributes.slug === 'recommendations' ? meta.recommendations : undefined,
    }

    return collection
  })

  return formattedData
}

export const collectionsTransformer = (menuServiceData: MenuServiceData['data'], activeMenu: MenuAPIResponseDataItem) =>
  transformMenuCollections(activeMenu, menuServiceData)
