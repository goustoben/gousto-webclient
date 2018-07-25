
import React from 'react'
import { shallow } from 'enzyme'
import PreviewDeliveryDateContainer from '../../../../js/my-deliveries/components/edit-delivery-date/PreviewDeliveryDateContainer'
import EditDeliveryDateContainer from '../../../../js/my-deliveries/components/edit-delivery-date/EditDeliveryDateContainer'
import PreviewDeliveryDate from '../../../../js/my-deliveries/components/edit-delivery-date/PreviewDeliveryDate'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('PreviewDeliveryDateContainer', () => {
	let testOrder
	beforeEach(() => {
		testOrder = {
			id: '1',
			delivery_date: '1990-01-12',
			delivery_slot: {
				delivery_start: '08:00:00',
				delivery_end: '09:00:00',
			},
			shipping_address: {
				postcode: 'W3 7UP',
			},
			recipe_items: [],
		}
	})

	it('should return a <PreviewDeliveryDate>', () => {
		const wrapper = shallow(<PreviewDeliveryDateContainer
			initialOrder={testOrder}
		/>)
		expect(wrapper.type()).to.equal(PreviewDeliveryDate)
	})

	it('should pass orders props to <EditDeliveryDateContainer>', () => {
		const orders = [
			{ id: 5, delivery_date: '19-01-1998' },
			{ id: 6, delivery_date: '19-01-1999' },
		]
		const wrapper = shallow(<PreviewDeliveryDateContainer
			initialOrder={testOrder}
			orders={orders}
		/>)
		const result = wrapper.find(EditDeliveryDateContainer)
		expect(result.prop('existingOrders')).to.deep.equal(orders)
	})

	it('should pass orderRecipes props to <EditDeliveryDateContainer>', () => {
		const recipeItems = [
			{ itemable_id: 'a111', quantity: 2 },
			{ itemable_id: 'b222', quantity: 2 },
		]
		testOrder.recipe_items = recipeItems
		const wrapper = shallow(<PreviewDeliveryDateContainer
			initialOrder={testOrder}
		/>)
		const result = wrapper.find(EditDeliveryDateContainer)
		expect(result.prop('orderRecipes')).to.deep.equal(recipeItems)
	})

	describe('setOrder', () => {
		it('should merge the order delta with the existing order and set it in the state', () => {
			const wrapper = shallow(<PreviewDeliveryDateContainer
				initialOrder={testOrder}
				setOrder={() => {}}
			/>)
			const inst = wrapper.instance()
			inst.setOrder({
				...testOrder,
				newAttrbute: 4,
			})
			spyOn(inst, 'setState')
			expect(inst.state.order).to.deep.equal({
				...testOrder,
				newAttrbute: 4,
			})
		})
		it('should pass the order up to props.setOrder', () => {
			const setOrderSpy = sinon.spy()
			const wrapper = shallow(<PreviewDeliveryDateContainer
				initialOrder={testOrder}
				setOrder={setOrderSpy}
			/>)
			const inst = wrapper.instance()
			inst.setOrder({
				newAttrbute: 4,
			})
			expect(setOrderSpy).to.have.been.calledWith({
				...testOrder,
				newAttrbute: 4,
			})
		})
	})

	describe('toggleEdit', () => {
		it('should flip the value of isEditingDate', () => {
			const wrapper = shallow(<PreviewDeliveryDateContainer initialOrder={testOrder} />)
			const inst = wrapper.instance()
			inst.state.isEditingDate = false
			expect(wrapper.find(EditDeliveryDateContainer).prop('isEditingDate')).to.be.false
			inst.toggleEdit()
			expect(inst.state.isEditingDate).to.be.true
			inst.toggleEdit()
			expect(inst.state.isEditingDate).to.be.false
			inst.toggleEdit()
			expect(inst.state.isEditingDate).to.be.true
		})
	})
})
