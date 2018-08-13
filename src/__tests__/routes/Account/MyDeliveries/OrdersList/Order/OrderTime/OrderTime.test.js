import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderTime from 'routes/Account/MyDeliveries/OrdersList/Order/OrderTime'

describe('OrderTime', () => {
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
		const startSample = 'startSample'
		const endSample = 'endSample'

		beforeEach(() => {
			wrapper = shallow(<OrderTime start={startSample} end={endSample} />)
		})

		test('should render a <p> with a specific text containing the start and end props passed', () => {
			expect(wrapper.type()).toEqual('p')
			expect(wrapper.text()).toEqual(`${startSample} - ${endSample}`)
		})
	})
})
