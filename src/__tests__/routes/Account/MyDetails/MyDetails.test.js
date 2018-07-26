import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import MyDetails from 'routes/Account/MyDetails/MyDetails'

describe('MyDetails', () => {
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<MyDetails />)
		})

		test('should render a <div> with no props', () => {
			expect(wrapper.type()).toEqual('div')
		})
	})
})
