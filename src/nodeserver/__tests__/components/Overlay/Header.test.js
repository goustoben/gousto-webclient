import React from 'react'
import { shallow } from 'enzyme'
import Header from 'Overlay/Header'
import Title from 'Overlay/Title'
import CloseButton from 'Overlay/CloseButton'

import sinon from 'sinon'

describe('Overlay Header', () => {
	let wrapper
	let onClose
	let props

	beforeEach(() => {
		onClose = function() {}

		props = {
			onClose,
			title: 'Overlay Title',
		}

		wrapper = shallow(<Header {...props} />)
	})

	test('should return div', () => {
		expect(wrapper.type()).toBe('div')
	})

	test('should contain 1 Title', () => {
		expect(wrapper.find(Title).length).toBe(1)
	})

	test('should contain 1 CloseButton', () => {
		expect(wrapper.find(CloseButton).length).toBe(1)
	})

	test('should pass title to Title', () => {
		expect(wrapper.find(Title).prop('title')).toBe('Overlay Title')
	})

	test('should pass onClose to CloseButton', () => {
		expect(wrapper.find(CloseButton).prop('onClose')).toEqual(onClose)
	})
})
