import { connect } from 'react-redux'

import actions from 'actions'
import TotalTimeFilter from './TotalTimeFilter'
import config from 'config'


const mapStateToProps = (state) => ({
	totalTimeSelected: state.filters.get('totalTime'),
	totalTimeFilters: config.recipes.totalTime,
})

const mapActionsToProps = {
	filterCurrentTotalTimeChange: actions.filterCurrentTotalTimeChange,
}

const TotalTimeFilterContainer = connect(mapStateToProps, mapActionsToProps)(TotalTimeFilter)

export default TotalTimeFilterContainer
