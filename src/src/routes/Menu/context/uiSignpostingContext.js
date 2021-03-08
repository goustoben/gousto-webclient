import * as React from 'react'
import PropTypes from 'prop-types'
import { ExperimentsContainer } from 'containers/Experiments/ExperimentsContainer'

export const isSignpostingBucket = (bucket) => bucket === 'variant_a' || bucket === 'variant_c'
export const isMandatoryBucket = (bucket) => bucket === 'variant_b' || bucket === 'variant_c'

export const SignpostingExperimentContext = React.createContext(null)
SignpostingExperimentContext.displayName = 'SignpostingExperimentContext'

export const getBucket = (experiment) => {
  if (!experiment) {
    return 'control'
  }

  const withinExperiment = experiment.get('withinExperiment')
  const bucket = experiment.get('bucket')

  return withinExperiment ? bucket : 'control'
}

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
