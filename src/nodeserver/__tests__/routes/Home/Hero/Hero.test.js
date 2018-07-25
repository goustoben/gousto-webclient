import sinon from 'sinon'

import React from 'react'
import { shallow } from 'enzyme'

import Hero from 'routes/Home/Hero/Hero'

import CTA from 'routes/Home/CTA'

describe('Hero', () => {
	test('should include a main header', () => {
		const wrapper = shallow(<Hero />)
		expect(wrapper.find('h1')).toHaveLength(1)
	})

	test('should include a subheader', () => {
		const wrapper = shallow(<Hero />)
		expect(wrapper.find('h2')).toHaveLength(1)
	})

	test('should have a CTA button', () => {
		const redirect = sinon.spy()

		const wrapper = shallow(<Hero redirect={redirect} />)
		expect(wrapper.find(CTA)).toHaveLength(1)
	})
})
