import React from 'react'
import { shallow } from 'enzyme'

import Diet from 'Recipe/Diet'

describe('<Diet />', () => {
	let wrapper
	let diet

	test('should return a <div>', () => {
		wrapper = shallow(<Diet diet={'meat'} />)

		expect(wrapper.type()).toEqual('div')
	})

	test('should have two span children', () => {
		wrapper = shallow(<Diet diet={'fish'} />)

		wrapper.children().forEach(node => {
			expect(node.type()).toEqual('span')
		})
	})

	test('should display the normal diet types correctly', () => {
		const diets = ['meat', 'fish', 'vegetarian']

		diets.forEach(diet => {
			wrapper = shallow(<Diet diet={diet} />)

			expect(wrapper.text()).toContain(diet)
		})
	})

	test('should display the vegan diet type as plant-based', () => {
		wrapper = shallow(<Diet diet="vegan" />)

		expect(wrapper.text()).toContain('plant-based')
	})
})
