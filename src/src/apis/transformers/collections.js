import { normaliseData } from './normaliseData'

const transformMenuCollections = (menu, normalisedData) => {
  const formattedData = menu.relationships.collections.data.map((collection) => {

    const normalisedAttributes = normalisedData.collection[collection.id].attributes

    return {
      colour: normalisedAttributes.colour,
      //default: normalisedAttributes.default,
      // description: normalisedAttributes.meta_description,
      id: collection.id,
      //isCookbook: normalisedAttributes.is_cookbook,
      order: normalisedAttributes.order,
      published: true,
      shortTitle: normalisedAttributes.short_title,
      slug: normalisedAttributes.slug,
    }
  })

  return formattedData
}

const collectionsTransformer = (activeMenu, response) => {
  const normalisedData = normaliseData(response)

  return transformMenuCollections(activeMenu, normalisedData)
}

export { collectionsTransformer }
