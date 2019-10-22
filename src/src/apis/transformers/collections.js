import { normaliseData } from './normaliseData'

const collectionsTransformer = (response) => {
  const normalisedData = normaliseData(response)
  const formattedData = response.data[0].relationships.collections.data.map((collection) => {
    const normalisedAttributes = normalisedData[collection.id].attributes

    return {
      colour: normalisedAttributes.colour,
      default: normalisedAttributes.default,
      description: normalisedAttributes.description,
      id: collection.id,
      isCookbook: normalisedAttributes.is_cookbook,
      order: normalisedAttributes.order,
      // TODO: [TR-600] - remove references to published in downstream components
      published: true, // we only return published menus and collection from the menu service, set to true here to prevent breaking downstream components
      shortTitle: normalisedAttributes.short_title,
      slug: normalisedAttributes.slug,
    }
  })

  return formattedData

}

export { collectionsTransformer }
