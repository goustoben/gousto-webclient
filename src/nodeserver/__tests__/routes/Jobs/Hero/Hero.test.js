import React from 'react'
import { shallow } from 'enzyme'

import Hero from 'routes/Jobs/Hero/Hero'
import Button from 'routes/Jobs/Hero/Button/Button'

describe('Hero', () => {
	test('Jobs page should include a main header', () => {
		const wrapper = shallow(<Hero />)
		expect(wrapper.find('h1')).toHaveLength(1)
	})

	test('should render a button', () => {
		const wrapper = shallow(<Hero />)
		expect(wrapper.find(Button)).toHaveLength(1)
	})
})
