import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import actions from 'actions/cookbook'
import { addDataSets } from 'DataSetsComponent'
import Hubs, { fetchData, fetchSetData, limit } from './Hubs'

function mapStateToProps({ cookbook, pending }) {
  const endSet = cookbook.get('collectionsEndSet')

  return {
    collectionSets: cookbook.get('collectionSets'),
    endSet: cookbook.get('collectionsEndSet'),
    fetchSetData,
    isLoading: pending.get(actionTypes.COOKBOOK_RECIEVE_COLLECTIONS) === endSet,
    limit,
    startSet: cookbook.get('collectionsStartSet'),
    totalSets: cookbook.get('collectionsTotalSets'),
  }
}

const EnhancedHubs = addDataSets(Hubs)
EnhancedHubs.fetchData = fetchData

export default connect(mapStateToProps, {
  loadSets: actions.cookbookLoadCollectionSets,
})(EnhancedHubs)
