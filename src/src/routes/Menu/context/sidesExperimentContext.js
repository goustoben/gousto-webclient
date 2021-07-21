import * as React from 'react'
import PropTypes from 'prop-types'
import { ExperimentsContainer } from 'containers/Experiments/ExperimentsContainer'
import { getBucket } from 'containers/Experiments/utils'

const SidesExperimentContext = React.createContext(null)
SidesExperimentContext.displayName = 'SidesExperimentContext'

const isSidesEnabled = (experiment) => getBucket(experiment) === 'variant'

/**
 * Creates a context containing the status of the `radishes-sides-experiment`
 */
export const SidesExperimentProvider = ({ children }) => (
  <ExperimentsContainer experimentName="radishes-sides-experiment">
    {(experiment) => (
      <SidesExperimentContext.Provider value={isSidesEnabled(experiment)}>
        {children}
      </SidesExperimentContext.Provider>
    )}
  </ExperimentsContainer>
)

SidesExperimentProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * Conditionally renders the `children` based on the status of the `radishes-sides-experiment`
 */
export const SidesExperimentConsumer = ({ children }) => (
  <SidesExperimentContext.Consumer>
    {enabled => (enabled ? children : null)}
  </SidesExperimentContext.Consumer>
)

SidesExperimentConsumer.propTypes = {
  children: PropTypes.node.isRequired
}
