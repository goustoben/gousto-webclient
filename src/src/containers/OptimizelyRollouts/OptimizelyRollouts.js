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
    const { authUserId, sessionId } = this.props
    if (authUserId !== nextProps.authUserId || sessionId !== nextProps.sessionId) {
      await this.updateInstance()
    }
  }

  updateInstance = async () => {
    const { featureName, authUserId, sessionId, trackExperimentInSnowplow } = this.props

    const userId = authUserId || sessionId

    if (userId) {
      const optimizelyInstance = await getOptimizelyInstance()
      const isOptimizelyFeatureEnabled = optimizelyInstance.isFeatureEnabled(featureName, userId)

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
    const { authUserId, sessionId, featureEnabled, children } = this.props

    if (!authUserId && !sessionId && !featureEnabled) {
      return children
    }

    if (!optimizelyInstance || isOptimizelyFeatureEnabled !== featureEnabled) {
      return null
    }

    return children
  }
}

OptimizelyRollouts.defaultProps = {
  sessionId: null,
  authUserId: null,
  featureEnabled: false,
  children: null
}

OptimizelyRollouts.propTypes = {
  featureName: PropTypes.string.isRequired,
  featureEnabled: PropTypes.bool,
  authUserId: PropTypes.string,
  sessionId: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  trackExperimentInSnowplow: PropTypes.func.isRequired
}

