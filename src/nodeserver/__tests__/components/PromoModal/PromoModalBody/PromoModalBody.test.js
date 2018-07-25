import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import PromoModalBody from 'components/PromoModal/PromoModalBody/PromoModalBody'

describe('PromoModalBody', () => {
	let wrapper

	test('should return a PromoModalBody with no props', () => {
		wrapper = shallow(<PromoModalBody />)
		expect(wrapper.type()).toEqual('div')
	})
})
