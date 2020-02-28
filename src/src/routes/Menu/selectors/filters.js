// This file is for Quick Filters and Collection filters only - should change file name eventually

import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { getMenuCollections } from 'selectors/root'

export const getAllRecipesCollectionId = createSelector(
  [getMenuCollections],
  (menuCollections) => (
    menuCollections.find(
      collection => collection.get('default') === true,
      null,
      Immutable.Map({})
    ).get('id')
  )
)

export const getMenuCollectionsWithRecipes = (state) => (
  state.menuCollections
    .filter(collection => state.menuCollectionRecipes.get(collection.get('id'), Immutable.List([])).size > 0)
    .filter(collection => collection.get('published'))
)
