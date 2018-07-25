
import React from 'react'
import { shallow } from 'enzyme'
import PreviewDeliveryDate from '../../../../js/my-deliveries/components/edit-delivery-date/PreviewDeliveryDate'
import { formatTime, formatLongDate } from '../../../../js/my-deliveries/datetimeFormatter'

import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)

describe('PreviewDeliveryDate', () => {
	let testData

	beforeEach(() => {
		testData = {
			deliveryDate: '2015-12-05',
			deliverySlot: {
				delivery_start: '08:00:00',
				delivery_end: '17:59:59',
			},
		}
	})

	it('should return a <div>', () => {
		const wrapper = shallow(<PreviewDeliveryDate {...testData} />)
		expect(wrapper.type()).to.equal('div')
	})

	describe('props.deliveryDate', () => {
		it('should display the deliveryDate formatted by the datetimeFormater', () => {
			const wrapper = shallow(<PreviewDeliveryDate
				{...testData}
				deliveryDate="2015-12-08"
			/>)
			expect(wrapper.find('span[className="selected-order-date"]').text()).to.include(formatLongDate('2015-12-08'))
		})
	})

	describe('props.deliverySlot', () => {
		it('should display the deliveryDate formatted by the datetimeFormater', () => {
			const wrapper = shallow(<PreviewDeliveryDate
				{...testData}
				deliverySlot={{
					delivery_start: '18:00:00',
					delivery_end: '20:59:59',
				}}
			/>)
			const dateText = wrapper.find('span[className="selected-order-date"]').text()
			expect(dateText).to.include(formatTime('18:00:00'))
			expect(dateText).to.include(formatTime('20:59:59'))
		})
	})

	describe('props.toggleEdit', () => {
		it('should flip the value of isEditingDate ', () => {
			const toggleEditSpy = sinon.spy()
			const wrapper = shallow(<PreviewDeliveryDate
				{...testData}
				toggleEdit={toggleEditSpy}
				isDateEditable
			/>)
			wrapper.find('a[className="update-order-date"]').first().simulate('click')
			expect(toggleEditSpy.callCount).to.equal(1)
		})
	})

	describe('props.isEditingDate', () => {
		it('when false the edit button should say change date', () => {
			const wrapper = shallow(<PreviewDeliveryDate
				{...testData}
				isDateEditable
				isEditingDate={false}
			/>)
			const dateText = wrapper.find('a[className="update-order-date"]').text()
			expect(dateText).to.equal('change date')
		})

		it('when true the edit button should say cancel date change', () => {
			const wrapper = shallow(<PreviewDeliveryDate
				{...testData}
				isDateEditable
				isEditingDate
			/>)
			const dateText = wrapper.find('a[className="update-order-date"]').text()
			expect(dateText).to.equal('cancel date change')
		})
	})

	describe('props.isDateEditable', () => {
		it('when false the edit button shouldnt be visible', () => {
			const wrapper = shallow(<PreviewDeliveryDate
				{...testData}
				isDateEditable={false}
			/>)
			expect(wrapper.find('a[className="update-order-date"]').length).to.equal(0)
		})

		it('when true the edit button should be visisble', () => {
			const wrapper = shallow(<PreviewDeliveryDate
				{...testData}
				isDateEditable
			/>)
			expect(wrapper.find('a[className="update-order-date"]').length).to.equal(1)
		})
	})
})
