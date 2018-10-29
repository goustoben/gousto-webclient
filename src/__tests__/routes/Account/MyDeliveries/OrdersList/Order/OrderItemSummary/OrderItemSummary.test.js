import sinon from 'sinon'

import Immutable from 'immutable'

import React from 'react'
import { shallow } from 'enzyme'
import OrderItemSummary from 'routes/Account/MyDeliveries/OrdersList/Order/OrderItemSummary'

describe('OrderItemSummary', () => {
	let sandbox

	beforeEach(() => {
		sandbox = sinon.sandbox.create()
	})
	afterEach(done => {
		sandbox.restore()
		done()
	})
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<OrderItemSummary />)
		})

		test('should render a <div> with no props', () => {
			expect(wrapper.type()).toEqual('div')
		})
		test('should render recipes if present', () => {
			wrapper = shallow(
				<OrderItemSummary recipes={Immutable.Map({ recipe: 1 })} />,
			)
			expect(wrapper.text()).toContain('recipes')
		})
		test('should render "extras" if there are extras', () => {
			wrapper = shallow(<OrderItemSummary numberOfProducts={1} />)
			expect(wrapper.text()).toContain('extras')
		})
		test('should not render "extras" there are not', () => {
			wrapper = shallow(<OrderItemSummary numberOfProducts={0} />)
			expect(wrapper.text()).not.toContain('extras')
		})
		test('should render a comma if recipes and products present', () => {
			wrapper = shallow(
				<OrderItemSummary
					numberOfProducts={2}
					recipes={Immutable.Map({ recipe: 1 })}
				/>,
			)
			expect(wrapper.text()).toContain(',')
		})
	})
})
