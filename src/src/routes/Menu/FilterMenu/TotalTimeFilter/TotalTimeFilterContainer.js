import { connect } from 'react-redux'

import actions from 'actions'
import config from 'config'
import TotalTimeFilter from './TotalTimeFilter'

const mapStateToProps = (state) => ({
  totalTimeSelected: state.filters.get('totalTime'),
  totalTimeFilters: config.recipes.totalTime,
})

const mapActionsToProps = {
  filterCurrentTotalTimeChange: actions.filterCurrentTotalTimeChange,
}

const TotalTimeFilterContainer = connect(mapStateToProps, mapActionsToProps)(TotalTimeFilter)

export default TotalTimeFilterContainer
