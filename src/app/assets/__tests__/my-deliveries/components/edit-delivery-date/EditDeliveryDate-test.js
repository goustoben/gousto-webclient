
import React from 'react'
import { shallow } from 'enzyme'
import EditDeliveryDate from '../../../../js/my-deliveries/components/edit-delivery-date/EditDeliveryDate'
import Dropdown from '../../../../js/my-deliveries/components/edit-delivery-date/Dropdown'
import { Button } from '@fe/gousto-generic'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('EditDeliveryDate', () => {
	let testData

	beforeEach(() => {
		testData = {
			selectedDay: {
				date: '2016-05-06',
			},
			selectedSlot: {
				delivery_start_time: '08:00:00',
				delivery_end_time: '17:59:59',
			},
			days: [],
			slots: [],
		}
	})


	it('should return a <div>', () => {
		const wrapper = shallow(<EditDeliveryDate {...testData} />)
		expect(wrapper.type()).to.equal('div')
	})

	it('should set whether days dropdown is disabled from takendays prop', () => {
		const wrapper = shallow(
			<EditDeliveryDate
				{...testData}
				takenDates={['2016-05-07T00:00:00+00:00', '2016-05-08T00:00:00+00:00']}
				days={[
					{ date: '2016-05-06' },
					{ date: '2016-05-07' },
					{ date: '2016-05-08' },
					{ date: '2016-05-09' },
				]}
			/>
		)
		const dropdownOptions = wrapper.find(Dropdown).first().prop('options')
		const disabledDays = dropdownOptions.map(option => option.disabled)
		expect(disabledDays).to.deep.equal([false, true, true, false])
	})

	describe('error', () => {
		it('not setting error should  not show the error div', () => {
			const wrapper = shallow(<EditDeliveryDate {...testData} />)
			expect(wrapper.find('.error').length).to.equal(0)
		})

		it('setting error should show the error div', () => {
			const wrapper = shallow(<EditDeliveryDate
				{...testData}
				error="This is error"
			/>)
			expect(wrapper.find('.error').length).to.equal(1)
		})
	})

	describe('props.saving', () => {
		it('not setting props.saving should not show the submit button in a loading state', () => {
			const wrapper = shallow(<EditDeliveryDate {...testData} />)
			expect(wrapper.find(Button).first().prop('disabled')).to.be.false
			expect(wrapper.find(Button).first().prop('loading')).to.be.false
		})

		it('setting props.saving should show the submit button in a loading state', () => {
			const wrapper = shallow(<EditDeliveryDate
				{...testData}
				saving
			/>)
			expect(wrapper.find(Button).first().prop('disabled')).to.be.true
			expect(wrapper.find(Button).first().prop('loading')).to.be.true
		})
	})

	describe('props.loading', () => {
		it('not setting props.saving should not show the submit button in a loading state', () => {
			const wrapper = shallow(<EditDeliveryDate {...testData} />)
			expect(wrapper.find(Button).first().prop('disabled')).to.be.false
			expect(wrapper.find(Button).first().prop('loading')).to.be.false
		})

		it('setting props.saving should show the submit button in a loading state', () => {
			const wrapper = shallow(<EditDeliveryDate
				{...testData}
				loading
			/>)
			expect(wrapper.find(Button).first().prop('disabled')).to.be.true
			expect(wrapper.find(Button).first().prop('loading')).to.be.false
		})
	})

	describe('props.updateOrderDate', () => {
		it('clicking the save button should called updateOrderDate', () => {
			const updateOrderDateSpy = sinon.spy()
			const wrapper = shallow(<EditDeliveryDate
				{...testData}
				updateOrderDate={updateOrderDateSpy}
			/>)
			wrapper.find(Button).first().simulate('click')
			expect(updateOrderDateSpy.callCount).to.equal(1)
		})
	})

	describe('props.days', () => {
		let handleSetDaySpy
		let wrapper

		beforeEach(() => {
			handleSetDaySpy = sinon.spy()
			wrapper = shallow(<EditDeliveryDate
				{...testData}
				handleSetDay={handleSetDaySpy}
				days={[
					{
						date: '2016-10-20',
					},
					{
						date: '2016-10-21',
					},
				]}
			/>)
		})

		it('should create a Dropdown element with an array of options', () => {
			expect(wrapper.find(Dropdown).first().prop('options').length).to.equal(2)
		})
		it('should call handleSetDay for each day', () => {
			expect(handleSetDaySpy.callCount).to.equal(2)
		})
	})

	describe('props.slots', () => {
		let handleSetSlotSpy
		let wrapper

		beforeEach(() => {
			handleSetSlotSpy = sinon.spy()
			wrapper = shallow(<EditDeliveryDate
				{...testData}
				handleSetSlot={handleSetSlotSpy}
				slots={[
					{
						delivery_start_time: '08:00:00',
						delivery_end_time: '17:59:59',
					},
					{
						delivery_start_time: '18:00:00',
						delivery_end_time: '20:59:59',
					},
				]}
			/>)
		})

		it('should create a Dropdown element with an array of options', () => {
			expect(wrapper.find(Dropdown).at(1).prop('options').length).to.equal(2)
		})
		it('should call handleSetDay for each slot', () => {
			expect(handleSetSlotSpy.callCount).to.equal(2)
		})
	})
})
