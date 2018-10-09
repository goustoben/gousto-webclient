import React from 'react'
import { mount } from 'enzyme'

import Item from 'routes/GetHelp/components/Item'
import ItemLink from 'routes/GetHelp/components/ItemLink'
import css from 'routes/GetHelp/components/ItemLink/ItemLink.css'


describe('<ItemLink />', () => {
	describe('rendering', () => {
		const wrapper = mount(
			<ItemLink
				label="item-label"
				to="/test"
				clientRouted
			/>
		)
		const link = wrapper.find('GoustoLink')

		test('it renders the label', () => {
			expect(wrapper.text()).toContain('item-label')
		})

		test('it renders the link', () => {
			expect(link.prop('to')).toBe('/test')
			expect(link.prop('clientRouted')).toBe(true)
		})

		test('it renders the link with clientRouted false when that prop is passed', () => {
			const linkNoClientRouted = mount(
				<ItemLink
					label="item-label"
					to="/test"
					clientRouted={false}
				/>
			)

			expect(linkNoClientRouted.find('GoustoLink').prop('clientRouted')).toBe(false)
		})

		test('it renders the arrow right', () => {
			expect(wrapper.find(`.${css.itemArrowRight}`)).toHaveLength(1)
		})
	})

	describe('behaviour', () => {
		test('the click event is propagated, so the <Item> onClick function is called', () => {
			const trackClickSpy =  jest.fn()
			const wrapper = mount(
				<Item trackClick={trackClickSpy}>
					<ItemLink
						label="item-label"
						to="/test"
					/>
				</Item>
			)
			const itemLink = wrapper.find('ItemLink')
			itemLink.simulate('click')

			expect(trackClickSpy).toHaveBeenCalledTimes(1)
		})
	})
})