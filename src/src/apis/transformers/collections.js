import { normaliseData } from './normaliseData'

const transformMenuCollections = (menu, normalisedData, meta) => {

  if (menu && menu.relationships && menu.relationships.collections && menu.relationships.collections.data) {
    const formattedData = menu.relationships.collections.data.map((collectionItem) => {

      const normalisedAttributes = normalisedData.collection[collectionItem.id].attributes

      const collection = {
        colour: normalisedAttributes.colour,
        id: collectionItem.id,
        order: normalisedAttributes.order,
        published: true,
        shortTitle: normalisedAttributes.short_title,
        slug: normalisedAttributes.slug,
      }

      if (normalisedAttributes.slug === 'recommendations') {
        collection.properties = meta.recommendations
      }

      return collection
    })

    return formattedData
  }

  return
}

const collectionsTransformer = (activeMenu, response) => {
  const normalisedData = normaliseData(response)

  return transformMenuCollections(activeMenu, normalisedData, response.meta)
}

export { collectionsTransformer }
