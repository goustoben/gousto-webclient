import { connect } from 'react-redux'

import actions from 'actions'
import DietTypesFilter from './DietTypesFilter'
import config from 'config'

const mapStateToProps = (state) => ({
  dietTypes: state.filters.get('dietTypes'),
  dietTypesFilters: config.recipes.dietTypes,
})

const mapActionsToProps = {
  filterCurrentDietTypesChange: actions.filterCurrentDietTypesChange,
}

const DietTypesFilterContainer = connect(mapStateToProps, mapActionsToProps)(DietTypesFilter)

export default DietTypesFilterContainer
