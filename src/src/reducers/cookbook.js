import Immutable from 'immutable' /* eslint-disable new-cap */
import types from "../actions/actionTypes"

export const initialState = Immutable.fromJS({
  collectionSets: {},
  collectionsStartSet: 1,
  collectionsEndSet: 1,
  collectionsTotalSets: 0,
  recipesInstructions: {},
  recipeSets: {},
  recipesCollectionId: undefined,
  recipesStartSet: 1,
  recipesEndSet: 1,
  recipesTotalSets: 0,
})

const cookbookReducer = {
  cookbook: (state = initialState, { type, ...data }) => {
    switch (type) {
    case types.COOKBOOK_RECIEVE_COLLECTIONS: {
      const { setNum, collections = [], meta = {} } = data
      const { total = 0, limit = 1 } = meta
      const collectionIds = collections.reduce((accumulator, currentCollection) => (
        accumulator.contains(currentCollection.id) ? accumulator : accumulator.push(currentCollection.id)
      ), Immutable.List())

      let newState = state.setIn(['collectionSets', setNum], collectionIds)
      newState = newState.set('collectionsTotalSets', Math.ceil(total / limit))

      return newState
    }

    case types.COOKBOOK_RECIEVE_COLLECTION_RECIPES: {
      const { collectionId, setNum, recipes = [], meta = {} } = data
      const { total = 0, limit = 1 } = meta

      const recipeIds = recipes.reduce((accumulator, currentRecipe) => (
        accumulator.contains(currentRecipe.id) ? accumulator : accumulator.push(currentRecipe.id)
      ), Immutable.List())

      let newState = state.setIn(['recipeSets', setNum], recipeIds)
      newState = newState.merge({
        recipesCollectionId: collectionId,
        recipesTotalSets: Math.ceil(total / limit),
      })

      return newState
    }

    case types.COOKBOOK_LOAD_COLLECTION_SETS: {
      const { startSet, endSet } = data
      let newState = state

      if (startSet) {
        newState = newState.set('collectionsStartSet', startSet)
      }

      if (endSet) {
        newState = newState.set('collectionsEndSet', endSet)
      }

      return newState
    }

    case types.COOKBOOK_LOAD_RECIPE_SETS: {
      const { startSet, endSet } = data
      let newState = state

      if (startSet) {
        newState = newState.set('recipesStartSet', startSet)
      }

      if (endSet) {
        newState = newState.set('recipesEndSet', endSet)
      }

      return newState
    }

    case types.COOKBOOK_RESET_RECIPE_SETS: {
      let newState = state.set('recipeSets', initialState.get('recipeSets'))
      newState = newState.set('recipesCollectionId', initialState.get('recipesCollectionId'))
      newState = newState.set('recipesStartSet', initialState.get('recipesStartSet'))
      newState = newState.set('recipesEndSet', initialState.get('recipesEndSet'))
      newState = newState.set('recipesTotalSets', initialState.get('recipesTotalSets'))

      return newState
    }
    
    case types.COOKBOOK_FETCH_RECIPE_STEPS_BY_ID: {
      const { recipeId, recipeStepsById } = data
      let newState = state

      if( recipeId && recipeStepsById ) {
        newState = newState.setIn(['recipesInstructions', recipeId], Immutable.fromJS(recipeStepsById))
      }

      return newState
    }
    
    default:
      return state
    }
  },
}

export default cookbookReducer
