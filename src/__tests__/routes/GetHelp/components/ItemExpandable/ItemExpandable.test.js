import React from 'react'
import { mount } from 'enzyme'

import { Item } from 'goustouicomponents'
import { ItemExpandable } from 'routes/GetHelp/components/ItemExpandable'

describe('<ItemExpandable />', () => {
	const ChildComponent = () => (<div>Test child</div>)
	let wrapper

	beforeEach(() => {
		wrapper = mount(
			<ItemExpandable label="item-label">
				<ChildComponent/>
				<ChildComponent/>
			</ItemExpandable>
		)
	})

	describe('render', () => {
		test('an Item is rendered with the passed label', () => {
			expect(wrapper.find(Item).text()).toContain('item-label')
		})

		test('by default, indicates to Item that the arrow must be not in the expanded state', () => {
			expect(wrapper.find(Item).prop('arrowExpanded')).toBe(false)
		})

		test('the trackClick function is passed to the Item', () => {
			const aFunction = () => {}
			const itemExpandable = mount(
				<ItemExpandable
					label="item-label"
					to="/test" // TODO check
					trackClick={aFunction}
				/>
			)

			expect(itemExpandable.find(Item).prop('trackClick')).toBe(aFunction)
		})

		test('the isHiddenOnMobile value is passed to the Item', () => {
			let itemExpandable = mount(
				<ItemExpandable
					label="item-label"
					isHiddenOnMobile
				/>
			)

			expect(itemExpandable.find(Item).prop('isHiddenOnMobile')).toBe(true)

			itemExpandable = mount(
				<ItemExpandable
					label="item-label"
					isHiddenOnMobile={false}
				/>
			)

			expect(itemExpandable.find(Item).prop('isHiddenOnMobile')).toBe(false)
		})
	})

	describe('behaviour', () => {
		test('when clicking the arrow points down', () => {
			wrapper.simulate('click')

			expect(wrapper.find(Item).prop('arrowExpanded')).toBe(true)
		})

		test('when clicking the children are shown, if clicked again it is hidden', () => {
			wrapper.simulate('click')

			expect(wrapper.find(ChildComponent)).toHaveLength(2)

			wrapper.simulate('click')

			expect(wrapper.find(ChildComponent)).toHaveLength(0)
		})
	})
})
