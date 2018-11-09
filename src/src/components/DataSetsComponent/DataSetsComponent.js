import React, { PropTypes } from 'react'

class DataSetsComponent extends React.PureComponent {
	static contextTypes = {
	  store: PropTypes.object.isRequired,
	}

	static defaultProps = {
	  endSet: 1,
	  limit: 20,
	  startSet: 1,
	}

	static propTypes = {
	  Component: React.PropTypes.func.isRequired,
	  endSet: React.PropTypes.number,
	  fetchSetData: React.PropTypes.func.isRequired,
	  limit: React.PropTypes.number,
	  loadSets: React.PropTypes.func.isRequired,
	  params: React.PropTypes.object,
	  startSet: React.PropTypes.number,
	  totalSets: React.PropTypes.number.isRequired,
	}

	fetchSetDataIfAvailable = setNum => {
	  const { store } = this.context
	  const { fetchSetData, params, totalSets } = this.props

	  // fetch data if data is expected in given set
	  if (setNum <= totalSets) {
	    return fetchSetData({ params, store, setNum })
	  }

	  return Promise.resolve()
	}

	loadNextSet = () => {
	  const { endSet, loadSets, totalSets } = this.props
	  const nextSetNum = endSet + 1

	  // if we're not already on last set
	  if (nextSetNum <= totalSets) {
	    loadSets({ endSet: nextSetNum })

	    // preload next set data
	    return this.fetchSetDataIfAvailable(nextSetNum + 1)
	  }

	  return Promise.resolve()
	}

	render() {
	  const { Component, ...props } = this.props

	  return (
			<Component
			  {...props}
			  fetchSetData={this.fetchSetDataIfAvailable}
			  loadNextSet={this.loadNextSet}
			/>
	  )
	}
}

export default DataSetsComponent
export const addDataSets = Component => props => (
	<DataSetsComponent
	  {...props}
	  Component={Component}
	/>
)
