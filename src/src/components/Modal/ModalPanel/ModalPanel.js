import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import css from './ModalPanel.css'
import classNames from 'classnames'

class ModalPanel extends React.Component {
	static propTypes = {
		children: PropTypes.node,
		closePortal: PropTypes.func,
		closePortalFromButton: PropTypes.func,
		className: PropTypes.string,
		containerClassName: PropTypes.string,
		disableOverlay: PropTypes.bool,
		onGoBack: PropTypes.func,
		disableClickOutside: PropTypes.bool,
	}

	static defaultProps ={
		children: null,
		closePortal: () => {},
		className: '',
		containerClassName: '',
		disableOverlay: false,
		disableClickOutside: false,
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleMouseClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleMouseClickOutside)
	}

	isNodeInRoot = (node, root) => {
		let parent = node
		while (parent) {
			if (parent === root) {
				return true
			}
			parent = parent.parentNode
		}

		return false
	}

	handleMouseClickOutside = (e) => {
		if (this.props.disableClickOutside) {
			return
		}
		if (this.isNodeInRoot(e.target, ReactDOM.findDOMNode(this.refs.content))) {
			return
		}
		e.stopPropagation()
		this.props.closePortal()
	}

	renderBackButton = () => {
		let backButton = null

		if (this.props.onGoBack) {
			backButton = (
				<div
					className={css.leftControl}
					onClick={this.props.onGoBack}
				>
					<span className={css.back} /> Back
				</div>
			)
		}

		return backButton
	}

	render() {
		return (
			<div className={this.props.containerClassName}>
				{this.props.disableOverlay ? null : <div className={css.modalOverlay} />}
				<div className={classNames(this.props.className, css.modal)} ref="content">
					{this.renderBackButton()}
					<div
						className={css.rightControl}
						onClick={this.props.closePortalFromButton || this.props.closePortal}
						data-testing="modalClose"
					>
						<span className={css.close} />
					</div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default ModalPanel
