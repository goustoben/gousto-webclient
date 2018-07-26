import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'
import TermsAndConditions from 'routes/Checkout/Components/TermsAndConditions'
import Link from 'Link'

describe('TermsAndConditions', () => {
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<TermsAndConditions />)
		})

		test('should return <div> by default', () => {
			expect(wrapper.type()).toEqual('div')
		})

		test('should contain 1 <Link> components(s)', () => {
			expect(wrapper.find(Link).length).toEqual(1)
		})
	})
})
