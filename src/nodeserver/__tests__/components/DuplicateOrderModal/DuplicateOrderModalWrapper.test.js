import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'

import DuplicateOrderModalWrapper from 'DuplicateOrderModal/DuplicateOrderModalWrapper'
import DuplicateOrderModal from 'DuplicateOrderModal/DuplicateOrderModalContainer'
import Overlay from 'Overlay'

describe('DuplicateOrderModal/DuplicateOrderModalWrapper', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<DuplicateOrderModalWrapper visible />)
	})

	test('should return an Overlay', () => {
		expect(wrapper.type()).toEqual(Overlay)
	})

	test('should contain a DuplicateOrderModal', () => {
		expect(wrapper.find(DuplicateOrderModal).length).toEqual(1)
	})

	test('should map the visible prop through to Overlay open', () => {
		expect(wrapper.find(Overlay).prop('open')).toEqual(true)
		wrapper = shallow(<DuplicateOrderModalWrapper visible={false} />)
		expect(wrapper.find(Overlay).prop('open')).toEqual(false)
	})
})
