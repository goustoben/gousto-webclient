import React from 'react'
import { mount } from 'enzyme'

import Item from 'routes/GetHelp/components/Item'
import css from 'routes/GetHelp/components/Item/Item.css'


describe('<Item />', () => {
	describe('render', () => {
		test('label is rendering correctly', () => {
			const wrapper = mount(
				<Item label="item label" />
			)

			expect(wrapper.text()).toContain('item label')
		})

		test('chevron-right is rendering correctly', () => {
			const wrapper = mount(
				<Item
					label="item label"
					arrowExpanded={false}
				/>
			)

			expect(
				wrapper.find('.itemContent').find('.itemArrowRight')
			).toHaveLength(1)

			expect(
				wrapper.find('.itemContent').find('.itemArrowDown')
			).toHaveLength(0)
		})

		test('chevron-down is rendering correctly', () => {
			const wrapper = mount(
				<Item
					label="item label"
					arrowExpanded
				/>
			)

			expect(
				wrapper.find('.itemContent').find('.itemArrowDown')
			).toHaveLength(1)

			expect(
				wrapper.find('.itemContent').find('.itemArrowRight')
			).toHaveLength(0)
		})

		test('item contains hiddenOnMobile when isHiddenOnMobile is passed', () => {
			const wrapper = mount(
				<Item
					label="item label"
					isHiddenOnMobile
				/>
			)

			expect(wrapper.hasClass('hiddenOnMobile')).toBe(true)
		})

		test('item not contains hiddenOnMobile when isHiddenOnMobile is set to false', () => {
			const wrapper = mount(
				<Item
					label="item label"
					isHiddenOnMobile={false}
				/>
			)

			expect(wrapper.hasClass('hiddenOnMobile')).toBe(false)
		})
	})

	describe('behaviour', () => {
		test('track click handler works correctly', () => {
			const trackClickSpy = jest.fn()
			const wrapper = mount(
				<Item
					label="item label"
					trackClick={trackClickSpy}
				/>
			)
			wrapper.simulate('click')

			expect(trackClickSpy).toHaveBeenCalledTimes(1)
		})

		test('callback click handler works correctly', () => {
			const cbClickSpy = jest.fn()
			const wrapper = mount(
				<Item
					label="item label"
					onClick={cbClickSpy}
				/>
			)
			wrapper.find('.itemContent').simulate('click')

			expect(cbClickSpy).toHaveBeenCalledTimes(1)
		})
	})
})
