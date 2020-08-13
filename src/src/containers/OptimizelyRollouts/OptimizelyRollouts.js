import React from 'react'
import PropTypes from 'prop-types'
import { getOptimizelyInstance } from './optimizelySDK'

export class OptimizelyRollouts extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      optimizelyInstance: null,
      isOptimizelyFeatureEnabled: false
    }
  }

  async componentDidMount() {
    await this.updateInstance()
  }

  async componentWillReceiveProps(nextProps) {
    const { authUserId } = this.props
    if (authUserId !== nextProps.authUserId) {
      await this.updateInstance()
    }
  }

  updateInstance = async () => {
    const { featureName, authUserId, trackExperimentInSnowplow } = this.props

    if (authUserId) {
      const optimizelyInstance = await getOptimizelyInstance()
      const isOptimizelyFeatureEnabled = optimizelyInstance.isFeatureEnabled(featureName, authUserId)

      this.setState({
        optimizelyInstance,
        isOptimizelyFeatureEnabled
      })

      const optimizelyConfig = optimizelyInstance.getOptimizelyConfig()
      trackExperimentInSnowplow(optimizelyConfig, featureName, isOptimizelyFeatureEnabled)
    }
  }

  render() {
    const { optimizelyInstance, isOptimizelyFeatureEnabled } = this.state
    const { authUserId, featureEnabled, children } = this.props

    if (!authUserId && !featureEnabled) {
      return children
    }

    if (!optimizelyInstance || isOptimizelyFeatureEnabled !== featureEnabled) {
      return null
    }

    return children
  }
}

OptimizelyRollouts.defaultProps = {
  authUserId: null,
  featureEnabled: false,
  children: null
}

OptimizelyRollouts.propTypes = {
  featureName: PropTypes.string.isRequired,
  featureEnabled: PropTypes.bool,
  authUserId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  trackExperimentInSnowplow: PropTypes.func.isRequired
}

