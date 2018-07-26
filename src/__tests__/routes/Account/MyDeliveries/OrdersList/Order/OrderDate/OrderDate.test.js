import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderDate from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDate'

describe('OrderDate', () => {
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
		const dateSample = 'Sunday 11 June'

		beforeEach(() => {
			wrapper = shallow(<OrderDate date={dateSample} />)
		})

		test('should render a <p> containing the date prop passed', () => {
			expect(wrapper.type()).toEqual('p')
			expect(wrapper.text()).toEqual(dateSample)
		})
	})
})
