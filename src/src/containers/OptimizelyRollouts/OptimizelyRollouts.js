import React from 'react'
import PropTypes from 'prop-types'
import { getOptimizelyInstance, hasValidInstance } from './optimizelySDK'

export class OptimizelyRollouts extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      isOptimizelyFeatureEnabled: false,
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
    const { featureName, trackExperimentInSnowplow, authUserId, sessionId } = this.props

    // Only try to get optimizely flag
    // if user is logged and we have a valid optimizely instance
    const userId = authUserId || sessionId
    if ((userId) && hasValidInstance()) {
      const optimizelyInstance = await getOptimizelyInstance()
      const isOptimizelyFeatureEnabled = optimizelyInstance.isFeatureEnabled(featureName, userId)

      this.setState({
        isOptimizelyFeatureEnabled,
      })

      trackExperimentInSnowplow(featureName, isOptimizelyFeatureEnabled, authUserId, sessionId)
    }

    // After the first call we set the loading state to false
    // If we change this behaviour to only do it if we have a auth user and valid instance
    // It will be possible to render nothing at all, which is something we dont want
    this.setState({
      loading: false
    })
  }

  render() {
    const { isOptimizelyFeatureEnabled, loading } = this.state
    const { authUserId, featureEnabled, sessionId, children } = this.props

    // If user is not logged in and the feature flag is disabled
    // we should display the children component
    if (!authUserId && !sessionId && !featureEnabled) {
      return children
    }

    // If the component is still loading or if the feature flag is different from
    // optimizely we should display nothing
    if (loading || isOptimizelyFeatureEnabled !== featureEnabled) {
      return null
    }

    // Component loaded and feature flag is enabled on both sides
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
  trackExperimentInSnowplow: PropTypes.func.isRequired,
}

