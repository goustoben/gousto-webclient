import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import React from 'react'
import DropdownInput from 'Form/Dropdown'
import Button from 'routes/Signup/Button'
import { Segment } from 'goustouicomponents'

import DeliveryStep from 'routes/Signup/Steps/Delivery/DeliveryStep'
import Image from 'routes/Signup/Image'

describe('DeliveryStep', function() {
	let wrapper
	let boxSummaryDeliveryDays
	let tempDate
	let tempSlotId
	let menuFetchDataPending
	let setTempSlotIdSpy
	let setTempDateSpy
	let boxSummaryDeliverySlotChosenSpy
	let nextSpy

	beforeEach(function() {
		menuFetchDataPending = false
		tempDate = '2017-01-01'
		tempSlotId = '123-123-123'
		boxSummaryDeliveryDays = Immutable.fromJS([
			{
				date: '2017-01-01',
				slots: [
					{
						deliveryStartTime: '17:00:00',
						deliveryEndTime: '18:00:00',
						deliveryPrice: 1.99,
						id: '123-123-123',
						whenCutoff: '2018-01-01',
						coreSlotId: 5,
					},
				],
			},
			{
				date: '2017-01-02',
				slots: [
					{
						deliveryStartTime: '17:00:00',
						deliveryEndTime: '18:00:00',
						deliveryPrice: 1.99,
						id: '1234567-uuid-value',
						whenCutoff: '2018-01-01',
						coreSlotId: 10,
					},
				],
			},
		])
		setTempSlotIdSpy = sinon.spy()
		setTempDateSpy = sinon.spy()
		boxSummaryDeliverySlotChosenSpy = sinon.stub().returns(new Promise(resolve => resolve()))
		nextSpy = sinon.spy()

		wrapper = shallow(<DeliveryStep
			boxSummaryDeliveryDays={boxSummaryDeliveryDays}
			tempDate={tempDate}
			menuFetchDataPending={menuFetchDataPending}
			tempSlotId={tempSlotId}
			setTempSlotId={setTempSlotIdSpy}
			setTempDate={setTempDateSpy}
			boxSummaryDeliverySlotChosen={boxSummaryDeliverySlotChosenSpy}
			next={nextSpy}
		/>)
	})

	it('should render a span', function() {
		expect(wrapper.type()).to.equal('span')
	})

	it('should render an Image', function() {
		expect(wrapper.find(Image)).to.have.length(1)
	})

	it('should render 2 DropdownInputs', function() {
		expect(wrapper.find(DropdownInput)).to.have.length(2)
	})

	it('should render a Button', function() {
		expect(wrapper.find(Button)).to.have.length(1)
	})

	it('should call boxSummaryDeliverySlotChosen with the tempDate and tempSlotId props and then next when the button is clicked', function() {
		wrapper.find(Button).simulate('click')
		expect(boxSummaryDeliverySlotChosenSpy.calledOnce)
		expect(boxSummaryDeliverySlotChosenSpy.getCall(0).args[0]).to.deep.equal({ date: '2017-01-01', slotId: '123-123-123' })
		expect(nextSpy.calledOnce)
	})

	it('should disable the button if tempDate or tempSlotId are falsey', function() {
		wrapper = shallow(<DeliveryStep
			boxSummaryDeliveryDays={boxSummaryDeliveryDays}
			tempDate={tempDate}
			menuFetchDataPending
			tempSlotId=""
			setTempSlotId={setTempSlotIdSpy}
			setTempDate={setTempDateSpy}
			boxSummaryDeliverySlotChosen={boxSummaryDeliverySlotChosenSpy}
			next={nextSpy}
		/>)
		expect(wrapper.find(Button).prop('disabled'))

		wrapper = shallow(<DeliveryStep
			boxSummaryDeliveryDays={boxSummaryDeliveryDays}
			tempDate=""
			menuFetchDataPending
			tempSlotId={tempSlotId}
			setTempSlotId={setTempSlotIdSpy}
			setTempDate={setTempDateSpy}
			boxSummaryDeliverySlotChosen={boxSummaryDeliverySlotChosenSpy}
			next={nextSpy}
		/>)
		expect(wrapper.find(Button).prop('disabled'))
	})

	it('should mark the button as pending if the menuFetchDataPending is true', function() {
		wrapper = shallow(<DeliveryStep
			boxSummaryDeliveryDays={boxSummaryDeliveryDays}
			tempDate={tempDate}
			menuFetchDataPending
			tempSlotId={tempSlotId}
			setTempSlotId={setTempSlotIdSpy}
			setTempDate={setTempDateSpy}
			boxSummaryDeliverySlotChosen={boxSummaryDeliverySlotChosenSpy}
			next={nextSpy}
		/>)
		expect(wrapper.find(Button).prop('pending'))
	})

	it('should map the tempSlotId and tempDate through to their respective dropdowns values', function() {
		expect(wrapper.find(DropdownInput).at(0).prop('value')).to.equal('2017-01-01')
		expect(wrapper.find(DropdownInput).at(1).prop('value')).to.equal('123-123-123')
	})

	it('should correctly map the boxSummaryDeliveryDays through to the dropdowns', function() {
		expect(wrapper.find(DropdownInput).at(0).prop('options')).to.deep.equal([
			{
				date: '2017-01-01',
				value: '2017-01-01',
				disabled: true,
				label: 'Sun 1 Jan',
			},
			{
				date: '2017-01-02',
				value: '2017-01-02',
				disabled: true,
				label: 'Mon 2 Jan',
			},
		])
		expect(wrapper.find(DropdownInput).at(1).prop('options')).to.deep.equal([
			{
				label: '5pm - 6pm ',
				subLabel: '£1.99',
				value: '123-123-123',
				coreSlotId: 5,
			},
		])
	})

})
