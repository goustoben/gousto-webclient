import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */

import DuplicateOrderModalContainer from 'DuplicateOrderModal/DuplicateOrderModalContainer'
import DuplicateOrderModal from 'DuplicateOrderModal/DuplicateOrderModal'

describe('DuplicateOrderModalContainer', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<DuplicateOrderModalContainer />, {
			context: {
				store: {
					getState: () => ({
						temp: Immutable.Map({}),
					}),
					subscribe: () => {},
				},
			},
		})
	})

	describe('with the default state', () => {
		test('shouldnt blow up', () => {
			expect(wrapper.type()).toBe(DuplicateOrderModal)
		})
		test('should set the closeOrders prop to an empty Immutable Map', () => {
			expect(Immutable.is(wrapper.prop('closeOrders'), Immutable.Map([]))).toBe(
				true,
			)
		})
	})

	describe('with close orders', () => {
		beforeEach(() => {
			wrapper = shallow(<DuplicateOrderModalContainer />, {
				context: {
					store: {
						getState: () => ({
							temp: Immutable.fromJS({
								closeOrderIds: ['123', '234', '345', '456', '567'],
							}),
							user: Immutable.fromJS({
								orders: [
									{ id: '123' },
									{ id: '234' },
									{ id: '345' },
									{ id: '999' },
								],
							}),
						}),
						subscribe: () => {},
					},
				},
			})
		})
		test('shouldnt blow up', () => {
			expect(wrapper.type()).toBe(DuplicateOrderModal)
		})
		test('should set the closeOrders prop to an Immutable List containing the orders which are in the users orders', () => {
			expect(wrapper.prop('closeOrders').toJS()).toEqual([
				{ id: '123' },
				{ id: '234' },
				{ id: '345' },
			])
		})
	})
})
