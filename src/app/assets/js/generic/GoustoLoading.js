
import React from 'react'

const GoustoLoading = React.createClass({
	render: function () {
		return (<span>
			<i className="fa fa-spinner fa-spin fa-fw"></i>
			<span className="sr-only">Loading...</span>
		</span>)
	},
})

module.exports = GoustoLoading
