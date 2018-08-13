import React from 'react'
import { shallow } from 'enzyme'
import Alert from 'Alert'

describe('Alert', () => {
	test('should return div', () => {
		const wrapper = shallow(<Alert />)
		expect(wrapper.type()).toBe('div')
	})

	test('should handle danger, success, info, and warning', () => {
		const dangerWrapper = shallow(<Alert type="danger" />)
		expect(dangerWrapper.prop('className')).toContain('danger')

		const successWrapper = shallow(<Alert type="success" />)
		expect(successWrapper.prop('className')).toContain('success')

		const infoWrapper = shallow(<Alert type="info" />)
		expect(infoWrapper.prop('className')).toContain('info')

		const warningWrapper = shallow(<Alert type="warning" />)
		expect(warningWrapper.prop('className')).toContain('warning')
	})

	test('should default to type info', () => {
		const dangerWrapper = shallow(<Alert />)
		expect(dangerWrapper.prop('className')).toContain('info')
	})

	test('should contain a span with icon class', () => {
		const wrapper = shallow(<Alert />)
		const firstChild = wrapper.children().first()
		expect(firstChild.type()).toBe('span')
		expect(firstChild.prop('className')).toContain('icon')
	})

	test('should display div with dangerouslySetInnerHtml set to children if children is string', () => {
		const wrapper = shallow(<Alert>Child Text</Alert>)
		const lastChild = wrapper.children().last()
		expect(lastChild.type()).toBe('div')
		expect(lastChild.prop('dangerouslySetInnerHTML')).toEqual({
			__html: 'Child Text',
		})
	})

	test('should display children if children is not a string', () => {
		const wrapper = shallow(
			<Alert>
				<div>
					<p>child content</p>
				</div>
			</Alert>,
		)
		const lastChild = wrapper.children().last()
		expect(lastChild.type()).toBe('div')
		expect(lastChild.childAt(0).type()).toBe('p')
		expect(lastChild.childAt(0).text()).toBe('child content')
	})
})
