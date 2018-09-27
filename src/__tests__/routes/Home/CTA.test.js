import sinon from 'sinon'

import React from 'react'
import CTAHomepage from 'routes/Home/CTA'
import { shallow, mount } from 'enzyme'
import { Button, Segment } from 'goustouicomponents'

describe('CTA', () => {
	let wrapper
	let onClickSpy
	let width

	beforeEach(() => {
		onClickSpy = sinon.spy()
		width = 100
		wrapper = shallow(
			<CTAHomepage onClick={onClickSpy} width={width}>
				click here
			</CTAHomepage>,
		)
	})

	test('should render a Button and a Segment', () => {
		expect(wrapper.find(Button).length).toEqual(1)
		expect(wrapper.find(Segment).length).toEqual(1)
	})

	test('should put the text into the button', () => {
		expect(
			wrapper
				.find(Segment)
				.html()
				.indexOf('click here'),
		).not.toEqual(-1)
	})

	test('should map the onClick prop through to the Segment', () => {
		expect(wrapper.find(Segment).prop('onClick')).toEqual(onClickSpy)
	})

	describe('default props', () => {
		beforeEach(() => {
			wrapper = mount(
				<CTAHomepage onClick={onClickSpy} width={width}>
					click here
				</CTAHomepage>,
			)
		})

		test('should be centered on default', () => {
			expect(wrapper.prop('align')).toEqual('center')
		})

		test('should not be responsive on default', () => {
			expect(wrapper.prop('responsive')).toBe(false)
		})
	})
})
