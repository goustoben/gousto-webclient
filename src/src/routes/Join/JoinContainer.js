import { connect } from 'react-redux'
import Join from './Join'
import action from 'actions/persist'

const JoinContainer = connect(state => ({
  enableStorystream: state.features.getIn(['enableStorystream', 'value'], true),
  moduleOrder: state.features.getIn(['hp_module_order', 'value']),
  enableSubscription: state.features.getIn(['join_subscription', 'value'], false),
  heroLeftAlignedBox570: state.features.getIn(['heroLeftAlignedBox570', 'value'], false),
  browser: state.request.get('browser'),
}), {
  simpleHeader: action.simpleHeader,
})(Join)

export default JoinContainer
