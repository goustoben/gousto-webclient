import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

export class Experiments extends React.PureComponent {
  componentDidMount() {
    this.updateExperiments()
  }

  componentDidUpdate() {
    this.updateExperiments()
  }

  updateExperiments() {
    const { experiment, isFetchingExperiments, fetchOrAssignUserToExperiment, experimentName } = this.props

    if (!experiment && !isFetchingExperiments) {
      fetchOrAssignUserToExperiment(experimentName)
    }
  }

  render() {
    const { children, experiment } = this.props

    if (!experiment) {
      return null
    }

    return children(experiment)
  }
}

Experiments.defaultProps = {
  experiment: null,
  children: () => null
}

Experiments.propTypes = {
  isFetchingExperiments: PropTypes.bool.isRequired,
  children: PropTypes.func,
  experimentName: PropTypes.string.isRequired,
  fetchOrAssignUserToExperiment: PropTypes.func.isRequired,
  experiment: ImmutablePropTypes.contains({
    name: PropTypes.string,
    withinExperiment: PropTypes.bool,
    bucket: PropTypes.string
  })
}
