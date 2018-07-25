import React from 'react'
import { shallow } from 'enzyme'

import CancelOrderModal from 'CancelOrderModal/CancelOrderModal.js'

describe('CancelOrderModal', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<CancelOrderModal cancelOrderModalOpen />)
	})

	test('should return a Overlay with no props', () => {
		expect(wrapper.text()).toEqual('<Overlay />')
	})

	test('should return a <ModalPanel>', () => {
		expect(wrapper.find('ModalPanel').length).toEqual(1)
	})

	test('should render the content of the modal', () => {
		expect(wrapper.find('Connect(CancelOrderModalContent)').length).toEqual(1)
	})
})
