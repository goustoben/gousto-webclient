import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import { SubscriptionPauseScreenContainer } from './SubscriptionPauseScreen'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
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
      isAuthenticated,
      subscriptionPauseFetchReasons,
      userLoadNewOrders
    } = this.props

    if (isAuthenticated) {
      subscriptionPauseFetchReasons()
      userLoadNewOrders()
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      isAuthenticated,
      showModal,
      dataLoaded,
    } = this.props

    const {
      isAuthenticated: nextIsAuthenticated,
      showModal: nextShowModal,
      dataLoaded: nextDataLoaded,
    } = nextProps

    return isAuthenticated !== nextIsAuthenticated
        || showModal !== nextShowModal
        || dataLoaded !== nextDataLoaded
  }

  componentDidUpdate() {
    const {
      isAuthenticated,
      showModal,
      fetchData,
    } = this.props

    if (isAuthenticated && showModal && fetchData) {
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
