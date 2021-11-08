import { connect } from 'react-redux'
import Immutable from 'immutable'
import { DuplicateOrderModalWrapper } from './DuplicateOrderModalWrapper'

function mapStateToProps(state) {
  const closeOrderIds = state
    .temp
    .get('closeOrderIds', Immutable.List([]))

  return {
    visible: closeOrderIds && closeOrderIds.size > 1,
  }
}

export const DuplicateOrderModalWrapperContainer = connect(mapStateToProps, {})(DuplicateOrderModalWrapper)
