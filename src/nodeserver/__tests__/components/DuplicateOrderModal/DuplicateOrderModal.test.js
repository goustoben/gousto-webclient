import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable'

import DuplicateOrderModal from 'DuplicateOrderModal/DuplicateOrderModal'
import Order from 'DuplicateOrderModal/Order'
import ModalPanel from 'Modal/ModalPanel'

describe('DuplicateOrderModal', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<DuplicateOrderModal />)
	})

	test('should return a <ModalPanel>', () => {
		expect(wrapper.type()).toEqual(ModalPanel)
	})

	test('should contain a Button', () => {
		expect(wrapper.find('Button').length).toEqual(1)
	})

	test('should contain a link', () => {
		expect(wrapper.find('a').length).toEqual(1)
	})

	test('by default, should not render any Orders', () => {
		expect(wrapper.find(Order).length).toEqual(0)
	})

	describe('with user orders', () => {
		let closeOrders
		beforeEach(() => {
			closeOrders = Immutable.fromJS({
				42: {
					id: '42',
					deliveryDate: '1990-01-01T02:02:00Z',
					box: {
						numPeople: '4',
						numRecipes: '2',
					},
				},
				52: {
					id: '52',
					deliveryDate: '1991-01-01T02:02:00Z',
					box: {
						numPeople: '12',
						numRecipes: '20',
					},
				},
			})
			wrapper = shallow(<DuplicateOrderModal closeOrders={closeOrders} />)
		})

		test('should render as many Order components as there are closeOrders passed in', () => {
			expect(wrapper.find(Order).length).toEqual(2)
		})

		test('should map the order details to the Order component as appropriate', () => {
			expect(
				wrapper
					.find(Order)
					.at(0)
					.prop('date'),
			).toEqual('Monday, 1st January')
			expect(
				wrapper
					.find(Order)
					.at(0)
					.prop('numPeople'),
			).toEqual('4')
			expect(
				wrapper
					.find(Order)
					.at(0)
					.prop('numRecipes'),
			).toEqual('2')
		})
	})
})
