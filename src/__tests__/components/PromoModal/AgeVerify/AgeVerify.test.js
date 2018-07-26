import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import AgeVerify from 'components/PromoModal/AgeVerify/AgeVerify'

describe('AgeVerify', () => {
	let wrapper

	test('should return a div with no props', () => {
		wrapper = shallow(<AgeVerify />)
		expect(wrapper.type()).toEqual('div')
	})
})
