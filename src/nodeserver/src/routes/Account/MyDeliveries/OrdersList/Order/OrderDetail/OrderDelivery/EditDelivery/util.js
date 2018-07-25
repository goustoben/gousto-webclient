import humanTimeFormat from 'utils/timeFormat'

export const DEFAULT_MESSAGE_ID = 'default-message'

const countRecipes = (recipes) => {
	const recipesCount = {}
	recipes.forEach(recipe => {
		const recipeId = recipe.get('recipeId')
		if (recipesCount[recipeId]) {
			recipesCount[recipeId]++
		} else {
			recipesCount[recipeId] = 1
		}
	})

	return recipesCount
}

const slotHasStock = (slotWhenCutoff, recipesStock, recipesCount, portionsPerRecipe) =>
	Object.entries(recipesCount).every(([recipeId, recipeCount]) => {
		const recipeStockInSlot = recipesStock.find(recipeStock => recipeStock.recipeId === recipeId && recipeStock.takeUntil === slotWhenCutoff)
		if (!recipeStockInSlot) {
			return false
		}

		return recipeStockInSlot.stockAmount >= recipeCount * portionsPerRecipe || recipeStockInSlot.committed === false
	})

const markDeliveryDaysAndSlotsWithoutStock = (orderDeliveryDays, orderRecipes, recipesStock, portionsPerRecipe) => {
	const recipesCount = countRecipes(orderRecipes)
	const days = orderDeliveryDays.toJS()
	Object.entries(days).forEach(([dayIndex, day]) => {
		day.slots.forEach((slot, slotIndex) => {
			if (!slotHasStock(slot.whenCutoff, recipesStock, recipesCount, portionsPerRecipe)) {
				days[dayIndex].slots[slotIndex].noStock = true
			}
		})
		if (day.slots.every(slot => slot.noStock)) {
			days[dayIndex].noStock = true
		}
	})

	return days
}

const getTakenDatesIds = (orderDeliveryDays, orders, orderCoreDeliveryDayId) => {
	const takenDatesIds = []
	orders
		.filter(_order =>
			_order.get('coreDeliveryDayId') !== orderCoreDeliveryDayId &&
			orderDeliveryDays.some(orderDay => orderDay.get('coreDayId') === _order.get('coreDeliveryDayId'))
		)
		.valueSeq().forEach(_order => {
			takenDatesIds.push(_order.get('coreDeliveryDayId'))
		})

	return takenDatesIds
}

const getDeliveryDaysAndSlotsOptions = (orderDeliveryDays, orderRecipes, recipesStock, portionsPerRecipe, orderCoreDeliveryDayId, orderDeliverySlotId, orders) => {
	const takenDatesIds = getTakenDatesIds(orderDeliveryDays, orders, orderCoreDeliveryDayId)
	const days = markDeliveryDaysAndSlotsWithoutStock(orderDeliveryDays, orderRecipes, recipesStock, portionsPerRecipe)
	const daysWithStock = Object.entries(days).filter(([, day]) =>
		(!day.noStock && day.alternateDeliveryDay === null) || day.coreDayId === orderCoreDeliveryDayId
	)
	const deliveryDaysOptions = [{
		value: DEFAULT_MESSAGE_ID,
		label: 'Please select a delivery date',
		disabled: false,
		icon: '',
	}]
	deliveryDaysOptions.push(...daysWithStock.map(([, day]) => {
		const isDateTaken = takenDatesIds.some(takenDate => takenDate === day.coreDayId)

		return {
			value: day.coreDayId,
			label: day.date,
			disabled: isDateTaken,
			icon: isDateTaken ? 'truck' : '',
		}
	}))
	const slotsOptions = {}
	const defaultSlotOption = {
		value: DEFAULT_MESSAGE_ID,
		coreSlotId: null,
		label: 'Please select a delivery slot',
		subLabel: '',
		isDefaultSlot: false,
	}
	slotsOptions[DEFAULT_MESSAGE_ID] = [defaultSlotOption]
	daysWithStock.forEach(([, day]) => {
		slotsOptions[day.coreDayId] = [defaultSlotOption]
		slotsOptions[day.coreDayId].push(...day.slots
			.filter(slot => !slot.noStock || (slot.id === orderDeliverySlotId && day.coreDayId === orderCoreDeliveryDayId))
			.map(slot => (
				{
					value: slot.id, // uuid
					coreSlotId: slot.coreSlotId,
					label: `${humanTimeFormat(slot.deliveryStartTime, 'hour')} - ${humanTimeFormat(slot.deliveryEndTime, 'hour')}`,
					subLabel: slot.deliveryPrice === '0.00' ? 'Free' : `£${slot.deliveryPrice}`,
					isDefaultSlot: slot.isDefault,
				}
			))
		)
	})

	return { deliveryDaysOptions, slotsOptions }
}

export default { getDeliveryDaysAndSlotsOptions }
