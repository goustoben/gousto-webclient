import { connect } from 'react-redux'

import { OpenBoxButton } from './OpenBoxButton'

const mapStateToProp = (state) => ({
  arrowUp: !state.boxSummaryShow.get('show'),
})
const OpenBoxButtonContainer = connect(mapStateToProp)(OpenBoxButton)

export { OpenBoxButtonContainer }
