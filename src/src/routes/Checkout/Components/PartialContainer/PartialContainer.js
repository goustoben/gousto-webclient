import PropTypes from 'prop-types'
import React from 'react'
import css from './Partial.css'

class PartialContainer extends React.PureComponent {
	static propTypes = {
	  visible: PropTypes.bool,
	  children: PropTypes.node,
	}

	render() {
	  return (
			<div className={css.container}>
				{this.props.visible && this.props.children}
			</div>
	  )
	}
}

export default PartialContainer
