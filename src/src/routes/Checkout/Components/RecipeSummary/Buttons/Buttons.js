import React from 'react'
import { Button, Segment, Control, Tooltip } from 'goustouicomponents'
import config from 'config/checkout'
import css from './Buttons.css'

class Buttons extends React.Component {

	static propTypes = {
		onAdd: React.PropTypes.func.isRequired,
		onRemove: React.PropTypes.func.isRequired,
		limitReached: React.PropTypes.bool.isRequired,
		recipeId: React.PropTypes.string.isRequired,
		qty: React.PropTypes.number.isRequired,
		numPortions: React.PropTypes.number.isRequired,
		view: React.PropTypes.string,
		outOfstock: React.PropTypes.bool,
		disabled: React.PropTypes.bool.isRequired,
		stock: React.PropTypes.number,
		showControl: React.PropTypes.bool,
	}

	constructor() {
		super()

		this.state = {
			tooltipVisibleAdd: false,
			tooltipVisibleRemove: false,
		}
	}

	getSegments = (tooltipMessage, tooltipWidth, canAdd, canRemove, segment) => ([
		<Tooltip
			key={0}
			placement="topRight"
			message="Return to the menu to select new recipes"
			visible={this.state.tooltipVisibleRemove}
			onVisibleChange={this.tooltipToggle(canRemove, 'Remove')}
			style="button"
			className={tooltipWidth}
		>
			<Segment
				onClick={this.handleRemove}
				disabledClick={this.disabledClick(canRemove, 'Remove')}
				hover={this.tooltipHover(canRemove, 'Remove')}
				disabled={canRemove}
				size="shortSmall"
				className={css.segmentSmall}
				fill={false}
			>
				<Control placement="left" >-</Control>
			</Segment>
		</Tooltip>,
		segment,
		<Tooltip
			key={2}
			placement="topRight"
			message={tooltipMessage}
			visible={this.state.tooltipVisibleAdd}
			onVisibleChange={this.tooltipToggle(canAdd, 'Add')}
			style="button"
			className={tooltipWidth}
		>
			<Segment
				onClick={this.handleAdd}
				hover={this.tooltipHover(canAdd, 'Add')}
				disabledClick={this.disabledClick(canAdd, 'Add')}
				size="shortSmall"
				className={css.segmentSmall}
				disabled={canAdd}
				fill={false}
			>
				<Control>+</Control>
			</Segment>
		</Tooltip>,
	])

	handleAdd = () => {
		if (this.props.stock !== null) {
			this.props.onAdd(this.props.recipeId, this.props.view)
		}
	}

	handleRemove = () => {
		if (this.props.qty > 1) {
			this.props.onRemove(this.props.recipeId, this.props.view)
		}
	}

	tooltipToggle = (condition, stateName) => (
		(visible) => {
			if (condition) {
				this.setState({ [`tooltipVisible${stateName}`]: visible })
			}
		}
	)

	tooltipHover = (condition, stateName) => (
		(event) => {
			if (condition) {
				if (event.type === 'mouseenter') {
					this.setState({ [`tooltipVisible${stateName}`]: true })
				} else if (event.type === 'mouseleave') {
					this.setState({ [`tooltipVisible${stateName}`]: false })
				}
			}
		}
	)

	disabledClick = (condition, stateName) => (
		() => {
			if (condition) {
				if (this.state.visible) {
					this.setState({ [`tooltipVisible${stateName}`]: false })
				} else {
					this.setState({ [`tooltipVisible${stateName}`]: true })
				}
			}
		}
	)

	render() {
		let tooltipMessage = ''
		if (this.props.outOfstock) {
			tooltipMessage = config.tooltip.outOfstock
		} else if (this.props.limitReached) {
			tooltipMessage = config.tooltip.limitReached
		}
		const segment = (
			<Segment
				key={1}
				size="shortLarge"
				fill={false}
				disabled
				className={(this.props.showControl) ? css.parsley : css.noControl}
			>
				{`${this.props.qty * this.props.numPortions} Servings`}
			</Segment>
		)

		return (
			<Button
				className={css.btnCheckout}
				width="auto"
			>
				{(this.props.showControl) ? this.getSegments(
					tooltipMessage,
					css.tooltipWidth,
					this.props.outOfstock || this.props.limitReached,
					this.props.qty === 1,
					segment
				) : segment}
			</Button>
		)
	}
}

export default Buttons
