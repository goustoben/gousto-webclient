import { connect } from 'react-redux'
import { isMobile } from 'utils/view'
import { OpenBoxButton } from './OpenBoxButton'

const mapStateToProp = (state) => {
  return ({
    arrowUp: state.boxSummaryShow.get('show') && isMobile(state.boxSummaryShow.get('view')),
  })

}
const OpenBoxButtonContainer = connect(mapStateToProp)(OpenBoxButton)

export { OpenBoxButtonContainer }
