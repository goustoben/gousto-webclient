import { normaliseData } from './normaliseData'

const collectionsTransformer = (response) => {
  const normalisedData = normaliseData(response)
  const formattedData = response.data[0].relationships.collections.data.map((collection) => {
    const normalisedAttributes = normalisedData.collections[collection.id].attributes

    return {
      colour: normalisedAttributes.colour,
      default: normalisedAttributes.default,
      description: normalisedAttributes.description,
      id: collection.id,
      isCookbook: normalisedAttributes.is_cookbook,
      order: normalisedAttributes.order,
      published: true,
      shortTitle: normalisedAttributes.short_title,
      slug: normalisedAttributes.slug,
    }
  })

  return formattedData

}

export { collectionsTransformer }
