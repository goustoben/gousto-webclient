
import React from 'react'
import { shallow } from 'enzyme'
import EditDeliveryDateContainer from '../../../../js/my-deliveries/components/edit-delivery-date/EditDeliveryDateContainer'
import EditDeliveryDate from '../../../../js/my-deliveries/components/edit-delivery-date/EditDeliveryDate'
import moment from 'moment'

describe('EditDeliveryDateContainer', () => {
	let testData

	beforeEach(() => {
		testData = {
			orderRecipes: [],
			orderId: '5',
			periodId: '44',
			initialDeliveryDate: '2016-09-02',
			initialDeliverySlot: {
				id: 2,
				delivery_start: '08:00:00',
				delivery_end: '17:59:59',
			},
			shippingPostcode: 'W3',
			cutoffDatetime: '',
			setOrder: () => {},
		}
	})

	it('should return a <EditDeliveryDate>', () => {
		const wrapper = shallow(<EditDeliveryDateContainer {...testData} />)
		expect(wrapper.type()).toEqual(EditDeliveryDate)
	})

	it('should convert existingOrders prop into EditDeliveryDate takenDates prop', () => {
		const wrapper = shallow(
			<EditDeliveryDateContainer
				{...testData}
				existingOrders={[
					{ id: '5', delivery_date: '2016-05-06T00:00:00+00:00' },
					{ id: '6', delivery_date: '2016-05-07T00:00:00+00:00' },
					{ id: '7', delivery_date: '2016-05-08T00:00:00+00:00' },
				]}
			/>
		)
		expect(wrapper.find(EditDeliveryDate).prop('takenDates')).toEqual([
			'2016-05-07T00:00:00+00:00',
			'2016-05-08T00:00:00+00:00',
		])
	})

	describe('handleSetDay', () => {
		it('should return a function which when called calls setDay', () => {
			const wrapper = shallow(<EditDeliveryDateContainer {...testData} />)
			const inst = wrapper.instance()
			const day = {
				slots: [
					{ id: 1 },
					{ id: 2 },
				],
			}
			const daySetter = inst.handleSetDay(day)
			daySetter()

			expect(inst.state.selectedDay).toEqual(day)
			expect(inst.state.slots).toEqual(day.slots)
			expect(inst.state.selectedSlot).toEqual(day.slots[0])
		})
	})

	describe('handleSetSlot', () => {
		it('should return a function which when called calls setSlot', () => {
			const wrapper = shallow(<EditDeliveryDateContainer {...testData} />)
			const inst = wrapper.instance()
			const slot = { id: 1 }

			const slotSetter = inst.handleSetSlot(slot)
			slotSetter()
			expect(inst.state.selectedSlot).toEqual(slot)
		})
	})

	describe('fetchData', () => {
		let wrapper
		let inst
		let days
		let stock
		let allSlots

		beforeEach((done) => {
			wrapper = shallow(<EditDeliveryDateContainer {...testData} />)
			inst = wrapper.instance()
			days = [
				{
					id: 1,
					date: '2016-09-02',
					slots: [
						{ core_slot_id: 1 },
						{ core_slot_id: 2 },
					],
				},
				{
					id: 2,
					date: '2016-09-03',
					slots: [
						{ core_slot_id: 3 },
						{ core_slot_id: 4 },
					],
				},
			]

			stock = [
				{ committed: true, portions_2: 1, slot_number: 1, recipe_id: 199 },
				{ committed: true, portions_4: 1, slot_number: 1, recipe_id: 199 },
			]
			allSlots = [
				{ number: 1, id: 88 },
				{ number: 2, id: 44 },
				{ number: 3, id: 55 },
			]
			spyOn(inst, 'fetchOrderDays').and.returnValue(Promise.resolve(days))
			spyOn(inst, 'fetchStock').and.returnValue(Promise.resolve(stock))
			spyOn(inst, 'fetchAllSlots').and.returnValue(Promise.resolve(allSlots))
			inst.fetchData()
			setTimeout(done, 1)
		})

		it('should set state.loading to false', () => {
			expect(inst.state.loading).toEqual(false)
		})
		it('should set state.days to the result of fetchOrderDays', () => {
			expect(inst.state.days).toEqual(days)
		})
		it('should set state.slots the slots of the day', () => {
			expect(inst.state.slots).toEqual(days[0].slots)
		})
		it('should set state.stock with the result from the fetchStock call', () => {
			expect(inst.state.stock).toEqual(stock)
		})
		it('should set state.allSlots with the result from the fetchStock fetchAllSlots', () => {
			expect(inst.state.allSlots).toEqual(allSlots)
		})
	})

	describe('isSlotCutoffAfterNow', () => {
		let wrapper
		let inst
		beforeEach(() => {
			wrapper = shallow(<EditDeliveryDateContainer {...testData} />)
			inst = wrapper.instance()
		})
		it('should return true is a slot with a when_cutoff is in the future', () => {
			expect(inst.isSlotCutoffAfterNow({ when_cutoff: moment().add(1, 'hour').toISOString() })).toEqual(true)
		})
		it('should return true is a slot with a when_cutoff is in the future', () => {
			expect(inst.isSlotCutoffAfterNow({ when_cutoff: moment().subtract(1, 'hour').toISOString() })).toEqual(false)
		})
	})

	describe('getCoreSlotIdsWithStock', () => {
		let wrapper
		let inst
		beforeEach(() => {
			wrapper = shallow(<EditDeliveryDateContainer {...testData} />)
			inst = wrapper.instance()
		})
		it('should return a slots', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
				{ number: 2, id: 44 },
				{ number: 3, id: 55 },
				{ number: 3, id: 22 },
				{ number: 4, id: 11 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
				{ itemable_id: 177, quantity: 2 },
				{ itemable_id: 144, quantity: 4 },
			] })
			inst.state.stock = [
				{ committed: true, portions_2: 10, slot_number: 1, recipe_id: 199 },
				{ committed: true, portions_2: 10, slot_number: 1, recipe_id: 177 },
				{ committed: true, portions_4: 10, slot_number: 1, recipe_id: 144 },

				{ committed: true, portions_2: 10, slot_number: 2, recipe_id: 199 },
				{ committed: true, portions_2: 10, slot_number: 2, recipe_id: 177 },
				{ committed: true, portions_4: 10, slot_number: 2, recipe_id: 144 },

				{ committed: false, portions_4: 10, slot_number: 1, recipe_id: 144 },
				{ committed: true, portions_4: 10, slot_number: 3, recipe_id: 144 },
				{ committed: true, portions_2: 10, slot_number: 2, recipe_id: 130 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([88, 44])
		})
		it('should return a slot if the order is not commit regardless of stock', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
			] })
			inst.state.stock = [
				{ committed: false, portions_2: -222, slot_number: 1, recipe_id: 199 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([88])
		})
		it('should return a slot if the stock is commit and has enough stock', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
			] })
			inst.state.stock = [
				{ committed: true, portions_2: 1, slot_number: 1, recipe_id: 199 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([88])
		})
		it('should NOT return a slot if the stock is commit and there isnt enough stock', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
				{ itemable_id: 150, quantity: 4 },
			] })
			inst.state.stock = [
				{ committed: true, portions_2: 0, slot_number: 1, recipe_id: 199 },
				{ committed: true, portions_4: 0, slot_number: 1, recipe_id: 199 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([])
		})
		it('should NOT return a slot if there are no stock records', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
				{ itemable_id: 150, quantity: 4 },
			] })
			inst.state.stock = [
				{ committed: false, portions_4: 100, portions_2: 100, slot_number: 1, recipe_id: 1 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([])
		})
		it('should return a slot if theres no orders', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
			] })
			inst.state.stock = [
				{ committed: true, portions_2: 1, slot_number: 1, recipe_id: 199 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([88])
		})
		it('should NOT return a slot if there are 2 recipes of the same porition but only 1 stock', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
				{ itemable_id: 199, quantity: 2 },
			] })
			inst.state.stock = [
				{ committed: true, portions_2: 1, slot_number: 1, recipe_id: 199 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([])
		})
		it('should return a slot if there are 2 recipes of different porition with only 1 stock each', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
				{ itemable_id: 199, quantity: 4 },
			] })
			inst.state.stock = [
				{ committed: true, portions_2: 1, slot_number: 1, recipe_id: 199 },
				{ committed: true, portions_4: 1, slot_number: 1, recipe_id: 199 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([88])
		})
		it('should return a slot if there are 2 recipes of the same porition with only 2 stock', () => {
			inst.state.allSlots = [
				{ number: 1, id: 88 },
			]
			wrapper.setProps({ orderRecipes: [
				{ itemable_id: 199, quantity: 2 },
				{ itemable_id: 199, quantity: 2 },
			] })
			inst.state.stock = [
				{ committed: true, portions_2: 2, slot_number: 1, recipe_id: 199 },
			]

			expect(inst.getCoreSlotIdsWithStock()).toEqual([88])
		})
	})


	describe('getSelectableDays', () => {
		let wrapper
		let inst
		beforeEach(() => {
			wrapper = shallow(<EditDeliveryDateContainer {...testData} />)
			inst = wrapper.instance()
		})

		it('should return only return days which have stock', () => {
			spyOn(inst, 'getCoreSlotIdsWithStock').and.returnValue([
				11, 22, 33, 44,
			])
			const validCutoff = moment().add(1, 'hour').toISOString()

			inst.state.days = [
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 11, when_cutoff: validCutoff }, { core_slot_id: 33, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 22, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 99, when_cutoff: validCutoff }] },
			]
			expect(inst.getSelectableDays()).toEqual([
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 11, when_cutoff: validCutoff }, { core_slot_id: 33, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 22, when_cutoff: validCutoff }] },
			])
		})
		it('should return only return days dont have an alternate_delivery_day', () => {
			spyOn(inst, 'getCoreSlotIdsWithStock').and.returnValue([
				11, 22, 33, 44,
			])
			const validCutoff = moment().add(1, 'hour').toISOString()

			inst.state.days = [
				{ alternate_delivery_day: {}, slots: [{ core_slot_id: 11, when_cutoff: validCutoff }, { core_slot_id: 33, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 22, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 99, when_cutoff: validCutoff }] },
			]
			expect(inst.getSelectableDays()).toEqual([
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 22, when_cutoff: validCutoff }] },
			])
		})

		it('should only return days which have slot with a cutoff dates in the future', () => {
			spyOn(inst, 'getCoreSlotIdsWithStock').and.returnValue([
				11, 22, 33, 44,
			])
			const validCutoff = moment().add(1, 'hour').toISOString()
			const invalidCutoff = moment().subtract(1, 'hour').toISOString()

			inst.state.days = [
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 11, when_cutoff: invalidCutoff }, { core_slot_id: 33, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 22, when_cutoff: invalidCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 33, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 99, when_cutoff: validCutoff }] },
			]
			expect(inst.getSelectableDays()).toEqual([
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 11, when_cutoff: invalidCutoff }, { core_slot_id: 33, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 33, when_cutoff: validCutoff }] },
			])
		})

		it('should return only days which have slot with a cutoff dates in the future', () => {
			spyOn(inst, 'getCoreSlotIdsWithStock').and.returnValue([
				11, 22, 33, 44,
			])
			const validCutoff = moment().add(1, 'hour').toISOString()
			const invalidCutoff = moment().subtract(1, 'hour').toISOString()

			inst.state.days = [
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 11, when_cutoff: invalidCutoff }, { core_slot_id: 33, when_cutoff: validCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 22, when_cutoff: invalidCutoff }] },
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 99, when_cutoff: validCutoff }] },
			]
			expect(inst.getSelectableDays()).toEqual([
				{ alternate_delivery_day: null, slots: [{ core_slot_id: 11, when_cutoff: invalidCutoff }, { core_slot_id: 33, when_cutoff: validCutoff }] },
			])
		})

		it('should always return the selectedDay in the array', () => {
			spyOn(inst, 'getCoreSlotIdsWithStock').and.returnValue([
			])
			const invalidCutoff = moment().add(1, 'hour').toISOString()

			inst.state.days = [
				{ alternate_delivery_day: {}, slots: [{ core_slot_id: 22, when_cutoff: invalidCutoff }] },
			]
			inst.state.selectedDay = inst.state.days[0]
			expect(inst.getSelectableDays()).toEqual([
				{ alternate_delivery_day: {}, slots: [{ core_slot_id: 22, when_cutoff: invalidCutoff }] },
			])
		})
	})
})
