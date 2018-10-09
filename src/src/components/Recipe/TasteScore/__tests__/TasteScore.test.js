import React from 'react'
import { mount } from 'enzyme'

import Svg from 'Svg'

import TasteScore from 'Recipe/TasteScore'

describe('TasteScore', () => {
	let wrapper

	describe('when not passed a score', () => {
		test('should not render', () => {
			wrapper = mount(<TasteScore score={0} />)

			expect(wrapper.html()).toBe(null)
		})
	})

	describe('when passed a score', () => {
		test('should render an Svg and score', () => {
			const score = 99
			wrapper = mount(<TasteScore score={score} />)

			expect(wrapper.find(Svg)).toHaveLength(1)
			expect(wrapper.find('p').text()).toContain(score)
		})
	})
})
