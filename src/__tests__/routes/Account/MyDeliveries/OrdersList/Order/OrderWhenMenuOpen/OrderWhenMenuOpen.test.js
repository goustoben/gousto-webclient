import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import OrderWhenMenuOpen from 'routes/Account/MyDeliveries/OrdersList/Order/OrderWhenMenuOpen'

describe('OrderWhenMenuOpen', () => {
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
		const whenMenuOpenSample = '12pm, 28 May'

		beforeEach(() => {
			wrapper = shallow(<OrderWhenMenuOpen whenMenuOpen={whenMenuOpenSample} />)
		})

		test('should render a <p> with a specific text containing the prop passed', () => {
			expect(wrapper.type()).toEqual('p')
			expect(wrapper.text()).toEqual(`Menu open ${whenMenuOpenSample}`)
		})
	})
})
