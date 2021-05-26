import { collectionDescriptors } from './showcaseMenuConfig'

/**
 * convert menuCollections into an array of descriptors that show at which line
 * to place a pill representing the collection and the data describing the pill.
 *
 * - collections are ordered and split into lines in a well-defined way,
 *   hardcoded for the experiment
 *
 * - when response is not yet available (= loading state), default to this
 *   order
 *
 * - if collection in the order is absent in the data from server, don't display it
 *
 * - for extra collections (those in the data from server, but not defined in
 *   the order), append them to alternate lines (0, 1, 0, 1, ...)
 *
 * @param menuCollection: Immutable.Map<string, Collection>.
 *   keys are collection ids
 *   values are Immutable.Map<string, any> that have slug, shortTitle, id
 *
 * @return {slug, line, shortTitle, id}[]
 */
const matchDescriptors = (menuCollections) => {
  const slugToCollection = menuCollections.valueSeq().reduce((obj, collection) => {
    // eslint-disable-next-line no-param-reassign
    obj[collection.get('slug')] = collection

    return obj
  }, {})

  const matching = collectionDescriptors
    .filter(({ slug }) => !!slugToCollection[slug])
    .map(({ slug, line }) => {
      const collection = slugToCollection[slug]

      delete slugToCollection[slug]

      return {
        line,
        slug,
        shortTitle: collection.get('shortTitle'),
        id: collection.get('id'),
      }
    })

  // If any server collections are remaining after matching, append to
  // alternate lines.
  const extra = Object.entries(slugToCollection).map(([slug, collection], index) => ({
    line: index % 2,
    slug,
    shortTitle: collection.get('shortTitle'),
    id: collection.get('id'),
  }))

  const result = matching.concat(extra)

  return result
}

const splitIntoLines = (descriptors) => {
  const lines = [0, 1].map((thisLine) => descriptors.filter(({ line }) => line === thisLine))

  return lines
}

/**
 * Given menuCollections stored in the state from the server response, return
 * descriptors for lines of pills.
 */
export const getFilteredLines = (menuCollections) => {
  const descriptors =
    menuCollections && menuCollections.size > 0
      ? matchDescriptors(menuCollections)
      : collectionDescriptors

  return splitIntoLines(descriptors)
}
