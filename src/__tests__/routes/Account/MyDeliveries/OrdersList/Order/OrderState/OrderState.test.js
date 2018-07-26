import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderState from 'routes/Account/MyDeliveries/OrdersList/Order/OrderState'

describe('OrderState', () => {
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
		const orderStateSample = 'StateSample'

		beforeEach(() => {
			wrapper = shallow(<OrderState orderState={orderStateSample} />)
		})

		test('should render a <div> with the state prop passed', () => {
			expect(wrapper.type()).toEqual('div')
			expect(wrapper.text()).toEqual(orderStateSample)
		})
	})
})
