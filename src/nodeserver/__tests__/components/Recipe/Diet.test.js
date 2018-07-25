import React from 'react'

import sinon from 'sinon'

import { shallow } from 'enzyme'

import Diet from 'Recipe/Diet'

describe('<Diet />', () => {
	let diet
	beforeEach(() => {
		diet = 'Meat'
	})

	test('should return a <div>', () => {
		const wrapper = shallow(<Diet diet={diet} />)
		expect(wrapper.type()).toEqual('div')
	})
	test('should have two span children', () => {
		const wrapper = shallow(<Diet diet={diet} />)
		wrapper.children().forEach(node => {
			expect(node.type()).toEqual('span')
		})
	})
	test('should display the diet correctly', () => {
		const wrapper = shallow(<Diet diet={diet} />)
		expect(
			wrapper
				.children()
				.get(1)
				.props.children.join(''),
		).toContain('Meat')
	})
})
