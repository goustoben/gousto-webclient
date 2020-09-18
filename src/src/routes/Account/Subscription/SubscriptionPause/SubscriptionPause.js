import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import Screen from './Screen'

const propTypes = {
  dataLoaded: PropTypes.bool,
  showModal: PropTypes.bool,
  fetchData: PropTypes.func.isRequired,
  subscriptionPauseFetchReasons: PropTypes.func.isRequired,
}

const defaultProps = {
  dataLoaded: false,
  showModal: false,
}

class SubscriptionPause extends React.Component {
  componentDidMount() {
    const { subscriptionPauseFetchReasons } = this.props

    subscriptionPauseFetchReasons()
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

    return (<Overlay from="top" open={showModal}><Screen /></Overlay>)
  }
}

SubscriptionPause.propTypes = propTypes
SubscriptionPause.defaultProps = defaultProps

export default SubscriptionPause
