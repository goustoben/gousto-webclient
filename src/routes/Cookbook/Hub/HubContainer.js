import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions/cookbook'
import * as cookbookUtils from 'utils/cookbook'
import * as storeUtils from 'utils/store'
import { addDataSets } from 'DataSetsComponent'
import Hub, { fetchData, fetchSetData, limit } from './Hub'

function mapStateToProps({ collections, cookbook, pending, recipes }, { params }) {
  const startSet = cookbook.get('recipesStartSet')
  const endSet = cookbook.get('recipesEndSet')
  const loadedRecipesIds = cookbookUtils.getItemIds(cookbook.get('recipeSets'), { endSet, startSet })
  const collectionIsLoading = pending.get(actionTypes.COLLECTIONS_RECEIVE_COLLECTIONS) === params.collectionSlug
  const collectionRecipesAreLoading = pending.get(actionTypes.COOKBOOK_RECIEVE_COLLECTION_RECIPES) === endSet

  return {
    collection: collections.find(collectionItem => collectionItem.get('slug') === params.collectionSlug),
    endSet: cookbook.get('recipesEndSet'),
    fetchSetData,
    isLoading: collectionIsLoading || collectionRecipesAreLoading,
    limit,
    recipes: storeUtils.getItemsById(loadedRecipesIds, recipes),
    recipesCollection: cookbook.get('recipesCollectionId'),
    startSet: cookbook.get('recipesStartSet'),
    totalSets: cookbook.get('recipesTotalSets'),
  }
}

const EnhancedHub = addDataSets(Hub)
EnhancedHub.fetchData = fetchData

const HubContainer = connect(mapStateToProps, {
  loadSets: actions.cookbookLoadRecipeSets,
  resetSets: actions.cookbookResetCollectionRecipes,
})(EnhancedHub)

export default HubContainer
