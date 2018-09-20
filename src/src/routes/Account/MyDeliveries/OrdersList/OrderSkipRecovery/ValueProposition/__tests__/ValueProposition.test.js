import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import ValueProposition from '../ValueProposition'

describe('Order Skip Modal Value Proposition', () => {
	let wrapper

	describe('Initial Render', () => {
		test('should render snapshot', () => {
			const tree = renderer.create(
				<ValueProposition featureFlag="true" />
			).toJSON()

			expect(tree).toMatchSnapshot()
		})

		test('should render value proposition title', () => {
			wrapper = mount(<ValueProposition featureFlag="true" />)

			const title = wrapper.find('.title')

			expect(title.text()).toBe('Not in on your delivery date?')
		})

		test('should render value proposition message', () => {
			wrapper = mount(<ValueProposition featureFlag="true" />)

			const message = wrapper.find('.message')

			expect(message.text()).toBe('Change your delivery day easily for any box you can choose recipes for.')
		})
	})

	describe('Alternative Render', () => {
		test('should be able to render custom value propositionn message', () => {
			const valueProposition = {
				title: 'test title',
				message: 'test message'
			}

			wrapper = mount(<ValueProposition featureFlag="true" valueProposition={valueProposition} />)

			const title = wrapper.find('.title')
			const message = wrapper.find('.message')

			expect(title.text()).toBe('test title')
			expect(message.text()).toBe('test message')
		})

		test('should not render anything if featureflag is false', () => {
			wrapper = mount(<ValueProposition />)

			expect(wrapper.children().length).toBe(0)
		})

		test('should prioritise featureflag prop over valueProposition prop', () => {
			const valueProposition = {
				title: 'test title',
				message: 'test message'
			}

			wrapper = mount(<ValueProposition valueProposition={valueProposition} />)

			expect(wrapper.children().length).toBe(0)
		})
	})
})
