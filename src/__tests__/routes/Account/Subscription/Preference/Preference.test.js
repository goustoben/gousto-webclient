import React from 'react'
import { shallow } from 'enzyme'
import Preference from 'routes/Account/Subscription/Preference'

describe('Preference', () => {
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<Preference />)
		})

		test('should render a <div>', () => {
			expect(wrapper.type()).toEqual('div')
		})
	})
})
