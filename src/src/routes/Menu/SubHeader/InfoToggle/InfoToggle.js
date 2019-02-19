import PropTypes from 'prop-types'
import React from 'react'
import { Tooltip } from 'goustouicomponents'
import css from './InfoToggle.css'

class InfoToggle extends React.Component {
	static propTypes = {
	  children: PropTypes.arrayOf(PropTypes.node),
	}

	constructor() {
	  super()

	  this.state = {
	    visible: false,
	  }
	}

	toggleVisibility = visible => {
	  this.setState({ visible })
	}

	message = () => (
		<div className={css.message}>
			<span className={css.close} onClick={() => this.toggleVisibility(false)} />
			{this.props.children[1]}
		</div>
	)

	render() {
	  return (
			<Tooltip
			  placement="bottom"
			  message={this.message()}
			  visible={this.state.visible}
			  onVisibleChange={this.toggleVisibility}
			  triggers={['click']}
			>
				<span className={css.title}>
					{this.props.children[0]}
				</span>
			</Tooltip>
	  )
	}
}

export default InfoToggle
