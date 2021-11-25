import { createSelector } from 'reselect'
import { getAllTags, findTag, getBrandAvailabilityByRecipeId } from './recipe'

export const getBrandAvailability = createSelector(
  getBrandAvailabilityByRecipeId,
  getAllTags,
  (
    availability,
    allTags,
  ) => {
    if (!availability || !allTags) {
      return null
    }

    return findTag(allTags, availability)
  }
)
