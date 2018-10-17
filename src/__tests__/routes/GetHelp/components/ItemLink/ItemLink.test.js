import React from 'react'
import { mount } from 'enzyme'

import { ItemLink } from 'routes/GetHelp/components/ItemLink'
import Item from 'routes/GetHelp/components/Item'
import Link from 'Link'

describe('<ItemLink />', () => {
	describe('render', () => {
		const wrapper = mount(
			<ItemLink
				label="item-label"
				to="/test"
				clientRouted
			/>
		)
		const link = wrapper.find(Link)

		test('a Link is rendered with the correct props', () => {
			expect(link.prop('to')).toBe('/test')
			expect(link.prop('clientRouted')).toBe(true)
		})

		test('Link is passed the prop clientRouted false when that prop value is passed to ItemLink', () => {
			const linkNoClientRouted = mount(
				<ItemLink
					label="item-label"
					to="/test"
					clientRouted={false}
				/>
			)

			expect(linkNoClientRouted.find(Link).prop('clientRouted')).toBe(false)
		})

		test('an Item is rendered with the passed label', () => {
			expect(wrapper.text()).toContain('item-label')
		})

		test('the trackClick function is passed to the Item', () => {
			const aFunction = () => {}
			const itemLinkWithTracking = mount(
				<ItemLink
					label="item-label"
					to="/test"
					trackClick={aFunction}
				/>
			)

			expect(itemLinkWithTracking.find(Item).prop('trackClick')).toBe(aFunction)
		})

		test('the isHiddenOnMobile value is passed to the Item', () => {
			let itemLink = mount(
				<ItemLink
					label="item-label"
					to="/test"
					isHiddenOnMobile
				/>
			)

			expect(itemLink.find(Item).prop('isHiddenOnMobile')).toBe(true)

			itemLink = mount(
				<ItemLink
					label="item-label"
					to="/test"
					isHiddenOnMobile={false}
				/>
			)

			expect(itemLink.find(Item).prop('isHiddenOnMobile')).toBe(false)
		})
	})
})
