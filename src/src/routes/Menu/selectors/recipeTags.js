import { createSelector } from 'reselect'

import {
  getAllTags,
  findTag,
  getTaglineByRecipeId,
  getBrandAvailabilityByRecipeId,
} from './recipe'

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

export const getBrandTagline = createSelector(
  getTaglineByRecipeId,
  getAllTags,
  (
    tagline,
    allTags,
  ) => {
    if (!tagline || !allTags) {
      return null
    }

    return findTag(allTags, tagline)
  })
