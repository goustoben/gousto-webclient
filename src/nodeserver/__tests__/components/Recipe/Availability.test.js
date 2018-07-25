import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import Availability from 'Recipe/Availability'

describe('<Availability />', () => {
	test('should return a <span> when dates are NOT provided', () => {
		const wrapper = shallow(<Availability />)
		expect(wrapper.type()).toEqual('span')
	})

	test('should display the date correctly when the start and end dates are within the same month', () => {
		const availability = Immutable.fromJS([
			{ from: '2016-05-26', until: '2016-05-28' },
			{ from: '2016-06-26', until: '2016-06-28' },
			{ from: '2016-07-26', until: '2016-07-28' },
		])

		const wrapper = shallow(
			<Availability availability={availability} cutoffDate="2016-06-27" />,
		)
		expect(wrapper.type()).toEqual('div')
		expect(wrapper.text()).toContain('Available to order 26 - 28 Jun')
	})

	test('should display both month names when the start and end dates are not in the same month', () => {
		const availability = Immutable.fromJS([
			{ from: '2016-05-26', until: '2016-06-28' },
			{ from: '2016-07-26', until: '2016-07-28' },
		])

		const wrapper = shallow(
			<Availability availability={availability} cutoffDate="2016-06-27" />,
		)
		expect(wrapper.type()).toEqual('div')
		expect(wrapper.text()).toContain('Available to order 26 May - 28 Jun')
	})

	test('should not display anything if not available', () => {
		const availability = Immutable.fromJS([
			{ from: '2016-05-26', until: '2016-06-26' },
		])

		const wrapper = shallow(
			<Availability availability={availability} cutoffDate="2016-06-27" />,
		)
		expect(wrapper.type()).toEqual('span')
		expect(wrapper.text()).toEqual('')
	})
})
