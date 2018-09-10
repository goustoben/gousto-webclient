import React from 'react'
import { shallow, mount } from 'enzyme'

import Item from 'routes/GetHelp/components/List/Item'
import css from 'routes/GetHelp/components/List/Item/Item.css'


describe('<Item />', () => {
	let wrapper

	describe('link item', () => {
		test('it renders a Link when the prop "to" is used', () => {
			wrapper = shallow(
				<Item label="item-label"
					  to="link/to"
					  clientRouted={false}
				/>
			)
			const link = wrapper.find('GoustoLink')

			expect(wrapper.find('li')).toHaveLength(1)
			expect(link).toHaveLength(1)
			expect(link.prop('to')).toBe('link/to')
			expect(link.prop('clientRouted')).toBe(false)
			expect(link.html()).toContain('item-label')
			expect(link.find('span').hasClass(css.itemArrowRight))
		})

		test('it renders a Link with clientRouted to true when this prop is passed to true', () => {
			const wrapper = shallow(
				<Item label="item-label"
					  to="link/to"
					  clientRouted={true}
				/>
			)

			expect(wrapper.find('GoustoLink').prop('clientRouted')).toBe(true)
		})

		test('it calls the onClick function passed when clicked', () => {
			const onClickSpy = jest.fn()
			wrapper = shallow(
				<Item label="item-label"
					  to="link/to"
					  onClick={onClickSpy}
				/>
			)
			wrapper.simulate('click')

			expect(onClickSpy).toHaveBeenCalledTimes(1)
		})
	})

	describe('expandable item', () => {
		const TestComponent = () => (<div>Hello world</div>)
		let expandableContent
		let itemContent

		beforeEach(() => {
			expandableContent = React.createElement(TestComponent, null, null)
			wrapper = shallow(
				<Item label="item-label"
					  expandableContent={expandableContent}
				/>
			)
			itemContent = wrapper.find(`.${css.itemContent}`)
		})

		test('it renders an expandable when a falsy value is passed to prop "to" and expandableContent is passed', () => {
			expect(wrapper.find('li')).toHaveLength(1)
			expect(itemContent).toHaveLength(1)
			expect(itemContent.html()).toContain('item-label')
		})

		test('by default, the arrow points right and the content is collapsed', () => {
			expect(itemContent.find('span').hasClass(css.itemArrowRight))
			expect(wrapper.find(TestComponent)).toHaveLength(0)
		})

		describe('when the item content is clicked', () => {
			test('the arrow points down', () => {
				itemContent.simulate('click')
				itemContent = wrapper.find(`.${css.itemContent}`)

				expect(itemContent.find('span').hasClass(css.itemArrowDown)).toBe(true)
			})

			test('the expandableContent is shown, if clicked again it is hidden', () => {
				wrapper = mount(
					<Item label="item-label"
						  expandableContent={expandableContent}
					/>
				)
				itemContent = wrapper.find(`.${css.itemContent}`)
				itemContent.simulate('click')

				expect(wrapper.find(TestComponent)).toHaveLength(1)

				itemContent.simulate('click')

				expect(wrapper.find(TestComponent)).toHaveLength(0)
			})

			test('the click event is propagated, so the <Item> onClick function is called', () => {
				const onClickSpy = jest.fn()
				wrapper = mount(
					<Item label="item-label"
						  expandableContent={expandableContent}
						  onClick={onClickSpy}
					/>
				)
				itemContent = wrapper.find(`.${css.itemContent}`)
				itemContent.simulate('click')
				expect(onClickSpy).toHaveBeenCalledTimes(1)
			})
		})
	})
})