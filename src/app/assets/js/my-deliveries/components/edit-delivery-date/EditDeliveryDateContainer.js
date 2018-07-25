import React, { PropTypes } from 'react'
import { ajaxPromise } from '@fe/gousto-generic'
import CONFIG from '@fe/gousto-config'
import moment from 'moment'

import EditDeliveryDate from './EditDeliveryDate'

class EditDeliveryDateContainer extends React.Component {

	static propTypes = {
		orderId: PropTypes.string.isRequired,
		orderRecipes: PropTypes.arrayOf(PropTypes.shape({
			itemable_id: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
			]),
			quantity: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
			]),
		})).isRequired,
		initialDeliveryDate: PropTypes.string.isRequired,
		initialDeliverySlot: PropTypes.object.isRequired,
		period: PropTypes.shape({
			id: PropTypes.number.isRequired,
			when_start: PropTypes.string.isRequired,
			when_cutoff: PropTypes.string.isRequired,
		}),
		shippingPostcode: PropTypes.string.isRequired,
		setOrder: PropTypes.func.isRequired,
		isEditingDate: PropTypes.bool,
		existingOrders: PropTypes.arrayOf(PropTypes.shape({
			delivery_date: PropTypes.string,
		})),
	}

	static defaultProps = {
		isEditingDate: true,
		existingOrders: [],
	}

	state = {
		days: [],
		slots: [],
		selectedDay: {
			date: this.props.initialDeliveryDate,
		},
		selectedSlot: Object.assign({}, this.props.initialDeliverySlot, {
			delivery_start_time: this.props.initialDeliverySlot.delivery_start,
			delivery_end_time: this.props.initialDeliverySlot.delivery_end,
		}),
		loading: true,
		saving: false,
		stock: [],
		allSlots: [],
	}

	componentDidMount() {
		this.fetchData()
	}

	getOrderRecipesWithCount = () => (
		this.props.orderRecipes
			.reduce((recipesWithCount, recipe) => {
				const recipeWithCount = recipesWithCount.find(_recipeWithCount =>
					_recipeWithCount.itemable_id === recipe.itemable_id &&
					_recipeWithCount.quantity === recipe.quantity
				)

				if (recipeWithCount) {
					recipeWithCount.count++
				} else {
					const newRecipe = Object.assign({}, recipe)
					newRecipe.count = 1
					recipesWithCount.push(newRecipe)
				}

				return recipesWithCount
			}, [])
	)

	/**
	 * Returns a list of core_slot_ids for days which have enough
	 * stock for the user to switch to
	 */
	getCoreSlotIdsWithStock = () => {
		const orderRecipesWithCount = this.getOrderRecipesWithCount()

		return this.state.allSlots
			.filter(slot => (
				orderRecipesWithCount
				.every(recipe => this.isStockForRecipeAtSlot(recipe, slot))
			))
			.map(slot => slot.id)
	}

	/**
	 * Returns a list of days that can be selected based
	 * on the vaiablity of stock and cuttoff
	 */
	getSelectableDays = () => {
		const coreSlotsWithStock = this.getCoreSlotIdsWithStock()

		return this.state.days
			.filter(day =>
				this.state.selectedDay === day ||
				(
					day.slots.some(slot => coreSlotsWithStock.indexOf(parseFloat(slot.core_slot_id)) > -1) &&
					day.alternate_delivery_day === null &&
					day.slots.some(this.isSlotCutoffAfterNow)
				)
			)
	}

	getTakenDates = () => this.props.existingOrders
		.filter((order) => order.id !== this.props.orderId)
		.map((order) => order.delivery_date)

	/**
	 * Checks to see if theres enough stock for a recipie
	 * in that particular stock
	 */
	isStockForRecipeAtSlot = (recipe, slot) => (
		this.state.stock
			.filter(stockItem => stockItem.recipe_id === recipe.itemable_id)
			.filter(stockItem => stockItem.slot_number === slot.number)
			.some(stockItem =>
				stockItem[`portions_${recipe.quantity}`] >= recipe.count || stockItem.committed === false
			)
	)

	fetchData() {
		Promise.all([
			this.fetchOrderDays(),
			this.fetchStock(),
			this.fetchAllSlots(),
		])
		.then(([days, stock, allSlots]) => {
			const selectedDay = days.find(day => this.props.initialDeliveryDate === day.date)
			const slots = selectedDay.slots

			this.setState({
				loading: false,
				days,
				slots,
				stock,
				allSlots,
			})
		})
	}

	fetchOrderDays() {
		const params = {
			filters: {
				cutoff_datetime_from: this.props.period.when_start,
				cutoff_datetime_until: this.props.period.when_cutoff,
			},
			sort: 'date',
			direction: 'asc',
			postcode: this.props.shippingPostcode,
		}

		return ajaxPromise(CONFIG.DELIVERIES.ROUTES.DELIVERY_DAYS, 'GET', params)
	}

	fetchStock() {
		const params = {
			period_id: this.props.period.id,
		}

		return ajaxPromise(CONFIG.CORE.ROUTES.STOCK_RECIPE, 'GET', params)
	}

	fetchAllSlots() {
		return ajaxPromise(CONFIG.CORE.ROUTES.DELIVERY_SLOTS, 'GET')
	}

	updateOrderDate = () => {
		this.setState({ error: '', saving: true })
		const params = {
			delivery_slot_id: this.state.selectedSlot.core_slot_id,
		}

		ajaxPromise(`${CONFIG.CORE.ROUTES.ORDER}${this.props.orderId}`, 'PUT', params)
		.then(result => {
			this.setState({ saving: false })
			this.props.setOrder(result)
		})
		.catch(err => {
			this.setState({ error: err, saving: false })
		})
	}

	handleSetDay = (day) => () => {
		this.setState({
			slots: day.slots,
			selectedDay: day,
			selectedSlot: day.slots[0],
		})
	}

	handleSetSlot = (slot) => () => {
		this.setState({
			selectedSlot: slot,
		})
	}

	isSlotCutoffAfterNow = (slot) => (moment(slot.when_cutoff).isAfter())

	render() {
		if (!this.props.isEditingDate) {
			return <span />
		}

		return (
			<EditDeliveryDate
				days={this.getSelectableDays()}
				slots={this.state.slots}
				selectedDay={this.state.selectedDay}
				selectedSlot={this.state.selectedSlot}
				handleSetDay={this.handleSetDay}
				handleSetSlot={this.handleSetSlot}
				updateOrderDate={this.updateOrderDate}
				takenDates={this.getTakenDates()}
				error={this.state.error}
				loading={this.state.loading}
				saving={this.state.saving}
			/>
		)
	}
}

export default EditDeliveryDateContainer
