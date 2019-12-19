import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import actions from 'actions/subscriptionPause'
import userActions from 'actions/user'
import Screen from './Screen'

class SubscriptionPause extends React.Component {
  static propTypes = {
    dataLoaded: PropTypes.bool,
    showModal: PropTypes.bool,
  }

  static defaultProps = {
    showModal: false,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  static fetchData = async ({ store }) => {
    await store.dispatch(actions.subscriptionPauseFetchReasons())

    const state = store.getState().subscriptionPause
    const reasons = state.get('reasons')
    const metaData = state.get('metaData')
    store.dispatch(actions.subscriptionTrackPauseAttempt(metaData))

    if (state.get('startScreen').size > 0) {
      store.dispatch(actions.subscriptionPauseLoadStartScreen())
    } else if (reasons.size) {
      store.dispatch(actions.subscriptionPauseLoadReasons(reasons))
      store.dispatch(actions.subscriptionTrackCategoriesViewed())
    }

    if (store.getState().user.get('orders').size < 1) {
      store.dispatch(userActions.userLoadOrders())
    }
  }

  componentDidUpdate() {
    if (this.props.showModal && !this.props.dataLoaded) {
      const store = this.context.store
      SubscriptionPause.fetchData({ store })
    }
  }

  render() {
    return (<Overlay from="top" open={this.props.showModal}><Screen /></Overlay>)
  }
}

export default SubscriptionPause
