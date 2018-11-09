import { connect } from 'react-redux'
import Immutable from 'immutable' /* eslint-disable new-cap */
import DuplicateOrderModalWrapper from './DuplicateOrderModalWrapper'

function mapStateToProps(state) {
  const closeOrderIds = state
    .temp
    .get('closeOrderIds', Immutable.List([]))

  return {
    visible: closeOrderIds && closeOrderIds.size > 1,
  }
}

const DuplicateOrderModalWrapperContainer = connect(mapStateToProps, {})(DuplicateOrderModalWrapper)

export default DuplicateOrderModalWrapperContainer
