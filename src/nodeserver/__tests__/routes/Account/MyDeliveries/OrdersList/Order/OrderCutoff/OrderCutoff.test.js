import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderCutoff from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCutoff'

describe('OrderCutoff', () => {
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
		const whenCutoffSample = '42 days'

		beforeEach(() => {
			wrapper = shallow(<OrderCutoff whenCutoff={whenCutoffSample} />)
		})

		test('should render a <p> with a specific text containing the prop passed', () => {
			expect(wrapper.type()).toEqual('p')
			expect(wrapper.text()).toEqual(
				`${whenCutoffSample} left to edit this box`,
			)
		})
	})
})
