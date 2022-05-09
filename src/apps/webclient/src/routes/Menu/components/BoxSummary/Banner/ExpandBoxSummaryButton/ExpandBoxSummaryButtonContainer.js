import { connect } from 'react-redux'
import { ExpandBoxSummaryButton } from './ExpandBoxSummaryButton'

const mapStateToProps = (state) => ({
  showDetails: state.boxSummaryShow.get('show'),
})

const ExpandBoxSummaryButtonContainer = connect(mapStateToProps)(ExpandBoxSummaryButton)

export { ExpandBoxSummaryButtonContainer }
