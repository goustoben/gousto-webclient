import React from 'react'

import { shallow } from 'enzyme'
import InputError from 'Form/InputError'

describe('InputError', () => {
	let wrapper

	test('should return a <p> tag', () => {
		wrapper = shallow(<InputError>Error</InputError>)
		expect(wrapper.type()).toEqual('p')
	})

	test('should show the children', () => {
		wrapper = shallow(<InputError>Error msg</InputError>)
		expect(wrapper.text()).toEqual('Error msg')
	})
})
