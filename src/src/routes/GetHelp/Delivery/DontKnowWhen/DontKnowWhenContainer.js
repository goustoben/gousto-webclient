import { connect } from 'react-redux'
import { DontKnowWhen } from './DontKnowWhen'

const mapStateToProps = (state) => ({
  deliveryDate: state.getHelp.getIn(['order', 'deliveryDate']),
  trackingURL: state.getHelp.getIn(['order', 'trackingURL']),
})

const DontKnowWhenContainer = connect(mapStateToProps, null)(DontKnowWhen)

export { DontKnowWhenContainer }
