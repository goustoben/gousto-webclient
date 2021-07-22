import * as React from 'react'
import PropTypes from 'prop-types'
import { ExperimentsContainer } from 'containers/Experiments/ExperimentsContainer'
import { getBucket } from 'containers/Experiments/utils'

export const isSignpostingBucket = (bucket) => bucket === 'variant_a' || bucket === 'variant_c'
export const isMandatoryBucket = (bucket) => bucket === 'variant_b' || bucket === 'variant_c'

export const SignpostingExperimentContext = React.createContext(null)
SignpostingExperimentContext.displayName = 'SignpostingExperimentContext'

export const SignpostingExperimentWrapper = ({ children }) => (
  <ExperimentsContainer experimentName="swaps-ui-signpost-experiment2">
    {(experiment) => (
      <SignpostingExperimentContext.Provider value={getBucket(experiment)}>
        {children}
      </SignpostingExperimentContext.Provider>
    )}
  </ExperimentsContainer>
)

SignpostingExperimentWrapper.propTypes = {
  children: PropTypes.node.isRequired
}
