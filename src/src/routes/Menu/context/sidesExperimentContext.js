import React from 'react'
import PropTypes from 'prop-types'
import { ExperimentsContainer } from 'containers/Experiments/ExperimentsContainer'
import { getBucket } from 'containers/Experiments/utils'

const SidesExperimentContext = React.createContext(null)
SidesExperimentContext.displayName = 'SidesExperimentContext'

const isSidesEnabled = (experiment) => getBucket(experiment) === 'variant'

/**
 * Creates a context containing the status of the `recipe-agnostic-adds-experiment`
 */
export const SidesExperimentProvider = ({ children }) => (
  <ExperimentsContainer experimentName="recipe-agnostic-adds-experiment">
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

export const useIsSidesExperimentEnabled = () => React.useContext(SidesExperimentContext)
