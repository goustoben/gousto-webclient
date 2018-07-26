import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import Cuisine from 'Recipe/Cuisine'

describe('<Cuisine />', () => {
	let cuisine
	beforeEach(() => {
		cuisine = 'Hipster'
	})

	test('should return a <div>', () => {
		const wrapper = shallow(<Cuisine cuisine={cuisine} />)
		expect(wrapper.type()).toEqual('div')
	})
	test('should have two span children', () => {
		const wrapper = shallow(<Cuisine cuisine={cuisine} />)
		wrapper.children().forEach(node => {
			expect(node.type()).toEqual('span')
		})
	})
	test('should display the cuisine correctly', () => {
		const wrapper = shallow(<Cuisine cuisine={cuisine} />)
		expect(
			wrapper
				.children()
				.get(1)
				.props.children.join(''),
		).toContain('Hipster Cuisine')
	})
})
