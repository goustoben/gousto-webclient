import { shallow } from 'enzyme'
import React from 'react'

import sinon from 'sinon'

import Portions from 'BoxSummary/Details/Portions'
import { Segment } from 'goustouicomponents'

describe('Portions', () => {
	test('should not have filled Segment if portion is not 2 nor 4', () => {
		const wrapper = shallow(
			<Portions numPortions={0} onNumPortionChange={function() {}} />,
		)

		expect(wrapper.find(Segment).length).toEqual(2)
		expect(
			wrapper
				.find(Segment)
				.at(0)
				.prop('fill'),
		).toEqual(false)
		expect(
			wrapper
				.find(Segment)
				.at(1)
				.prop('fill'),
		).toEqual(false)
	})

	test('should have filled Segment for the right portion size', () => {
		let wrapper = shallow(
			<Portions numPortions={4} onNumPortionChange={function() {}} />,
		)

		expect(wrapper.find(Segment).length).toEqual(2)
		expect(
			wrapper
				.find(Segment)
				.at(0)
				.prop('fill'),
		).toEqual(false)
		expect(
			wrapper
				.find(Segment)
				.at(1)
				.prop('fill'),
		).toEqual(true)

		wrapper = shallow(
			<Portions numPortions={2} onNumPortionChange={function() {}} />,
		)

		expect(wrapper.find(Segment).length).toEqual(2)
		expect(
			wrapper
				.find(Segment)
				.at(0)
				.prop('fill'),
		).toEqual(true)
		expect(
			wrapper
				.find(Segment)
				.at(1)
				.prop('fill'),
		).toEqual(false)
	})

	test('should call callback function with right portion number', () => {
		const onClickSpy = sinon.spy()
		const wrapper = shallow(
			<Portions numPortions={2} onNumPortionChange={onClickSpy} />,
		)

		wrapper
			.find(Segment)
			.at(0)
			.simulate('click')
		expect(onClickSpy.getCall(0).args[0]).toEqual(2)

		wrapper
			.find(Segment)
			.at(1)
			.simulate('click')
		expect(onClickSpy.getCall(1).args[0]).toEqual(4)
	})
})
