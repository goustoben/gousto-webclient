import { shallow, mount } from 'enzyme'
import React from 'react'

import sinon from 'sinon'
import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import Immutable from 'immutable'
import DeliverySlot from 'BoxSummary/DeliverySlot/DeliverySlot'

import { Button } from 'goustouicomponents'
import { Segment } from 'goustouicomponents'

import Calendar from 'Form/Calendar'
import SlotPicker from 'BoxSummary/DeliverySlot/SlotPicker/SlotPicker'

import DropdownInput from 'Form/Dropdown'

describe('DeliverySlot', function() {
	let wrapper
	let boxSummaryVisibilityChangeSpy
	let setTempDateSpy
	let setTempOrderId
	let clock
	let userOrders

	let deliveryDays = Immutable.fromJS([
		{
			date: '2017-01-01',
			slots: [
				{
					deliveryStartTime: '17:00:00',
					deliveryEndTime: '18:00:00',
					price: 1.99,
					id: '1234567-uuid-value',
					whenCutoff: '2018-01-01',
				},
			],
		},
	])

	beforeEach(function() {
		clock = sinon.useFakeTimers(new Date(Date.UTC(2016, 12, 26, 8, 30, 50, 0)).getTime())
		boxSummaryVisibilityChangeSpy = sinon.spy()
		setTempDateSpy = sinon.spy()
		setTempOrderId = sinon.spy()
		wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
	})

	afterEach(function() {
		clock.restore()
	})

	it('should return a div', function() {
		expect(wrapper.type()).to.equal('div')
	})

	it('should render 1 Calendar', function() {
		expect(wrapper.find(Calendar).length).to.equal(1)
	})

	it('should render 1 SlotPicker', function() {
		expect(wrapper.find(SlotPicker).length).to.equal(1)
	})

	it('should render 2 Buttons', function() {
		expect(wrapper.find(Button).length).to.equal(2)
	})

	it('should not render a link if no prevDate is set', function() {
		expect(wrapper.find('a').length).to.equal(0)
	})

	it('should render a link if prevDate is set', function() {
		wrapper = mount(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} prevDate="test" setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		expect(wrapper.find('a').length).to.equal(1)
	})

	it('should call the clearPostcode prop function when the first Button is clicked', function() {
		const clearPostcodeSpy = sinon.spy()
		wrapper = shallow(<DeliverySlot tempDate="2017-01-01" clearPostcode={clearPostcodeSpy} deliveryDays={deliveryDays} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		wrapper.find(Segment).at(0).simulate('click')
		expect(clearPostcodeSpy).to.have.been.called
	})

	it('should call the deliverySlotChosen prop function when the second Button is clicked', function() {
		const boxSummaryNextSpy = sinon.spy()
		wrapper = shallow(<DeliverySlot tempDate="2017-01-01" boxSummaryNext={boxSummaryNextSpy} deliveryDays={deliveryDays} boxSummaryVisibilityChange={boxSummaryVisibilityChangeSpy} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		wrapper.find(Button).at(1).simulate('click')
		expect(boxSummaryNextSpy).to.have.been.called
	})

	it('should show the second button text as "Continue"', function() {
		wrapper = mount(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		expect(wrapper.find(Button).at(2).text()).to.equal('Continue')
	})

	it('should map the deliveryDays prop through to the Calendar', function() {
		wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		expect(wrapper.find(Calendar).at(0).prop('dates').length).to.equal(deliveryDays.size)
	})

	it('should map the slots through to the SlotPicker', function() {
		wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		expect(Object.keys(wrapper.find(SlotPicker).at(0).prop('slots')).length).to.equal(deliveryDays.size)
	})

	describe('when the menuPending prop is set', function() {
		beforeEach(function() {
			wrapper = shallow(<DeliverySlot tempDate="2017-01-01" menuPending deliveryDays={deliveryDays} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		})

		it('should show the second button to be pending', function() {
			expect(wrapper.find(Button).at(1).prop('pending')).to.equal(true)
		})
	})

	describe('when the prevSlotId prop is set', function() {
		beforeEach(function() {
			wrapper = mount(<DeliverySlot tempDate="2017-01-01" prevSlotId="something" deliveryDays={deliveryDays} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		})

		it('should show the second button text as differentliy', function() {
			expect(wrapper.find(Segment).at(5).text()).to.equal('Update Delivery Date')
		})
	})

	it('should render a link with "Cancel" in it which calls the basketRestorePreviousValues prop on click', function() {
		const basketRestorePreviousValuesSpy = sinon.spy()
		wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} prevDate="test" basketRestorePreviousValues={basketRestorePreviousValuesSpy} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		expect(wrapper.find('a').text()).to.equal('Cancel')
		wrapper.find('a').simulate('click')
		expect(basketRestorePreviousValuesSpy).to.have.been.called
	})

	describe('with the disableNewDatePicker prop set to true', function() {
		beforeEach(function() {
			wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} disableNewDatePicker setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
		})

		it('should render 2 DropdownInputs', function() {
			expect(wrapper.find(DropdownInput).length).to.equal(2)
		})

		it('should show the second button text as "Continue"', function() {
			wrapper = mount(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} disableNewDatePicker setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
			expect(wrapper.find(Button).at(1).text()).to.equal('Continue')
		})

		it('should map the deliveryDays prop through to the first DropdownInput', function() {
			expect(wrapper.find(DropdownInput).at(0).prop('options').length).to.equal(deliveryDays.size)
		})

		describe('when the prevSlotId prop is set', function() {
			beforeEach(function() {
				wrapper = mount(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} prevSlotId="something" disableNewDatePicker setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
			})

			it('should show the second button text as differentliy', function() {
				expect(wrapper.find(Segment).at(3).text()).to.equal('Update Delivery Date')
			})
		})
	})

	describe('with the disableOnDelivery prop set to true', function() {

		const slots = [
			{
				deliveryStartTime: '17:00:00',
				deliveryEndTime: '18:00:00',
				price: 1.99,
				id: '1234567-uuid-value',
				whenCutoff: '2018-01-01',
			},
		]

		beforeEach(function() {
			userOrders = Immutable.fromJS([
				{
					id: 'an-order-id-123',
					recipeItems: ['om', 'nom', 'nom'],
					deliveryDate: '2017-01-02',
				},
			])
		})

		it('should disable delivery day if no alternate provided', function() {
			deliveryDays = Immutable.fromJS([
				{ date: '2017-01-01', slots },
				{ date: '2017-01-02', slots },
			])
			wrapper = shallow(<DeliverySlot
				tempDate="2017-01-01"
				deliveryDays={deliveryDays}
				userOrders={userOrders}
				setTempDate={setTempDateSpy}
				setTempOrderId={setTempOrderId} />
			)
			const date = wrapper.find(Calendar).at(0).prop('dates')
			expect(date[0].disabled).to.equal(true)
			expect(date[1].disabled).to.equal(true)
		})

		it('should enable delivery day if alternate is null', function() {
			deliveryDays = Immutable.fromJS([
				{ date: '2017-01-01', alternateDeliveryDay: null, slots },
				{ date: '2017-01-02', alternateDeliveryDay: null, slots },
			])
			wrapper = shallow(<DeliverySlot
				tempDate="2017-01-01"
				deliveryDays={deliveryDays}
				userOrders={userOrders}
				setTempDate={setTempDateSpy}
				setTempOrderId={setTempOrderId} />
			)
			const date = wrapper.find(Calendar).at(0).prop('dates')
			expect(date[0].disabled).to.equal(false)
			expect(date[1].disabled).to.equal(false)
		})

		it('should disable delivery day with disableOnDelivery tag', function() {
			deliveryDays = Immutable.fromJS([
				{ date: '2017-01-01', alternateDeliveryDay: null, slots },
				{ date: '2017-01-02', alternateDeliveryDay: null, slots },
			])
			wrapper = shallow(<DeliverySlot
				tempDate="2017-01-01"
				deliveryDays={deliveryDays}
				userOrders={userOrders}
				setTempDate={setTempDateSpy}
				setTempOrderId={setTempOrderId}
				disableOnDelivery={true} />
			)
			const date = wrapper.find(Calendar).at(0).prop('dates')
			expect(date[0].disabled).to.equal(false)
			expect(date[1].disabled).to.equal(true)
		})

	})

	it('should select given delivery day', function() {
		let deliverySlotChosenSpy = sinon.spy()
		deliveryDays = Immutable.fromJS([
			{
				date: '2017-01-01',
				slots: [
					{
						deliveryStartTime: '17:00:00',
						deliveryEndTime: '18:00:00',
						price: 1.99,
						id: '1234567-uuid-value',
						whenCutoff: '2018-01-01',
					},
				],
			},
			{
				date: '2017-01-02',
				isDefault: true,
				slots: [
					{
						deliveryStartTime: '17:00:00',
						deliveryEndTime: '18:00:00',
						price: 1.99,
						id: '1234567-uuid-value',
						whenCutoff: '2018-01-01',
					},
				],
			},
		])

		wrapper = shallow(<DeliverySlot tempDate="2017-01-01" tempDate="2017-01-02" deliveryDays={deliveryDays} prevDate="test" disableNewDatePicker setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} deliverySlotChosen={deliverySlotChosenSpy} />)
		expect(wrapper.find(DropdownInput).at(0).node.props.value).to.equal('2017-01-02')
	})

	describe('with an order selected', function() {
		let pushOrderEditSpy
		let deliverySlotChosen

		beforeEach(function() {
			deliveryDays = Immutable.fromJS([
				{
					date: '2017-01-01',
					slots: [
						{
							deliveryStartTime: '17:00:00',
							deliveryEndTime: '18:00:00',
							price: 1.99,
							id: '1234567-uuid-value',
							whenCutoff: '2018-01-01',
						},
					],
				},
				{
					date: '2017-01-02',
					isDefault: true,
					slots: [
						{
							deliveryStartTime: '17:00:00',
							deliveryEndTime: '18:00:00',
							price: 1.99,
							id: '1234567-uuid-value',
							whenCutoff: '2018-01-01',
						},
					],
				},
			])
			userOrders = Immutable.fromJS([
				{
					id: 'an-order-id-123',
					recipeItems: ['om', 'nom', 'nom'],
					deliveryDate: '2017-01-01',
				},
				{
					id: 'another-order-id-456',
					recipeItems: [],
					deliveryDate: '2017-01-01',
				},
			])
			pushOrderEditSpy = sinon.spy()
			boxSummaryVisibilityChangeSpy = sinon.spy()
			deliverySlotChosen = sinon.spy()
			wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} prevDate="test" pushOrderEdit={pushOrderEditSpy} boxSummaryVisibilityChange={boxSummaryVisibilityChangeSpy} userOrders={userOrders} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} deliverySlotChosen={deliverySlotChosen} />)
			wrapper.instance().handleDateChange('2017-01-01', 'another-order-id-456')
		})

		it('should not disable the button', function() {
			expect(wrapper.find(Button).at(0).disabled).to.deep.equal(undefined)
		})

		it('should have the button text be Choose Recipes if the order is empty', function() {
			expect(wrapper.text().indexOf('Choose Recipes') > -1)
		})

		describe('which has recipes', function() {
			beforeEach(function() {
				wrapper.instance().handleDateChange('2017-01-01', 'an-order-id-123')
			})
			it('should have the button text be Edit Recipes', function() {
				expect(wrapper.text().indexOf('Edit Recipes') > -1)
			})
			describe('with recipes already in the basket', function() {
				beforeEach(function() {
					wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} prevDate="test" pushOrderEdit={pushOrderEditSpy} boxSummaryVisibilityChange={boxSummaryVisibilityChangeSpy} userOrders={userOrders} basketRecipeNo={5} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} />)
				})
				it('should show a warning message', function() {
					expect(wrapper.text().indexOf('You have an existing order for') > -1)
				})
			})
		})

		it('should call the boxSummaryNext function prop on button click', function() {
			const boxSummaryNextSpy = sinon.spy()
			wrapper = shallow(<DeliverySlot tempDate="2017-01-01" deliveryDays={deliveryDays} prevDate="test" boxSummaryNext={boxSummaryNextSpy} userOrders={userOrders} setTempDate={setTempDateSpy} setTempOrderId={setTempOrderId} deliverySlotChosen={deliverySlotChosen} tempOrderId="an-order-id-123" />)
			wrapper.find(Button).at(1).simulate('click')
			expect(boxSummaryNextSpy.callCount).to.equal(1)
		})
	})

	describe('with availableDaysOnly', function() {

		const slots = [
			{
				deliveryStartTime: '17:00:00',
				deliveryEndTime: '18:00:00',
				price: 1.99,
				id: '1234567-uuid-value',
				whenCutoff: '2018-01-01',
			},
		]

		it('should disable days not listed in availableDaysOnly', function() {
			deliveryDays = Immutable.fromJS([
				{ date: '2017-01-01', alternateDeliveryDay: null, slots },
				{ date: '2017-01-02', alternateDeliveryDay: null, slots },
				{ date: '2017-01-03', alternateDeliveryDay: null, slots },
				{ date: '2017-01-04', alternateDeliveryDay: null, slots },
			])
			const availableDaysOnly = Immutable.fromJS([
				'2017-01-02',
				'2017-01-03',
			])
			const wrapper = shallow(<DeliverySlot
				availableDaysOnly={availableDaysOnly}
				deliveryDays={deliveryDays}
				setTempDate={setTempDateSpy}
				setTempOrderId={setTempOrderId} />
			)
			const date = wrapper.find(Calendar).at(0).prop('dates')
			expect(date[0].disabled).to.equal(true)
			expect(date[1].disabled).to.equal(false)
			expect(date[2].disabled).to.equal(false)
			expect(date[3].disabled).to.equal(true)
		})

	})

})
