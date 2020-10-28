import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import { SubscriptionPauseScreenContainer } from './SubscriptionPauseScreen'

const propTypes = {
  dataLoaded: PropTypes.bool,
  showModal: PropTypes.bool,
  fetchData: PropTypes.func.isRequired,
  subscriptionPauseFetchReasons: PropTypes.func.isRequired,
  userLoadNewOrders: PropTypes.func.isRequired,
}

const defaultProps = {
  dataLoaded: false,
  showModal: false,
}

class SubscriptionPause extends React.Component {
  componentDidMount() {
    const {
      subscriptionPauseFetchReasons,
      userLoadNewOrders
    } = this.props

    subscriptionPauseFetchReasons()
    userLoadNewOrders()
  }

  shouldComponentUpdate(nextProps) {
    const {
      showModal,
      dataLoaded,
    } = this.props

    const {
      showModal: nextShowModal,
      dataLoaded: nextDataLoaded,
    } = nextProps

    return showModal !== nextShowModal
      || dataLoaded !== nextDataLoaded
  }

  componentDidUpdate() {
    const {
      showModal,
      dataLoaded,
      fetchData,
    } = this.props

    if (showModal && dataLoaded && fetchData) {
      fetchData()
    }
  }

  render() {
    const { showModal } = this.props

    return (<Overlay from="top" open={showModal}><SubscriptionPauseScreenContainer /></Overlay>)
  }
}

SubscriptionPause.propTypes = propTypes
SubscriptionPause.defaultProps = defaultProps

export default SubscriptionPause
