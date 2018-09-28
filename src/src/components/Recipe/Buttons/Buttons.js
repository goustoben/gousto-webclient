import PropTypes from 'prop-types'
import React from 'react'

import { Button, Control, Segment, Tooltip } from 'goustouicomponents'
import Surcharge from './Surcharge'
import css from './Buttons.css'

class Buttons extends React.Component {

	static propTypes = {
		onAdd: PropTypes.func.isRequired,
		onRemove: PropTypes.func.isRequired,
		limitReached: PropTypes.bool.isRequired,
		recipeId: PropTypes.string.isRequired,
		position: PropTypes.number,
		qty: PropTypes.number.isRequired,
		numPortions: PropTypes.number.isRequired,
		view: PropTypes.string,
		outOfstock: PropTypes.bool,
		disable: PropTypes.bool,
		stock: PropTypes.number,
		menuBrowseCTAVisibilityChange: PropTypes.func,
		menuRecipeDetailVisibilityChange: PropTypes.func,
		surcharge: PropTypes.number,
	}


	constructor() {
		super()

		this.state = {
			tooltipVisible: false,
		}
	}

	getSegments = (tooltipMessage, tooltipWidth, disabled) => {
		const { numPortions, qty, surcharge, view } = this.props

		if (qty > 0) {
			const totalQty = qty * numPortions
			const defaultContent = view !== 'gridSmall' ? ' Servings Added' : ''
			const textContent = surcharge ? ' Added' : defaultContent

			return [
				<Segment
					key={0}
					onClick={this.handleRemove}
					size="small"
				>
					<Control placement="left" >-</Control>
				</Segment>,
				<Segment
					fill={false}
					key={1}
					size="large"
				>
					{`${totalQty}${textContent}`}
					<Surcharge surcharge={surcharge} quantity={qty} />
				</Segment>,
				<Tooltip
					key={2}
					placement="topRight"
					message={tooltipMessage}
					visible={this.state.tooltipVisible}
					onVisibleChange={this.tooltipToggle}
					style="button"
					className={tooltipWidth}
				>
					<Segment
						onClick={this.handleAdd}
						hover={this.tooltipHover}
						disabledClick={this.disabledClick}
						size="small"
						disabled={disabled}
					>
						<Control>+</Control>
					</Segment>
				</Tooltip>,
			]
		}

		return (
			<Tooltip
				message={tooltipMessage}
				visible={this.state.tooltipVisible}
				onVisibleChange={this.tooltipToggle}
				className={tooltipWidth}
				style="button"
			>
				<Segment
					onClick={this.handleAdd}
					hover={this.tooltipHover}
					disabledClick={this.disabledClick}
					disabled={disabled}
					fill
				>
					Add {this.props.view !== 'gridSmall' ? 'Recipe' : ''}
					<Surcharge surcharge={surcharge} />
				</Segment>
			</Tooltip>
		)
	}

	handleAdd = () => {
		if (!this.props.disable) {
			if (this.props.stock !== null) {
				this.props.onAdd(this.props.recipeId, this.props.view, false, { position: this.props.position })
			} else if (['detail', 'fineDineInDetail'].includes(this.props.view)) {
				this.props.menuRecipeDetailVisibilityChange(false)
				setTimeout(() => { this.props.menuBrowseCTAVisibilityChange(true) }, 500)
			} else {
				this.props.menuBrowseCTAVisibilityChange(true)
			}
		}
	}

	handleRemove = () => {
		this.props.onRemove(this.props.recipeId, this.props.view, this.props.position)
	}

	tooltipToggle = (visible) => {
		if (this.props.outOfstock || this.props.limitReached) {
			this.setState({ tooltipVisible: visible })
		}
	}

	tooltipHover = (event) => {
		if (this.props.outOfstock || this.props.limitReached) {
			if (event.type === 'mouseenter') {
				this.setState({ tooltipVisible: true })
			} else if (event.type === 'mouseleave') {
				this.setState({ tooltipVisible: false })
			}
		}
	}

	disabledClick = () => {
		if (this.props.outOfstock || this.props.limitReached) {
			if (this.state.visible) {
				this.setState({ tooltipVisible: false })
			} else {
				this.setState({ tooltipVisible: true })
			}
		}
	}

	render() {
		const disabled = this.props.outOfstock || this.props.limitReached
		let tooltipMessage = ''
		if (this.props.outOfstock) {
			tooltipMessage = 'You got the last one'
		} else if (this.props.limitReached) {
			tooltipMessage = 'You\'ve run out of space in your box!'
		}

		return (
			<Button
				fill={false}
				className={css.btnWrapper}
				data-testing="menuRecipeAdd"
				width="full"
			>
				{this.getSegments(
					tooltipMessage,
					(this.props.view === 'gridSmall') ? css.tooltipMobileGrid : css.tooltipWidth,
					disabled
				)}
			</Button>
		)
	}
}

export default Buttons
