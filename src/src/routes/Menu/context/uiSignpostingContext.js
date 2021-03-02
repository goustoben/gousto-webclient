import * as React from 'react'
import PropTypes from 'prop-types'
import { ExperimentsContainer } from 'containers/Experiments/ExperimentsContainer'

const isSignpostingBucket = (bucket) => bucket === 'variant_a' || bucket === 'variant_c'
const isMandatoryBucket = (bucket) => bucket === 'variant_b' || bucket === 'variant_c'

const SignpostingExperimentContext = React.createContext(null)
SignpostingExperimentContext.displayName = 'SignpostingExperimentContext'

const getBucket = (experiment) => {
  if (!experiment) {
    return 'control'
  }

  const { withinExperiment, bucket } = experiment

  return withinExperiment ? bucket : 'control'
}

const SignpostingExperimentWrapper = ({ children }) => (
  <ExperimentsContainer experimentName="swaps-ui-signpost-experiment">
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

export { SignpostingExperimentContext, SignpostingExperimentWrapper, isMandatoryBucket, isSignpostingBucket }
